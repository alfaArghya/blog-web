import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "../../types";
import LabelledInput from "../LabelledInput";
import axios from "axios";
import { API_URL } from "../../config";

export const Auth = () => {
  const [signinInput, setSigninInput] = useState<SigninType>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const sendRequest = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/users/signin`,
        signinInput
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", signinInput.username);
      navigate("/blogs");
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center ">
        <div>
          <div className="text-3xl font-bold pb-5">Sign In to Your Account</div>
          <LabelledInput
            label="Username"
            placeholder="blog01web"
            onChange={(e) => {
              setSigninInput({
                ...signinInput,
                username: e.target.value,
              });
            }}
          />
          <LabelledInput
            type="password"
            label="Password"
            placeholder="Axbcy!Z@2134"
            onChange={(e) => {
              setSigninInput({
                ...signinInput,
                password: e.target.value,
              });
            }}
          />

          <button
            onClick={sendRequest}
            type="button"
            className="w-full text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Sign In
          </button>

          <div className="text-state-200">
            Don't have an Account?
            <Link to={"/signup"} className="pl-2 underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
