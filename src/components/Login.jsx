import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../Firebase/Firebase";
import swal from "sweetalert";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();

  const useAppstate = useContext(Appstate);

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where("mobile", "==", form.mobile));
      const querySnapShot = await getDocs(quer);

      querySnapShot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if (isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            text: "Logged In",
            icon: "success",
            button: false,
            timer: 3000,
          });
          navigate("/");
        } else {
          swal({
            text: "Invalid Credentials",
            icon: "error",
            button: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        button: false,
        timer: 3000,
      });
    }

    setLoading(false);
  };

  return (
    <div className=" w-full mt-8 flex flex-col items-center ">
      <div className="text-xl font-bold">Login</div>
      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Mobile No.
          </label>
          <input
            type="text"
            id="message"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500  focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>

      <div class="p-2 w-full md:w-1/3">
        <div class="relative">
          <label for="message" class="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            id="message"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            name="message"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>

      <div class="p-2 w-full">
        <button onClick={login} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
          {loading ? <TailSpin height={30} color="white" /> : "Login"}
        </button>
      </div>
      <div className="">
        <p>
          Do not have account?
          <Link to={"/signup"}>
            <span className=" text-blue-400"> Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
