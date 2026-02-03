import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import vercel from "./assets/icons/Vercel.png";
import react from "./assets/icons/React.png";
import node from "./assets/icons/Nodejs.png";

const Footer = () => {
  return (
    <>
      <hr />
      <footer className="footer" id="links">
        {/* Column 1: Social Media */}
        <div className="footer-column">
          <div className="footer-socials">
            <a
              href="https://github.com/AceOfSpades-1710"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com/in/jsid1704"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:portfolioSJ@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Column 2: Stack Info */}
        <div className="footer-column">
          <p className="footer-item">
            Built with <img src={react} alt="React" /> React
          </p>

          <p className="footer-item">
            Deployed with <img src={vercel} alt="Vercel" /> Vercel
          </p>

          <p className="footer-item">
            Backed by <img src={node} alt="Node.js" /> Node.js
          </p>
        </div>

        {/* Column 3: Spotify */}
        <div className="footer-column">
          <div className="spotify-wrapper">
            <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/track/2SLwbpExuoBDZBpjfefCtV?theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify player"
            />

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
