import "./login.css";
import "./login.js";
import React, { useState, useEffect, useRef } from "react";
import {
  handleMouseMove,
  handleFocusPassword,
  handleFocusOutPassword,
} from "./login.js";
import { login } from "../../utils/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const passRef = useRef(null);
  const submitBtnRef = useRef(null);
  const navigate = useNavigate();

  // Fix login using google click event

  useEffect(() => {
    document.addEventListener("mousemove", (event) => handleMouseMove(event));
    passRef.current.addEventListener("focus", (event) =>
      handleFocusPassword(event)
    );
    passRef.current.addEventListener("focusout", (event) =>
      handleFocusOutPassword(event)
    );

    submitBtnRef.current.addEventListener("mouseover", (event) =>
      document.getElementById("ball").classList.toggle("look_at")
    );
    submitBtnRef.current.addEventListener("mouseout", (event) =>
      document.getElementById("ball").classList.toggle("look_at")
    );

    return () => {
      document.removeEventListener("mousemove", (event) =>
        handleMouseMove(event)
      );
      passRef?.current?.removeEventListener("focus", (event) =>
        handleFocusPassword(event)
      );
      passRef?.current?.removeEventListener("focusout", (event) =>
        handleFocusOutPassword(event)
      );

      submitBtnRef?.current?.removeEventListener("mouseover", (event) =>
        document.getElementById("ball").classList.toggle("look_at")
      );
      submitBtnRef?.current?.removeEventListener("mouseout", (event) =>
        document.getElementById("ball").classList.toggle("look_at")
      );
    };
  }, []);


  return (
    <main>
      <section className="form">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
            />
          </svg>
        </div>
        <h1 className="form__title">Log in to your Account</h1>
        <p className="form__description">
          Welcome back! Please, enter your information
        </p>

        <form className="login-form">
          <label className="form-control__label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label className="form-control__label">Password</label>
          <div className="password-field">
            <input
              type="password"
              className="form-control"
              minLength="4"
              id="password"
              value={formData.password}
              ref={passRef}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="form__submit"
            id="submit"
            ref={submitBtnRef}
          >
            Log In
          </button>
        </form>

        <div className="flex items-center w-full max-w-[420px] my-6 gap-1">
          <span className="flex-1 h-[2px] bg-[rgb(235,233,233)] " />
          <p className="opacity-80">or</p>
          <span className="flex-1 h-[2px] bg-[rgb(235,233,233)] " />
        </div>

        <button
          className="flex items-center justify-center gap-3 border border-gray-200 w-full max-w-[420px] h-[52px] rounded-lg font-medium hover:bg-gray-100 transition-all ease-in-out shadow-sm hover:shadow-lg"
          onClick={async() => {
            await login();
            // Fix as it navigate before logging in
            navigate("/");
          }}
        >
          <FcGoogle className="scale-[1.5]" />
          <p>Log In using Google</p>
        </button>
      </section>

      <section className="form__animation">
        <div id="ball">
          <div className="ball">
            <div id="face">
              <div className="ball__eyes">
                <div className="eye_wrap">
                  <span className="eye"></span>
                </div>
                <div className="eye_wrap">
                  <span className="eye"></span>
                </div>
              </div>
              <div className="ball__mouth"></div>
            </div>
          </div>
        </div>
        <div className="ball__shadow"></div>
      </section>
    </main>
  );
};

export default Login;
