import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice.js";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/find",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/register"} />;
  }
};

export default ProtectedRoute;
