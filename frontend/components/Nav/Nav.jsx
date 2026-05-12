"use client"
import { useState } from "react"
import './nav.css'

 function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header>
        <a href="#hero" className="logo">
          <div>ZEDLORD<sub>TRAVEL STORIES</sub></div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="desktop-nav">
          <a href="#hero">Home <span className="arr">›</span></a>
          <a href="#features">About <span className="arr">›</span></a>
          <a href="#contact">Contacts</a>
        </nav>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a href="#hero" onClick={() => setOpen(false)}>Home</a>
        <a href="#features" onClick={() => setOpen(false)}>About</a>
        <a href="#contact" onClick={() => setOpen(false)}>Contacts</a>
      </div>
    </>
  )
}

export default Nav