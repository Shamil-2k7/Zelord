"use client"
import { useEffect, useState } from 'react';
import './globals.css';
import axios from 'axios';
import { motion } from 'framer-motion'; // 1. Import Framer Motion
import Nav from '../components/Nav/Nav.jsx';
import Footer from '../components/footer/Footer.jsx';

// 2. Define Animation Variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

export default function Home() {
    const [image, setimage] = useState([]);
    const [reel, setreel] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getlist`)
            .then(response => {
                setimage(response.data.images)
                setreel(response.data.videos)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="homewrapper">
            <Nav />

            {/* HERO SECTION - Entrance Animation */}
            <section id="hero" style={{ padding: 0, minHeight: "100vh", position: "relative", display: "flex", alignItems: "center" }}>
                <div className="hero-bg"></div>
                <motion.div 
                    className="hero-content" 
                    style={{ paddingTop: "var(--nav-h)" }}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    <motion.p variants={fadeIn} className="hero-eyebrow">Premium Bus Charter Service</motion.p>
                    <motion.h1 variants={fadeIn} className="hero-title">
                        <span className="gold">European</span><br /> Intercity<br /> Routes
                    </motion.h1>
                    <motion.p variants={fadeIn} className="hero-sub">Plan Your Dream Travel Destinations with us</motion.p>
                    <motion.div variants={fadeIn} className="hero-btns">
                        <a href="#routes" className="btn btn-gold">View Routes →</a>
                        <a href="#features" className="btn btn-outline">Learn More</a>
                    </motion.div>
                </motion.div>
            </section>

            {/* DESTINATIONS - Reveal on Scroll */}
            <section id="destinations">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeIn}
                    className="reveal"
                >
                    <p className="eyebrow">Let's Ride Together</p>
                    <h2>Popular Destinations</h2>
                </motion.div>

                <motion.div 
                    className="dest-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {["Rome", "Paris", "Prague", "London"].map((city, i) => (
                        <motion.div 
                            key={city}
                            variants={fadeIn}
                            whileHover={{ scale: 1.05 }} // Interactive hover
                            className="dest-card"
                        >
                            <img src={`/${i + 1}.${i === 3 ? 'webp' : 'jpg'}`} alt={city} />
                            <div className="dest-overlay">
                                <div className="dest-tag">Best</div>
                                <div className="dest-name">{city === "Rome" ? "45 Seats" : city === "Paris" ? "Sound system" : city === "Prague" ? "Full AC" : "4K HDR displays"}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* FEATURES - Side Reveal */}
            <section id="features">
                <div className="features-wrap">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="features-img"
                    >
                        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" alt="Happy traveller" />
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <p className="eyebrow">What Will You Get</p>
                        <h2>Day and Night Routes<br />at the Best Time</h2>
                        <div className="feature-list">
                            {[1, 2, 3, 4].map((num) => (
                                <motion.div variants={fadeIn} key={num} className="feature-item">
                                    <div className="feature-num">0{num}.</div>
                                    <div>
                                        <div className="feature-title">Feature Title {num}</div>
                                        <div className="feature-desc">High-quality description of service comfort and reliability.</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* GALLERY - Fetched Data Animation */}
            <section id="gallery">
                <p className="eyebrow">Our Moments</p>
                <h2>Image Gallery</h2>
                <motion.div 
                    className="gallery-grid"
                    layout // Smoothly rearranges if items change
                >
                    {image.map((img, index) => (
                        <motion.img 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img.File}`} 
                        />
                    ))}
                </motion.div>
            </section>

            <motion.div 
                className="cta-banner"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <h2>Ready to hit the road? Book your ticket today.</h2>
                <a href="#routes" className="btn btn-navy">Book Now →</a>
            </motion.div>

 <section id="gallery">
                
                <h2>Video Gallery</h2>
                <motion.div 
                    className="gallery-grid"
                    layout // Smoothly rearranges if items change
                >
                    {reel.map((img, index) => (
                        <motion.img 
                            key={index} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${img.File}`} 
                        />
                    ))}
                </motion.div>
            </section>


            <Footer />
        </div>
    )
}