"use client";

import Button from "../../components/Button/Button";
import axios from "axios";
import { useFormik } from "formik";
import "./login.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Forgotpassword() {
    const router = useRouter();

    // ✅ FIX: useEffect for localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin-data`, {
                headers: {
                    Authorization: `Bearer ${token}`, // ✅ add Bearer
                },
            })
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
                errors.email = "Invalid email format";
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/send-otp`,
                    values
                );

                alert(res.data.message || "OTP Sent ✅");

                router.push(`/verify-otp?email=${values.email}`);

                resetForm();

            } catch (error) {
                console.log(error);
                alert(
                    error?.response?.data?.message || "Failed to send OTP ❌"
                );
            }
        }
    });

    return (
        <div className="mainWrapper">

            <div className="header">
                <Button
                    text="Home"
                    onClick={() => router.push("/")}
                />
            </div>

            <div className="heading">
                <h1>Forgot Password</h1>
            </div>

            <div className="FormWrapper">
                <form onSubmit={formik.handleSubmit}>

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

                    <a href="/login">Back to Login</a>

                    <button type="submit">Send OTP</button>
                </form>
            </div>
        </div>
    );
}