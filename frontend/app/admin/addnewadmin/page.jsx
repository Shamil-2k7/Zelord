"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Button from "../../../components/Button/Button";
import "./page.css";
import { useRouter } from "next/navigation";

export default function Addnewadmin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // ✅ protect route
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },

        validate: (values) => {
            const errors = {};

            if (!values.Email) {
                errors.Email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
                errors.Email = "Invalid email";
            }

            if (!values.Password) {
                errors.Password = "Password is required";
            } else if (values.Password.length < 6) {
                errors.Password = "Minimum 6 characters";
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");

                const res = await axios.post(
                    "http://localhost:5000/addadmin",
                    values,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert(res.data.message || "Admin Added ✅");
                resetForm();

            } catch (error) {
                console.log(error);
                alert(
                    error?.response?.data?.message || "Failed ❌"
                );
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="AddnewWrapper">

            {/* Header */}
            <div className="header">
                <div>
                    <h1>Add New Admin</h1>

                    <Button
                        className="btn btn-gold"
                        text="Back"
                        onClick={() => router.push("/admin")}
                    />
                </div>

                {/* Form */}
                <form className="formWrapper" onSubmit={formik.handleSubmit}>

                    {/* Email */}
                    <div className="inputBox">
                        <input
                            type="email"
                            name="Email"
                            placeholder="Enter Email"
                            onChange={formik.handleChange}
                            value={formik.values.Email}
                        />
                        {formik.errors.Email && (
                            <span className="error">{formik.errors.Email}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="inputBox">
                        <input
                            type="password"
                            name="Password"
                            placeholder="Enter Password"
                            onChange={formik.handleChange}
                            value={formik.values.Password}
                        />
                        {formik.errors.Password && (
                            <span className="error">{formik.errors.Password}</span>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add Admin"}
                    </button>

                </form>
            </div>
        </div>
    );
}