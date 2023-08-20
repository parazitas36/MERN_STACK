import { NavItem } from "../../../data/types/NavItem";

export interface ResponsiveNavbarProps {
	items?: NavItem[];
	isInSmallScreen?: boolean;
	isMenuToggled?: boolean | false;
}