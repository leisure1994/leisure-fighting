-- SampleVehicle.lua
-- 简化版载具控制器：hinge 约束连接车轮与车身
-- 对应原版示例：19_VehicleDemo、46_RaycastVehicleDemo

local Utils = require("SampleUtils")
local M = {}

local CTRL_FORWARD = 1
local CTRL_BACK = 2
local CTRL_LEFT = 4
local CTRL_RIGHT = 8

--- 创建地形并挂载地形碰撞体
-- @param scene Scene 场景实例
-- @return Node 地形节点
function M.CreateTerrain(scene)
    local terrainNode = scene:CreateChild("Terrain")
    terrainNode.position = Vector3.ZERO
    local terrain = terrainNode:CreateComponent("Terrain")
    terrain.patchSize = 64
    terrain.spacing = Vector3(2.0, 0.1, 2.0)
    terrain.smoothing = true
    terrain.heightMap = cache:GetResource("Image", "Textures/HeightMap.png")
    terrain.material = cache:GetResource("Material", "Materials/Terrain.xml")
    terrain.occluder = true

    local body = terrainNode:CreateComponent("RigidBody")
    body.collisionLayer = 2
    local shape = terrainNode:CreateComponent("CollisionShape")
    shape:SetTerrain()
    return terrainNode
end

--- 初始化车轮节点（物理约束挂接到车身）
-- @param scene Scene 场景实例
-- @param name string 车轮名
-- @param hullBody RigidBody 车身刚体
-- @param worldPos Vector3 车轮世界位置
-- @param isRight boolean 是否在右侧（影响约束轴）
-- @return Node 车轮节点
local function InitWheel(scene, name, hullBody, worldPos, isRight)
    local wheelNode = scene:CreateChild(name)
    wheelNode.position = worldPos
    wheelNode.rotation = hullBody.node.worldRotation * (isRight and Quaternion(0.0, 0.0, -90.0) or Quaternion(0.0, 0.0, 90.0))
    wheelNode:SetScale(0.8, 0.5, 0.8)

    local wheelObj = wheelNode:CreateComponent("StaticModel")
    wheelObj.model = cache:GetResource("Model", "Models/Cylinder.mdl")
    wheelObj.material = cache:GetResource("Material", "Materials/Stone.xml")
    wheelObj.castShadows = true

    local wb = wheelNode:CreateComponent("RigidBody")
    wb.friction = 1.0
    wb.mass = 1.0
    wb.linearDamping = 0.2
    wb.angularDamping = 0.75
    wb.collisionLayer = 1

    local ws = wheelNode:CreateComponent("CollisionShape")
    ws:SetSphere(1.0)

    local constraint = wheelNode:CreateComponent("Constraint")
    constraint.constraintType = CONSTRAINT_HINGE
    constraint.otherBody = hullBody
    constraint.worldPosition = worldPos
    constraint.axis = Vector3.UP
    constraint.otherAxis = isRight and Vector3.RIGHT or Vector3.LEFT
    constraint.lowLimit = Vector2(-180.0, 0.0)
    constraint.highLimit = Vector2(180.0, 0.0)
    constraint.disableCollision = true

    return wheelNode
end

