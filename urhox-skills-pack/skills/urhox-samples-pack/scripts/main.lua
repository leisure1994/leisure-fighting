-- urhox-samples-pack
-- Urho3D 官方示例精华提取，适用于 UrhoX 游戏引擎
-- 提供一组可直接复用的小型 Lua 模块

local M = {}

local MODULES = {
    SampleBasic = true,
    Sample2D = true,
    SampleAnimation = true,
    SampleSkeletalAnimation = true,
    SamplePhysics = true,
    SamplePhysics2D = true,
    SampleVehicle = true,
    SampleUI = true,
    SampleUtils = true,
    SampleScene3D = true,
    -- 新增模块
    SampleHelloGUI = true,
    SampleSprites = true,
    SampleStaticScene = true,
    SampleAnimatingScene = true,
    SampleBillboards = true,
    SampleDecals = true,
    SampleMultipleViewports = true,
    SampleRenderToTexture = true,
    SampleRagdolls = true,
    SampleSoundEffects = true,
    SampleNavigation = true,
    SampleWater = true,
    SampleUrho2DParticle = true,
    SampleConsoleInput = true,
    SampleLightAnimation = true,
    SampleDynamicGeometry = true,
    SamplePBRMaterials = true,
    SampleRibbonTrail = true,
    SampleInverseKinematics = true,
}

--- 加载指定的示例模块
-- @param name string 模块名称（如 "SampleVehicle"）
-- @return table|nil module 模块表
-- @return string|nil err 错误信息
function M.LoadModule(name)
    if not MODULES[name] then
        return nil, "未知模块: " .. tostring(name) .. "，可用模块: " .. table.concat(M.ListModules(), ", ")
    end
    local path = "scripts/" .. name
    local ok, mod = pcall(require, path)
    if not ok then
        return nil, tostring(mod)
    end
    return mod, nil
end

--- 获取所有可用模块名称列表
-- @return table names 模块名称数组
function M.ListModules()
    local list = {}
    for name, _ in pairs(MODULES) do
        table.insert(list, name)
    end
    table.sort(list)
    return list
end

--- 一次性加载全部模块到本地表（仅在需要时调用，避免不必要的内存开销）
-- @return table modules 所有模块的字典
function M.LoadAllModules()
    local result = {}
    for name, _ in pairs(MODULES) do
        local mod, err = M.LoadModule(name)
        if mod then
            result[name] = mod
        else
            result[name] = { _error = err }
        end
    end
    return result
end

return M
