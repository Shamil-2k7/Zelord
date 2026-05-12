"use client";

import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import axios from "axios";
import { useFormik } from "formik";
import "./login.css";
import { useRouter } from "next/navigation";
export default function Login() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Invalid email format";
            }

            if (!values.password) {
                errors.password = "Password is required";
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/login",
                    values
                );

                console.log(res.data);

                alert(res.data.message || "Login Success ✅");

                if (res.data.login) {
                localStorage.setItem("token", res.data.token);
                router.push("/admin");
                    localStorage.setItem("token", res.data.token); // ✅ save token
                }

                resetForm();

            } catch (error) {
                console.log(error);
                alert(
                    error?.response?.data?.message || "Login Failed ❌"
                );
            }
        },
    });



    return (
        <div className="mainWrapper">
            {/* HEADER */}
            <div className="header">
                <Button text="Home"
                    onclick={() => { router.push("/") }} />
            </div>

            {/* HEADING */}
            <div className="heading">
                <h1>Login</h1>
            </div>

            {/* FORM */}
            <div className="FormWrapper">
                <form onSubmit={formik.handleSubmit}>

                    {/* EMAIL */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.email && (
                        <span className="error">{formik.errors.email}</span>
                    )}

                    {/* PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <span className="error">{formik.errors.password}</span>
                    )}
                    <a href="/forgotpassword">forgot password</a>
                    {/* BUTTON */}
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}