--- 创建一辆由 RigidBody + Constraint 组成的简化物理车辆
-- @param scene Scene 场景实例
-- @param pos Vector3 车辆初始位置
-- @return table 车辆数据表 { node=车身节点, hullBody=车身刚体, wheels=车轮表, controls=Controls 对象 }
function M.CreateVehicle(scene, pos)
    local vehicleNode = scene:CreateChild("Vehicle")
    vehicleNode.position = pos or Vector3(0.0, 5.0, 0.0)
    vehicleNode:SetScale(1.5, 1.0, 3.0)

    local hullObj = vehicleNode:CreateComponent("StaticModel")
    hullObj.model = cache:GetResource("Model", "Models/Box.mdl")
    hullObj.material = cache:GetResource("Material", "Materials/Stone.xml")
    hullObj.castShadows = true

    local hullBody = vehicleNode:CreateComponent("RigidBody")
    hullBody.mass = 4.0
    hullBody.linearDamping = 0.2
    hullBody.angularDamping = 0.5
    hullBody.collisionLayer = 1

    local hullShape = vehicleNode:CreateComponent("CollisionShape")
    hullShape:SetBox(Vector3.ONE)

    local vw = {
        fl = InitWheel(scene, "FrontLeft", hullBody, vehicleNode:LocalToWorld(Vector3(-0.6, -0.4, 0.3)), false),
        fr = InitWheel(scene, "FrontRight", hullBody, vehicleNode:LocalToWorld(Vector3(0.6, -0.4, 0.3)), true),
        rl = InitWheel(scene, "RearLeft", hullBody, vehicleNode:LocalToWorld(Vector3(-0.6, -0.4, -0.3)), false),
        rr = InitWheel(scene, "RearRight", hullBody, vehicleNode:LocalToWorld(Vector3(0.6, -0.4, -0.3)), true),
    }

    local data = {
        node = vehicleNode,
        hullBody = hullBody,
        wheels = vw,
        controls = Controls(),
        steering = 0.0,
        axes = {
            fl = vw.fl:GetComponent("Constraint"),
            fr = vw.fr:GetComponent("Constraint"),
        },
        bodies = {
            fl = vw.fl:GetComponent("RigidBody"),
            fr = vw.fr:GetComponent("RigidBody"),
            rl = vw.rl:GetComponent("RigidBody"),
            rr = vw.rr:GetComponent("RigidBody"),
        },
        ENGINE_POWER = 10.0,
        DOWN_FORCE = 10.0,
        MAX_WHEEL_ANGLE = 22.5,
    }
    return data
end

--- 在 FixedUpdate（或自定义物理帧步调）中更新车辆物理
-- @param vehicle table M.CreateVehicle 返回的数据表
-- @param timeStep number 时间步长
function M.UpdateVehiclePhysics(vehicle, timeStep)
    local newSteering = 0.0
    local accelerator = 0.0

    if vehicle.controls:IsDown(CTRL_LEFT) then newSteering = -1.0 end
    if vehicle.controls:IsDown(CTRL_RIGHT) then newSteering = 1.0 end
    if vehicle.controls:IsDown(CTRL_FORWARD) then accelerator = 1.0 end
    if vehicle.controls:IsDown(CTRL_BACK) then accelerator = -0.5 end

    if newSteering ~= 0.0 then
        vehicle.bodies.fl:Activate()
        vehicle.bodies.fr:Activate()
        vehicle.steering = vehicle.steering * 0.95 + newSteering * 0.05
    else
        vehicle.steering = vehicle.steering * 0.8 + newSteering * 0.2
    end

    local steeringRot = Quaternion(0.0, vehicle.steering * vehicle.MAX_WHEEL_ANGLE, 0.0)
    vehicle.axes.fl.otherAxis = steeringRot * Vector3.LEFT
    vehicle.axes.fr.otherAxis = steeringRot * Vector3.RIGHT

    if accelerator ~= 0.0 then
        local torqueVec = Vector3(vehicle.ENGINE_POWER * accelerator, 0.0, 0.0)
        vehicle.bodies.fl:ApplyTorque(vehicle.node.rotation * steeringRot * torqueVec)
        vehicle.bodies.fr:ApplyTorque(vehicle.node.rotation * steeringRot * torqueVec)
        vehicle.bodies.rl:ApplyTorque(vehicle.node.rotation * torqueVec)
        vehicle.bodies.rr:ApplyTorque(vehicle.node.rotation * torqueVec)
    end

    local localVelocity = vehicle.hullBody.rotation:Inverse() * vehicle.hullBody.linearVelocity
    vehicle.hullBody:ApplyForce(vehicle.hullBody.rotation * Vector3.DOWN * math.abs(localVelocity.z) * vehicle.DOWN_FORCE)
end

--- 将 WASD 输入同步到车辆控制表
-- @param vehicle table 车辆数据表
function M.ApplyWASDControls(vehicle)
    if ui.focusElement ~= nil then
        vehicle.controls:Set(CTRL_FORWARD + CTRL_BACK + CTRL_LEFT + CTRL_RIGHT, false)
        return
    end
    vehicle.controls:Set(CTRL_FORWARD, input:GetKeyDown(KEY_W))
    vehicle.controls:Set(CTRL_BACK, input:GetKeyDown(KEY_S))
    vehicle.controls:Set(CTRL_LEFT, input:GetKeyDown(KEY_A))
    vehicle.controls:Set(CTRL_RIGHT, input:GetKeyDown(KEY_D))
end

return M
