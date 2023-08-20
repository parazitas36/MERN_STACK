import { To } from "react-router-dom";

export interface NavItem {
    label: String,
    route: To,
    icon?: React.ReactNode,
    component?: React.FC | React.ReactNode
}