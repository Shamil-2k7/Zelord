"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Button from "../../../components/Button/Button";
import "./page.css";
import { useRouter } from "next/navigation"

export default function AddnewReel() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login"); // ❌ not logged in
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            ReelName: "",
            file: null,
        },

        validate: (values) => {
            const errors = {};

            if (!values.ReelName) {
                errors.ReelName = "Reel name is required";
            }

            if (!values.file) {
                errors.file = "Please select a video";
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");

                const formData = new FormData();
                formData.append("ReelName", values.ReelName);
                formData.append("file", values.file);

                const res = await axios.post(
                    "http://localhost:5000/addreel",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                alert("Upload Success ✅");
                resetForm();
                setPreview("");

            } catch (error) {
                console.log(error);
                alert("Upload Failed ❌");
            } finally {
                setLoading(false);
            }
        }
    });

    const handleVideo = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith("video/")) {
                alert("Only video allowed");
                return;
            }

            formik.setFieldValue("file", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (


        <div className="AddnewWrapper">
            {/* Header */}
            <div className="header">
                <div>
                    <h1>Add New Reel</h1>

                    <Button
                        text="Back"
                        onClick={() => (window.location.href = "/admin")}
                    />
                </div>

                {/* Form */}
                <form className="formWrapper" onSubmit={formik.handleSubmit}>
                    <div className="inputBox">
                        <input
                            type="text"
                            name="ReelName"
                            placeholder="Enter Reel Name"
                            onChange={formik.handleChange}
                            value={formik.values.ReelName}
                        />
                        {formik.errors.ReelName && (
                            <span className="error">{formik.errors.ReelName}</span>
                        )}
                    </div>

                    <div className="inputBox">
                        <input type="file" accept="video/*" onChange={handleVideo} />
                        {formik.errors.file && (
                            <span className="error">{formik.errors.file}</span>
                        )}
                    </div>

                    {preview && (
                        <div className="previewBox">
                            <video src={preview} controls width="100%" />
                        </div>
                    )}

                    <button type="submit" disabled={loading}>
                        {loading ? "Uploading..." : "Upload Reel"}
                    </button>
                </form>
            </div>
        </div>
    );
}