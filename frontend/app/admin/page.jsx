"use client";
import axios from "axios";
import Button from "../../components/Button/Button";
import './page.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"

export default function Admin() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login"); // ❌ not logged in
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const [image, setimage] = useState([]);
    const [reel, setreel] = useState([]);
    const [admin,setadmin]= useState([]);
    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getlist`)
            .then(response => {
                setimage(response.data.images)
                setreel(response.data.videos)
                setadmin(response.data.admin)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleDeleteImage = async (id) => {
    try {
        const token = localStorage.getItem("token");

        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete-image/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        alert("Deleted ✅");

        // remove from UI
       setimage(prev => prev.filter(item => item._id !== id));
    } catch (error) {
        console.log(error);
        alert("Delete failed ❌");
    }
};

const handleDeleteVideo = async (id) => {
    try {
        const token = localStorage.getItem("token");

        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/delete-reel/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        alert("Video Deleted ✅");

        setreel(prev => prev.filter(item => item._id !== id));

    } catch (error) {
        console.log(error);
        alert("Delete failed ❌");
    }
};
    return (
        <div className="adminWrapper">
            <header>
                <div className="headerwrapper">
                    <h1>ZEDLORD</h1>
                    <Button text={"Logout"} onclick={handleLogout} />
                </div>
            </header>
            <div className="ImageGallary">
                <div className="headWrapper">
                    <h1>Image </h1>
                    <Button text={"Add New Image"} onclick={() => (window.location.href = "/admin/addnewimage")} />
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Image Name</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {image.map((image, index) => {
                            return (
                                <tr key={ index}>
                                    <td>{image.ImageName}</td>
                                    <td>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image.File}`}
                                            alt={image.ImageName}
                                            width="100"
                                        />
                                    </td>
                                    <td><Button text={'Delete'} onclick={() => handleDeleteImage(image._id)} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="ImageGallary">
                <div className="headWrapper">
                    <h1> Video</h1>
                    <Button text={"Add New Video"} onclick={() => (window.location.href = "/admin/addnewreel")} />
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Reel Name</th>
                            <th>Reel</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {reel.map((image, index) => {
                                return (

                                    <tr key={ index}    >
                                        <td>{image.ReelName}</td>
                                        <td>
                                            <video controls src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${image.File}`}></video>
                                        </td>
                                        <td><Button text={'Delete'} onclick={() => handleDeleteVideo(image._id)} /></td>
                                    </tr>
                                )
                            })
                            }
                        
                    </tbody>
                </table>
            </div>
            <div className="ImageGallary">
                <div className="headWrapper">
                    <h1>Admin</h1>
                    <Button text={"Add New Admin"} onclick={() => (window.location.href = "/admin/addnewadmin")} />
                </div>
                <table>
                    <thead>
                        <tr>

                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {admin.map((image, index) => {
                                return (

                                    <tr key={ index}    >
                                        <td>{image.Email}</td>
                                        <td><Button text={'Delete'} onclick={() => handleDeleteVideo(image._id)} /></td>
                                    </tr>
                                )
                            })
                            }
                        
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}