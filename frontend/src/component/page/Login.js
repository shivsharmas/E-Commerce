import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => {
        return {
            ...prev, 
            [name] : value
        }
    })

    console.log(data)
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const { email, password} = data;
    if(email && password) {
      alert("successful")
    }else{
        alert("please enter required field");
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-2">
        <div className="w-20 overflow-hidden rounded-full drop-shadow shadow-md m-auto">
          <img
            src={loginSignupImage}
            alt="login signup animation"
            className="w-full"
          />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded outline-focus outline-blue-200"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-1 -py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within: outline-blue-200">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded outline-none"
              value={data.password}
              onChange={handleOnChange}
              />
            <span className="flex text-xl mt-3" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>


          <button type="submit" className="w-full max-w-[150px] m-auto bg-red-500  hover:bg-red-600 text-white text-xl font-medium text-center px-3 py-1 mt-4 items-center rounded-full cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="text-left text-sm mt-3 mb-1">
          
          Don't have account?{" "}
          <Link to={"/signup"} className="text-red-600 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
