import { NavItem } from "../../../data/types/NavItem";

export interface ResponsiveNavbarProps {
	links?: NavItem[];
	isInSmallScreen?: boolean | false;
	isMenuToggled?: boolean | false;
}