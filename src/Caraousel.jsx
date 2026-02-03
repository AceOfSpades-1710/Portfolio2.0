
import AdobeIllustrator from "./assets/icons/AdobeIllustrator.png";
import Arduino from "./assets/icons/Arduino.png";
import AWS from "./assets/icons/AWS.png";
import Babel from "./assets/icons/Babel.png";
import Bash from "./assets/icons/Bash.png";
import Canva from "./assets/icons/Canva.png";
import CSS from "./assets/icons/CSS.png";
import Docker from "./assets/icons/Docker.png";
import Figma from "./assets/icons/figma.png";
import Flask from "./assets/icons/Flask.png";
import Git from "./assets/icons/Git.png";
import Go from "./assets/icons/Go.png";
import HTML from "./assets/icons/html.png";
import Java from "./assets/icons/Java.png";
import JavaScript from "./assets/icons/js.png";
import MongoDB from "./assets/icons/MongoDB.png";
import MySQL from "./assets/icons/mysql.png";
import NextJS from "./assets/icons/NextJS.png";
import NodeJS from "./assets/icons/Nodejs.png";
import Python from "./assets/icons/python.png";
import ReactIcon from "./assets/icons/React.png";
import Tailwind from "./assets/icons/Tailwind CSS.png";
import TypeScript from "./assets/icons/TypeScript.png";
import Vercel from "./assets/icons/Vercel.png";
import Vite from "./assets/icons/Vite.js.png";
import VSCode from "./assets/icons/VSCode.png";

function Carousel() {
  const items = [
    { icon: AdobeIllustrator, text: "Adobe Illustrator" },
    { icon: Arduino, text: "Arduino" },
    { icon: AWS, text: "AWS" },
    { icon: Babel, text: "Babel" },
    { icon: Bash, text: "Bash" },
    { icon: Canva, text: "Canva" },
    { icon: CSS, text: "CSS" },
    { icon: Docker, text: "Docker" },
    { icon: Figma, text: "Figma" },
    { icon: Flask, text: "Flask" },
    { icon: Git, text: "Git" },
    { icon: Go, text: "Go" },
    { icon: HTML, text: "HTML" },
    { icon: Java, text: "Java" },
    { icon: JavaScript, text: "JavaScript" },
    { icon: MongoDB, text: "MongoDB" },
    { icon: MySQL, text: "MySQL" },
    { icon: NextJS, text: "Next.js" },
    { icon: NodeJS, text: "Node.js" },
    { icon: Python, text: "Python" },
    { icon: ReactIcon, text: "React" },
    { icon: Tailwind, text: "Tailwind CSS" },
    { icon: TypeScript, text: "TypeScript" },
    { icon: Vercel, text: "Vercel" },
    {icon: Vite, text: "Vite"},
    {icon: VSCode, text: "VSCode"}
  ];

  return (
    <div className="news-carousel">
      <div className="news-track">
        {[...items, ...items].map((item, index) => (
          <div className="news-item" key={index}>
            <img
              src={item.icon}
              alt={item.text}
              className="news-icon"
            />
            <div className="news-text">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
