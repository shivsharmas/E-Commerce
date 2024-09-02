import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { ImageToBase64 } from "../../utility/ImageToBase64";

const Signup = () => {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setShowConfrimPassword((prev) => !prev);
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

  const handleUploadProfileImage = async (e) =>{
      const data = await ImageToBase64(e.target.files[0]);
      console.log(data);

      setData((prev)=> {
        return {
            ...prev,
            image : data
        }
      })
  }

  console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {firstName, email, password, confirmPassword} = data;
    if(firstName && email && password && confirmPassword) {
        if(password === confirmPassword)
        {
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
            method: "POST",
            headers: {
              'content-type' : 'application/json'
            },
            body: JSON.stringify(data)
          })

          const dataRes = await fetchData.json();
          console.log(dataRes)
          alert("successful");
            // navigate("/login")
        }else{
            alert("password and confirm password are not matched")
        }
    }else{
        alert("please enter required field");
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-2">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow shadow-md m-auto relative">
          <img
            src={data.image ? data.image : loginSignupImage}
            alt="login signup animation"
            className="w-full h-full"
          />

        <label htmlFor="profileImage">
          <div className="bg-slate-500 cursor-pointer  w-full text-center bg-opacity-40 absolute bottom-0 h-1/3">
            <p className=" p-1 text-white text-sm">Upload</p>
          </div>
          <input type={'file'} accept="image/*" id='profileImage' className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded outline-focus outline-blue-200"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-2 rounded outline-focus outline-blue-200"
            value={data.lastName}
            onChange={handleOnChange}
          />

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 -py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within: outline-blue-200">
            <input
              type={showConfrimPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
              />

            <span className="flex text-xl mt-3" onClick={handleConfirmPassword}>
              {showConfrimPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button type="submit" className="w-full max-w-[150px] m-auto bg-red-500  hover:bg-red-600 text-white text-xl font-medium text-center px-3 py-1 mt-4 items-center rounded-full cursor-pointer">
            Sign Up
          </button>
        </form>
        <p className="text-left text-sm mt-3 mb-1">
          {" "}
          Already have account?{" "}
          <Link to={"/login"} className="text-red-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
