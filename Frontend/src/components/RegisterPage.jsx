import React, { useState } from "react";
import diceBackground from "../../public/images/diceBackground.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../Context/AuthProvider";
import { FaRegEyeSlash } from "react-icons/fa"; // slash in eye
<FaRegEyeSlash />
import { IoEyeOutline } from "react-icons/io5"; // normal eye
<IoEyeOutline />

const RegisterPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { AuthUser, setAuthUser } = useAuth();
  const [hide , setHide] = useState(true)

  const navigate = useNavigate();

  const setFalse = ()=> setHide(false)
  const setTrue = ()=> setHide(true)
  const notify = (message, type) => {
    toast(message, { type, position: "top-center", autoClose: 3000 });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notify("Please enter both email and password", "error");
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });
      if (data) {
        notify("Login successful!", "success");
        localStorage.setItem("User", JSON.stringify(data.user));
        console.log(data.user);
        const initialAuthUser = localStorage.getItem("User");
        setAuthUser(initialAuthUser);
        setTimeout(() => {
          console.log("Navigating to homepage...");
          navigate("/homepage");
        }, 2000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notify(error.response.data.message, "error");
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }

    setName("");
    setPassword("");
    setEmail("");
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (!name || !password || !email) {
      notify("Please fill in all fields", "error");
      return;
    }
    try {
      const { data } = await axios.post("http://127.0.0.1:5000/api/signup", {
        email,
        name,
        password,
      });
      if (data) {
        console.log(data.user);
        notify("Signup successful!", "success");
        localStorage.setItem("User", JSON.stringify(data.user));
        const initialAuthUser = localStorage.getItem("User");
        setAuthUser(initialAuthUser);
        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
        const mailer = await axios.post("http://127.0.0.1:5000/api/mail", {
          email,
        });
        console.log(initialAuthUser.email);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        notify(error.response.data.message, "error");
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }

    setName("");
    setPassword("");
    setEmail("");
  };

  return (
    <>
      <ToastContainer />
      <div
        className="flex justify-center bg-gray-100 items-center min-h-screen bg-cover bg-center overflow-hidden"
        // style={{ backgroundImage: `url(${diceBackground})` }}
      >
        <div>
          <div className="flex justify-center  m-4">
            <div>
              <h1
                className="text-black font-mono text-4xl  font-bold"
                style={{
                  textShadow:
                    "1px 1px 0px gray, -1px -1px 0px white, 1px -1px 0px gray, -1px 1px 0px gray",
                }}
              >
                LuckyR<span className="text-red-500">o</span>ll.c
                <span className="text-red-500">o</span>m
              </h1>
            </div>
          </div>
          <div
            className="bg-white  bg-gray-100 p-4 rounded-md shadow-lg w-80 md:w-96 "
            style={{
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Toggle Buttons */}
            <div className="flex justify-center  space-x-4 md:space-x-4 mb-6">
              <button
                onClick={() => setShowLogin(true)}
                className={`md:px-14 px-11 md:py-2 py-2 rounded-lg duration-300 border-2 border-black font-semibold ${
                  showLogin
                    ? "bg-black text-white border-[1px] border-black"
                    : " bg-black bg-opacity-25 text-black border-[1px] border-black"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`md:px-14 px-9 md:py-2 py-2 rounded-lg duration-300 border-2 border-black font-semibold ${
                  !showLogin
                    ? "bg-black text-white border-[1px] border-black"
                    : " bg-black bg-opacity-25 text-black border-[1px] border-black"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Login Form */}
            {showLogin && (
              <form className="space-y-3">
                <div>
                  <label className="absolute text-sm bg-white p-1 ml-4 mt-[-12px]">Your email</label>
                  <input
                    className="w-full border-2 bg-transparent text-black border-gray-300 px-3 py-2 rounded-lg"
                    type="email"
                    value={email}
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="absolute text-sm bg-white p-1 ml-4 mt-[-12px]">Password</label>
                  <div className="flex">
                  <input
                    className="w-full border-2 bg-transparent text-black border-gray-300 px-3 py-2 rounded-lg"
                    type={hide ? "password" : "text"}
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {hide?
                  <IoEyeOutline
                  onClick={setFalse}
                  className="cursor-pointer absolute text-lg ml-64 md:ml-80 mt-3" />
                  : 
                  <FaRegEyeSlash
                  onClick={setTrue}
                  className="cursor-pointer absolute text-lg ml-64 md:ml-80 mt-3" /> } 
                  </div>
                </div>
                <button
                  className="w-full bg-black border-[1px] border-white text-white py-2 rounded-md hover:bg-gray-800"
                  type="button"
                  onClick={LoginSubmit}
                >
                  Login
                </button>
              </form>
            )}

            {/* Signup Form */}
            {!showLogin && (
              <form className="space-y-2">
                <div>
                  <label className="absolute text-sm bg-white px-1 ml-4 mt-[-9px]">Name</label>

                  <input
                    className="w-full border-2 bg-transparent text-black border-gray-300 px-3 py-2 rounded-lg"
                    
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="absolute text-sm bg-white px-1 ml-4 mt-[-9px]">email</label>
                  <input
                    className="w-full border-2 bg-transparent text-black border-gray-300 px-3 py-2 rounded-lg"
                    
                    type="email"
                    value={email}
                    autoComplete="current-email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="absolute text-sm bg-white px-1 ml-4 mt-[-9px]">Password</label>
                  <div className="flex">
                  <input
                    className="w-full border-2 bg-transparent text-black border-gray-300 px-3 py-2 rounded-lg"
                    type={hide ? "password" : "text"}
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {hide?
                  <IoEyeOutline
                  onClick={setFalse}
                  className="cursor-pointer absolute text-lg ml-64 md:ml-80 mt-3" />
                  : 
                  <FaRegEyeSlash
                  onClick={setTrue}
                  className="cursor-pointer absolute text-lg ml-64 md:ml-80 mt-3" /> } 
                  </div>
                </div>
                <button
                  className="w-full bg-black text-white border-[1px] border-white py-2 rounded-md hover:bg-gray-800"
                  onClick={signupSubmit}
                >
                  Sign up
                </button>
              </form>
            )}
          </div>
          <div className="flex justify-center mt-10 ">
            <div className="text-sm text-gray-600 space-y-3">
            <h1 >Privacy Policy &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Terms And Conditions</h1>
            <div className="flex justify-center">
            <h1>&copy;2025 by Gurkaran</h1>
            </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
