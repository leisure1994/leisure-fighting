-- UrhoX Extra Effects - Ocean 海洋 FFT 波浪效果
-- 基于 lumak-extra-samples/59_Ocean 的 C++ 核心改写的纯 Lua 实现

local OceanEffect = {}
OceanEffect.__index = OceanEffect

local GRAVITY = 9.81
local M_PI = 3.14159265358979

--- 复数工具
local Complex = {}
Complex.__index = Complex

--- 创建复数
-- @param a number 实部
-- @param b number 虚部
-- @return table 复数对象
function Complex.New(a, b)
    return setmetatable({ a = a or 0.0, b = b or 0.0 }, Complex)
end

--- 求共轭复数
-- @return table 共轭复数
function Complex:Conj()
    return Complex.New(self.a, -self.b)
end

--- 复数加法
-- @param c table 另一个复数
-- @return table 和
function Complex:Add(c)
    return Complex.New(self.a + c.a, self.b + c.b)
end

--- 复数减法
-- @param c table 另一个复数
-- @return table 差
function Complex:Sub(c)
    return Complex.New(self.a - c.a, self.b - c.b)
end

--- 复数乘法（支持标量乘）
-- @param c table|number 另一个复数或标量
-- @return table 积
function Complex:Mul(c)
    if type(c) == "number" then
        return Complex.New(self.a * c, self.b * c)
    end
    return Complex.New(self.a * c.a - self.b * c.b, self.a * c.b + self.b * c.a)
end

--- FFT 工具
local FFT = {}
FFT.__index = FFT

--- 创建 FFT 实例
-- @param N number 采样点数（必须是2的幂）
-- @return table FFT 对象
function FFT.New(N)
    local self = setmetatable({}, FFT)
    self.N = N
    self.log2N = math.log(N) / math.log(2)
    self.pi2 = 2.0 * M_PI
    self.reversed = {}
    self.T = {}
    self.c = { {}, {} }
    self.which = 0

    for i = 0, N - 1 do
        self.reversed[i] = self:_reverse(i)
    end

    local pow2 = 1
    for i = 0, self.log2N - 1 do
        self.T[i] = {}
        for j = 0, pow2 - 1 do
            self.T[i][j] = self:_t(j, pow2 * 2)
        end
        pow2 = pow2 * 2
    end

    for i = 0, N - 1 do
        self.c[0][i] = Complex.New(0, 0)
        self.c[1][i] = Complex.New(0, 0)
    end

    return self
end

--- 位反转索引
-- @param i number 原始索引
-- @return number 反转后索引
function FFT:_reverse(i)
    local res = 0
    local v = i
    for j = 0, self.log2N - 1 do
        res = (res * 2) + (v % 2)
        v = math.floor(v / 2)
    end
    return res
end

--- 计算旋转因子
-- @param x number 索引
-- @param N number 周期
-- @return table 复数旋转因子
function FFT:_t(x, N)
    return Complex.New(math.cos(self.pi2 * x / N), math.sin(self.pi2 * x / N))
end

--- 执行 Cooley-Tukey FFT
-- @param input table 输入复数数组
-- @param output table 输出复数数组（原地覆盖）
-- @param stride number 步幅
-- @param offset number 偏移
function FFT:Execute(input, output, stride, offset)
    local N = self.N
    for i = 0, N - 1 do
        self.c[self.which][i] = input[self.reversed[i] * stride + offset]
    end

    local loops = math.floor(N / 2)
    local size = 2
    local sizeOver2 = 1
    local w_ = 0

    for i = 1, self.log2N do
        self.which = self.which ~ 1
        local prev = self.which ~ 1
        for j = 0, loops - 1 do
            for k = 0, sizeOver2 - 1 do
                local a = self.c[prev][size * j + k]
                local b = self.c[prev][size * j + sizeOver2 + k]:Mul(self.T[w_][k])
                self.c[self.which][size * j + k] = a:Add(b)
            end
            for k = sizeOver2, size - 1 do
                local a = self.c[prev][size * j - sizeOver2 + k]
                local b = self.c[prev][size * j + k]:Mul(self.T[w_][k - sizeOver2])
                self.c[self.which][size * j + k] = a:Sub(b)
            end
        end
        loops = math.floor(loops / 2)
        size = size * 2
        sizeOver2 = sizeOver2 * 2
        w_ = w_ + 1
    end

    for i = 0, N - 1 do
        output[i * stride + offset] = self.c[self.which][i]
    end
end

--- 生成 [0,1) 均匀随机数
-- @return number 随机数
local function UniformRandom()
    return math.random()
end

