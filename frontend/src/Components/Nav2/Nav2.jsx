import { menuItemsData } from "../../utils/menuItems";
import MenuItems from "../Menuitems/Menuitems";

const Nav2 = () => {
 const depthLevel = 0;

 return (
 <nav className="bg-white shadow-md w-full">
 <ul className="flex flex-col md:flex-row md:items-center md:justify-start gap-1 md:gap-4 p-2 md:p-4">
 {menuItemsData.map((menu, index) => (
 <MenuItems items={menu} key={index} depthLevel={depthLevel} />
 ))}
 </ul>
 </nav>
 );
};

export default Nav2;
