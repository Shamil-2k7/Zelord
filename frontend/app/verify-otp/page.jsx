"use client";

import Button from "../../components/Button/Button";
import axios from "axios";
import { useFormik } from "formik";
import "./login.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function Newpassword() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // ✅ get email from URL
    const email = searchParams.get("email");
    
    const formik = useFormik({
        initialValues: {
            otp: "",
            password: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.otp) {
                errors.otp = "OTP is required";
            }

            if (!values.password) {
                errors.password = "Password is required";
            } else if (values.password.length < 6) {
                errors.password = "Minimum 6 characters";
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                const res = await axios.post(
                    "http://localhost:5000/verify-otp", // ✅ correct API
                    {
                        email,
                        otp: values.otp,
                        password: values.password,
                    }
                );

                alert(res.data.message || "Password Updated ✅");

                // ✅ redirect to login
                router.push("/admin");

            } catch (error) {
                console.log(error);
                alert(
                    error?.response?.data?.message || "Reset Failed ❌"
                );
            }
        },
    });

    return (
        <div className="mainWrapper">

            {/* HEADER */}
            <div className="header">
                <Button
                    text="Home"
                    onClick={() => router.push("/")}
                />
            </div>

            {/* HEADING */}
            <div className="heading">
                <h1>Reset Password</h1>
            </div>

            {/* FORM */}
            <div className="FormWrapper">
                <form onSubmit={formik.handleSubmit}>

                    {/* OTP */}
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={formik.values.otp}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.otp && (
                        <span className="error">{formik.errors.otp}</span>
                    )}

                    {/* NEW PASSWORD */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter New Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.password && (
                        <span className="error">{formik.errors.password}</span>
                    )}

                    {/* BUTTON */}
                    <button type="submit">Update Password</button>
                </form>
            </div>
        </div>
    );
}