--- 生成高斯分布随机数（Box-Muller）
-- @return table 复数形式的高斯随机变量
local function GaussianRandom()
    local x1, x2, w
    repeat
        x1 = 2.0 * UniformRandom() - 1.0
        x2 = 2.0 * UniformRandom() - 1.0
        w = x1 * x1 + x2 * x2
    until w < 1.0
    w = math.sqrt((-2.0 * math.log(w)) / w)
    return Complex.New(x1 * w, x2 * w)
end

--- cOcean 波浪模拟器
local COcean = {}
COcean.__index = COcean

--- 创建海洋波浪模拟器
-- @param N number 网格分辨率（2的幂）
-- @param A number 波浪强度
-- @param wind Vector2 风向与风速
-- @param lengthVal number 海域长度
-- @return table COcean 对象
function COcean.New(N, A, wind, lengthVal)
    local self = setmetatable({}, COcean)
    self.N = N
    self.Nplus1 = N + 1
    self.A = A
    self.w = wind
    self.length = lengthVal
    self.g = GRAVITY

    self.fft = FFT.New(N)

    local total = N * N
    self.hTilde = {}
    self.hTildeSlopex = {}
    self.hTildeSlopez = {}
    self.hTildeDx = {}
    self.hTildeDz = {}
    for i = 0, total - 1 do
        self.hTilde[i] = Complex.New(0, 0)
        self.hTildeSlopex[i] = Complex.New(0, 0)
        self.hTildeSlopez[i] = Complex.New(0, 0)
        self.hTildeDx[i] = Complex.New(0, 0)
        self.hTildeDz[i] = Complex.New(0, 0)
    end

    self.vertices = {}
    self.indices = {}
    for m = 0, self.Nplus1 - 1 do
        for n = 0, self.Nplus1 - 1 do
            local index = m * self.Nplus1 + n
            local htilde0 = self:_hTilde0(n, m)
            local htilde0mk_conj = self:_hTilde0(-n, -m):Conj()

            self.vertices[index] = {
                a = htilde0.a, b = htilde0.b,
                _a = htilde0mk_conj.a, _b = htilde0mk_conj.b,
                ox = (n - N / 2.0) * lengthVal / N,
                oy = 0.0,
                oz = (m - N / 2.0) * lengthVal / N,
                x = (n - N / 2.0) * lengthVal / N,
                y = 0.0,
                z = (m - N / 2.0) * lengthVal / N,
                nx = 0.0, ny = 1.0, nz = 0.0
            }
        end
    end

    local icount = 0
    for m = 0, N - 1 do
        for n = 0, N - 1 do
            local index = m * self.Nplus1 + n
            self.indices[icount] = index
            icount = icount + 1
            self.indices[icount] = index + self.Nplus1
            icount = icount + 1
            self.indices[icount] = index + self.Nplus1 + 1
            icount = icount + 1
            self.indices[icount] = index
            icount = icount + 1
            self.indices[icount] = index + self.Nplus1 + 1
            icount = icount + 1
            self.indices[icount] = index + 1
            icount = icount + 1
        end
    end
    self.indicesCount = icount

    return self
end

--- 计算色散关系（深水波近似）
-- @param nPrime number 波数索引 n
-- @param mPrime number 波数索引 m
-- @return number 角频率
function COcean:_dispersion(nPrime, mPrime)
    local w0 = 2.0 * M_PI / 200.0
    local kx = M_PI * (2.0 * nPrime - self.N) / self.length
    local kz = M_PI * (2.0 * mPrime - self.N) / self.length
    return math.floor(math.sqrt(self.g * math.sqrt(kx * kx + kz * kz)) / w0) * w0
end

--- Phillips 海洋波谱
-- @param nPrime number 波数索引 n
-- @param mPrime number 波数索引 m
-- @return number 谱密度
function COcean:_phillips(nPrime, mPrime)
    local kx = M_PI * (2.0 * nPrime - self.N) / self.length
    local kz = M_PI * (2.0 * mPrime - self.N) / self.length
    local k = Vector2(kx, kz)
    local kLen = k:Length()
    if kLen < 0.000001 then
        return 0.0
    end

    local kLen2 = kLen * kLen
    local kLen4 = kLen2 * kLen2
    local kNorm = k:Normalized()
    local wNorm = self.w:Normalized()
    local kDotW = kNorm:DotProduct(wNorm)
    local kDotW2 = kDotW * kDotW
    local k3DotW2 = kDotW2 * kDotW2 * kDotW2
    local wLen = self.w:Length()
    local L = wLen * wLen / self.g
    local L2 = L * L
    local damping = 0.001
    local l2 = L2 * damping * damping

    return self.A * math.exp(-1.0 / (kLen2 * L2)) / kLen4 * k3DotW2 * math.exp(-kLen2 * l2)
