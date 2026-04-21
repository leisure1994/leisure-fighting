-- UrhoX Extra Effects - 统一入口模块
-- 整合 Ocean、GeomReplicator、UI 组件等特效工具

local M = {}

--- 几何体复制与风力动画模块
M.GeomReplicator = require("urhox-extra-effects/scripts/geom_replicator")

--- FFT 海洋波浪效果模块
M.OceanEffect = require("urhox-extra-effects/scripts/ocean_effect")

--- UI 画板工具模块
M.UIDrawTool = require("urhox-extra-effects/scripts/ui_draw_tool")

--- UI 2D 线条绘制模块
M.UILineComponent = require("urhox-extra-effects/scripts/ui_line_component")

--- UI 简易节点图模块
M.UINodeGraph = require("urhox-extra-effects/scripts/ui_node_graph")

--- UI 径向按钮组模块
M.UIRadialGroup = require("urhox-extra-effects/scripts/ui_radial_group")

--- UI 序列帧精灵动画模块
M.UISpriteAnimBox = require("urhox-extra-effects/scripts/ui_sprite_anim")

--- UI 标签页组件模块
M.UITabGroup = require("urhox-extra-effects/scripts/ui_tab_group")

--- 版本号
M.VERSION = "1.0.0"

return M
