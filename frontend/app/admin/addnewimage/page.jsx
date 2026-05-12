"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import Button from "../../../components/Button/Button";
import "./page.css";
import { useRouter } from "next/navigation"
export default function AddnewImage() {
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
            ImageName: "",
            file: null,
        },

        validate: (values) => {
            const errors = {};

            if (!values.ImageName) {
                errors.ImageName = "Image name is required";
            }

            if (!values.file) {
                errors.file = "Please select an image";
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {
            try {
                setLoading(true);

                const formData = new FormData();
                formData.append("ImageName", values.ImageName);
                formData.append("file", values.file);

                const res = await axios.post(
                    "http://localhost:5000/addimage",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                alert("Upload Success");
                console.log(res.data);

                resetForm();
                setPreview("");
            } catch (error) {
                console.log(error);
                alert("Upload Failed");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleImage = (e) => {
        const file = e.target.files[0];

        if (file) {
            formik.setFieldValue("file", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="AddnewWrapper">
            {/* Header */}
            <div className="header">
                <div>
                    <h1>Add New Image</h1>

                    <Button className="btn btn-gold"
                        text="Back"
                        onclick={() => (window.location.href = "/admin")}
                    />
                </div>

                {/* Form */}
                <form className="formWrapper" onSubmit={formik.handleSubmit}>
                    {/* Name Input */}
                    <div className="inputBox">
                        <input
                            type="text"
                            name="ImageName"
                            placeholder="Enter Image Name"
                            onChange={formik.handleChange}
                            value={formik.values.ImageName}
                        />
                        {formik.errors.ImageName && (
                            <span className="error">{formik.errors.ImageName}</span>
                        )}
                    </div>

                    {/* File Input */}
                    <div className="inputBox">
                        <input type="file" accept="image/*" onChange={handleImage} />
                        {formik.errors.file && (
                            <span className="error">{formik.errors.file}</span>
                        )}
                    </div>

                    {/* Preview */}
                    {preview && (
                        <div className="previewBox">
                            <img src={preview} alt="preview" />
                        </div>
                    )}

                    {/* Submit */}
                    <button type="submit" disabled={loading}>
                        {loading ? "Uploading..." : "Upload"}
                    </button>
                </form>
            </div>
        </div>
    );
}