end

--- 生成初始随机波浪振幅
-- @param nPrime number 波数索引 n
-- @param mPrime number 波数索引 m
-- @return table 复数振幅
function COcean:_hTilde0(nPrime, mPrime)
    local r = GaussianRandom()
    return r:Mul(math.sqrt(self:_phillips(nPrime, mPrime) / 2.0))
end

--- 计算时刻 t 的波浪高度复振幅
-- @param t number 时间
-- @param nPrime number 波数索引 n
-- @param mPrime number 波数索引 m
-- @return table 复数振幅
function COcean:_hTilde(t, nPrime, mPrime)
    local index = mPrime * self.Nplus1 + nPrime
    local htilde0 = Complex.New(self.vertices[index].a, self.vertices[index].b)
    local htilde0mkconj = Complex.New(self.vertices[index]._a, self.vertices[index]._b)
    local omegaT = self:_dispersion(nPrime, mPrime) * t
    local c0 = Complex.New(math.cos(omegaT), math.sin(omegaT))
    local c1 = Complex.New(math.cos(omegaT), -math.sin(omegaT))
    return htilde0:Mul(c0):Add(htilde0mkconj:Mul(c1))
end

--- 使用 FFT 评估当前时刻的全局波浪场
-- @param t number 时间
function COcean:EvaluateWavesFFT(t)
    local N = self.N
    local Nplus1 = self.Nplus1
    local lambda = -1.0

    for m = 0, N - 1 do
        local kz = M_PI * (2.0 * m - N) / self.length
        for n = 0, N - 1 do
            local kx = M_PI * (2.0 * n - N) / self.length
            local len = math.sqrt(kx * kx + kz * kz)
            local index = m * N + n

            local ht = self:_hTilde(t, n, m)
            self.hTilde[index] = ht
            self.hTildeSlopex[index] = ht:Mul(Complex.New(0, kx))
            self.hTildeSlopez[index] = ht:Mul(Complex.New(0, kz))
            if len < 0.000001 then
                self.hTildeDx[index] = Complex.New(0, 0)
                self.hTildeDz[index] = Complex.New(0, 0)
            else
                self.hTildeDx[index] = ht:Mul(Complex.New(0, -kx / len))
                self.hTildeDz[index] = ht:Mul(Complex.New(0, -kz / len))
            end
        end
    end

    for m = 0, N - 1 do
        self.fft:Execute(self.hTilde, self.hTilde, 1, m * N)
        self.fft:Execute(self.hTildeSlopex, self.hTildeSlopex, 1, m * N)
        self.fft:Execute(self.hTildeSlopez, self.hTildeSlopez, 1, m * N)
        self.fft:Execute(self.hTildeDx, self.hTildeDx, 1, m * N)
        self.fft:Execute(self.hTildeDz, self.hTildeDz, 1, m * N)
    end
    for n = 0, N - 1 do
        self.fft:Execute(self.hTilde, self.hTilde, N, n)
        self.fft:Execute(self.hTildeSlopex, self.hTildeSlopex, N, n)
        self.fft:Execute(self.hTildeSlopez, self.hTildeSlopez, N, n)
        self.fft:Execute(self.hTildeDx, self.hTildeDx, N, n)
        self.fft:Execute(self.hTildeDz, self.hTildeDz, N, n)
    end

    local signs = { 1.0, -1.0 }
    for m = 0, N - 1 do
        for n = 0, N - 1 do
            local index = m * N + n
            local index1 = m * Nplus1 + n
            local sign = signs[((n + m) % 2) + 1]

            self.hTilde[index] = self.hTilde[index]:Mul(sign)

            self.vertices[index1].y = self.hTilde[index].a
            self.hTildeDx[index] = self.hTildeDx[index]:Mul(sign)
            self.hTildeDz[index] = self.hTildeDz[index]:Mul(sign)
            self.vertices[index1].x = self.vertices[index1].ox + self.hTildeDx[index].a * lambda
            self.vertices[index1].z = self.vertices[index1].oz + self.hTildeDz[index].a * lambda

            self.hTildeSlopex[index] = self.hTildeSlopex[index]:Mul(sign)
            self.hTildeSlopez[index] = self.hTildeSlopez[index]:Mul(sign)
            local nx = 0.0 - self.hTildeSlopex[index].a
            local nz = 0.0 - self.hTildeSlopez[index].a
            local nlen = math.sqrt(nx * nx + 1.0 + nz * nz)
            self.vertices[index1].nx = nx / nlen
            self.vertices[index1].ny = 1.0 / nlen
            self.vertices[index1].nz = nz / nlen

            -- tiling edges
            if n == 0 and m == 0 then
                local di = index1 + N + Nplus1 * N
                self.vertices[di].y = self.hTilde[index].a
                self.vertices[di].x = self.vertices[di].ox + self.hTildeDx[index].a * lambda
                self.vertices[di].z = self.vertices[di].oz + self.hTildeDz[index].a * lambda
                self.vertices[di].nx = self.vertices[index1].nx
                self.vertices[di].ny = self.vertices[index1].ny
                self.vertices[di].nz = self.vertices[index1].nz
            end
            if n == 0 then
                local di = index1 + N
                self.vertices[di].y = self.hTilde[index].a
                self.vertices[di].x = self.vertices[di].ox + self.hTildeDx[index].a * lambda
                self.vertices[di].z = self.vertices[di].oz + self.hTildeDz[index].a * lambda
                self.vertices[di].nx = self.vertices[index1].nx
                self.vertices[di].ny = self.vertices[index1].ny
                self.vertices[di].nz = self.vertices[index1].nz
            end
            if m == 0 then
                local di = index1 + Nplus1 * N
                self.vertices[di].y = self.hTilde[index].a
                self.vertices[di].x = self.vertices[di].ox + self.hTildeDx[index].a * lambda
                self.vertices[di].z = self.vertices[di].oz + self.hTildeDz[index].a * lambda
                self.vertices[di].nx = self.vertices[index1].nx
                self.vertices[di].ny = self.vertices[index1].ny
                self.vertices[di].nz = self.vertices[index1].nz
            end
        end
    end
