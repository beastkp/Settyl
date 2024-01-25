import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import axios from "axios";

const Login = () => {
  const [loggeduser, setLoggeduser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};

    if (loggeduser.email && loggeduser.password) {
      data = {
        email: loggeduser.email,
        password: loggeduser.password,
      };
      console.log(data);
      try {
        // dispatch(showLoading());
        const res = await axios.post(
          "http://localhost:5000/api/v1/user/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          console.log("Logged in");
          navigate("/");
        } else {
          console.log("Doesnt Navigate");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Not logged in ");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 h-96 w-96">
        <h2 className="text-2xl font-bold mb-8 text-center">Login Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6   ">
            <label htmlFor="" className="block text-gray-700 p-2 text-left">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded h-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={loggeduser.email}
              onChange={(e) => {
                setLoggeduser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="mb-6 flex-col">
            <label
              htmlFor="password"
              className="block text-gray-700 p-2 text-left"
            >
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded h-10 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={loggeduser.password}
              onChange={(e) => {
                setLoggeduser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className=" ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
