import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import logo from "./assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData.email);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Successfully!!");
  };

  console.log(process.env.REACT_APP_ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to="">
          <div className="h-10">
            <img src={logo} alt="" className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex min-w-[120px] text-center">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>

          <div className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full p-0 m-0 text-sm text-center">
              0
            </div>
          </div>

          <div className=" text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-10 w-10" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white  py-3 shadow drop-shadow-md flex flex-col">
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"/newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    New Product
                  </Link>
                )}

                {userData.image ? (
                  <p
                    className="cursor-pointer text-white bg-red-500 px-2"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to={"/login"}
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}

                <nav className=" text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">Home</Link>
                  <Link to={"menu"} className="px-2 py-1">Menu</Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* mobile */}
    </header>
  );
};

export default Header;