end

--- 高阶封装：创建可渲染的海洋模型
-- @param context Context
-- @param scene Scene
-- @param parent Node 父节点
-- @param materialPath string 材质路径
-- @param cache ResourceCache
-- @return table { node=Node, customGeometry=CustomGeometry, ocean=COcean, Update=function }
function OceanEffect.Create(context, scene, parent, materialPath, cache)
    local self = setmetatable({}, OceanEffect)
    self.ocean = COcean.New(64, 0.00004, Vector2(1.0, 12.0), 800.0)

    self.node = parent:CreateChild("OceanEffect")
    self.node:SetScale(Vector3(2.0, 2.0, 2.0))

    self.customGeometry = self.node:CreateComponent("CustomGeometry")
    self.customGeometry:SetNumGeometries(1)
    self.customGeometry:SetDynamic(true)

    local cg = self.customGeometry
    local Nplus1 = self.ocean.Nplus1

    cg:BeginGeometry(0, TRIANGLE_LIST)
    for m = 0, Nplus1 - 2 do
        for n = 0, Nplus1 - 2 do
            local function addVert(nv, mv)
                local idx = mv * Nplus1 + nv
                local v = self.ocean.vertices[idx]
                local u = nv / (Nplus1 - 1)
                local vv = mv / (Nplus1 - 1)
                cg:DefineVertex(Vector3(v.x, v.y, v.z))
                cg:DefineNormal(Vector3(v.nx, v.ny, v.nz))
                cg:DefineTexCoord(Vector2(u, vv))
            end
            addVert(n, m)
            addVert(n, m + 1)
            addVert(n + 1, m + 1)
            addVert(n, m)
            addVert(n + 1, m + 1)
            addVert(n + 1, m)
        end
    end
    cg:Commit()

    if materialPath and cache then
        local mat = cache:GetResource("Material", materialPath)
        if mat then
            cg:SetMaterial(0, mat)
        end
    end

    self.elapsedTime = 0.0

    --- 更新顶点到当前 FFT 状态
    -- @param timeStep number
    function self:Update(timeStep)
        self.elapsedTime = self.elapsedTime + timeStep
        self.ocean:EvaluateWavesFFT(self.elapsedTime)

        local cg2 = self.customGeometry
        cg2:BeginGeometry(0, TRIANGLE_LIST)
        for m = 0, Nplus1 - 2 do
            for n = 0, Nplus1 - 2 do
                local function addVert(nv, mv)
                    local idx = mv * Nplus1 + nv
                    local v = self.ocean.vertices[idx]
                    local u = nv / (Nplus1 - 1)
                    local vv = mv / (Nplus1 - 1)
                    cg2:DefineVertex(Vector3(v.x, v.y, v.z))
                    cg2:DefineNormal(Vector3(v.nx, v.ny, v.nz))
                    cg2:DefineTexCoord(Vector2(u, vv))
                end
                addVert(n, m)
                addVert(n, m + 1)
                addVert(n + 1, m + 1)
                addVert(n, m)
                addVert(n + 1, m + 1)
                addVert(n + 1, m)
            end
        end
        cg2:Commit()
    end

    return self
end

return OceanEffect
