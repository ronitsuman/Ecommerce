import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuTicketPercent } from "react-icons/lu";

const Navbar = () => {
    const [show, setShow] = useState(true);
    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu); // ✅ Toggle menu state
    };

    const toggleClose = () => {
        setShow(false); // ✅ Hide notification bar
    };

    return (
        <div>
            {/* ✅ Notification Bar */}
            {show && (
                <div className="space-x-[-40px] min-w-[320px] h-[40px] max-w-[1440px] lg:text-xl md:relative lg:relative bg-[#F5F5F5] flex items-center justify-center lg:gap-4 lg:px-4 lg:mx-auto">
                    {/* ✅ Icon and Text */}
                    <div className="text-[14px] flex items-center space-x-4 sm:text-[18px]">
                        <LuTicketPercent />
                        <p>30% off storewide — Limited time!</p>
                        <a href="#" className="invisible sm:visible sm:flex sm:gap-4 sm:items-center text-blue-500 border-b-2 hover:text-green-500">
                            Shop Now <FaArrowRightLong />
                        </a>
                    </div>
                    {/* ✅ Close Button */}
                    <button onClick={toggleClose} className="text-base sm:text-[18px] text-gray-600 font-bold md:absolute sm:right-2 md:right-8 lg:absolute lg:right-8 hover:cursor-pointer hover:text-red-600">
                        X
                    </button>
                </div>
            )}

            {/* ✅ Navbar */}
            <nav className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-serif">
                {/* ✅ Hamburger Menu (For Mobile) */}
                <div className="px-4 flex items-center gap-2 cursor-pointer md:hidden">
                    <GiHamburgerMenu className="w-6 h-6 relative" onClick={toggleMenu} />
                    <a href="#" className="text-2xl font-bold">3legant.</a>
                </div>

                {/* ✅ Navbar Links (Mobile) */}
                {menu && (
                    <div className="absolute w-full h-auto  top-16 left-0 bg-red-500 w-48 h-48 z-50 flex flex-col shadow-md">
                        <a href="#" className="block p-4 hover:bg-red-600">Home</a>
                        <a href="#" className="block p-4 hover:bg-red-600">About</a>
                        <a href="#" className="block p-4 hover:bg-red-600">Services</a>
                        <a href="#" className="block p-4 hover:bg-red-600">Contact</a>
                    </div>
                )}

                {/* ✅ Logo (For Desktop) */}
                <a href="#" className="hidden md:block text-2xl font-bold pl-16">3legant.</a>

                {/* ✅ Cart Icon */}
                <div className=" text-[20px] md:invisible flex items-center justify-center gap-2 pr-8">
                    <IoBag className="text-2xl" />
                    <span className="bg-gray-900 text-white text-center p-2 rounded-2xl">2</span>
                </div>

                {/* ✅ Navbar Links (For Desktop) */}
                <div className="hidden md:block pr-8">
                    <a href="#" className="p-4 hover:text-red-600">Home</a>
                    <a href="#" className="p-4 hover:text-red-600">About</a>
                    <a href="#" className="p-4 hover:text-red-600">Services</a>
                    <a href="#" className="p-4 hover:text-red-600">Contact</a>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
