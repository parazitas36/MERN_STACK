import { To } from "react-router-dom";

export interface NavItem {
    label: String,
    route: To,
    component?: React.FC | React.ReactNode
}