import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {};

    if (user.name && user.email && user.password) {
      console.log("User Registered");
      data = {
        name: user.name,
        email: user.email,
        password: user.password,
      };
      console.log(user);
    }
    console.log(user);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status===201) {
        console.log(res);
        navigate("/login");
      } else {
        console.log(res);
        console.log("Not registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 h-auto w-96">
        <h2 className="text-2xl font-bold mb-8">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={user.name}
              onChange={(e) =>
                setUser((prevState) => ({ ...prevState, name: e.target.value }))
              }
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) =>
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="py-2 my-1">
            <Link to="/login">
              Already a User? <span className="text-blue-500">Login here</span>
            </Link>
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
