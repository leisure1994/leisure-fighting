-- UrhoX Extra Effects 特效库入口
-- 汇总 lumak-extra-samples 中的各种效果模块，提供统一的 require 入口

local ExtraEffects = {}

ExtraEffects.OceanEffect        = require("urhox-extra-effects/scripts/ocean_effect")
ExtraEffects.GeomReplicator     = require("urhox-extra-effects/scripts/geom_replicator")
ExtraEffects.UIRadialGroup      = require("urhox-extra-effects/scripts/ui_radial_group")
ExtraEffects.UITabGroup         = require("urhox-extra-effects/scripts/ui_tab_group")
ExtraEffects.UISpriteAnimBox    = require("urhox-extra-effects/scripts/ui_sprite_anim")
ExtraEffects.UILineComponent    = require("urhox-extra-effects/scripts/ui_line_component")
ExtraEffects.UIDrawTool         = require("urhox-extra-effects/scripts/ui_draw_tool")
ExtraEffects.UINodeGraph        = require("urhox-extra-effects/scripts/ui_node_graph")

--- 获取特效库版本信息
-- @return string
function ExtraEffects.GetVersion()
    return "1.0.0"
end

return ExtraEffects
