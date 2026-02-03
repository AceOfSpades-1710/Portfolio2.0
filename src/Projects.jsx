import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import portfolio from "/src/assets/projects/portfolio.png"
import Nero from '/src/assets/projects/Nero.png'
import ML from '/src/assets/projects/MLOps.png'
import Vanessa from '/src/assets/projects/Vanessa.png'
import Sentinel from '/src/assets/projects/Sentinel.png'
import Harvest from '/src/assets/projects/Harvest.png'
import DSN from '/src/assets/projects/DSN.png'
import ASL from '/src/assets/projects/ASL.jpg'

const projects = [
  {
    title: 'Portfolio1.0',
    subtitle: 'Static Portfolio Website',
    description: 'My first personal portfolio showcasing projects, blog links and contact.',
    img: portfolio,
    repo: '#',
    live: 'https://portfolio-website-git-main-sjs-projects-5e9c291d.vercel.app',
    tags: ['HTML', 'JavaScript', 'CSS']
  },
  {
    title: 'Neural Network - from Scratch',
    subtitle: '2-Layer Neural Network using numpy only',
    description: 'A neural network built from scratch using only NumPy to classify handwritten digits from the MNIST dataset with 88.47% accuracy.',
    img: ML,
    repo: '#',
    live: '#',
    tags: ['Python', 'Numpy', 'Activation functions', 'Loss functions', 'Weight and bias updates']
  },
  {
    title: 'Dot Sentinel',
    subtitle: 'AI Powered Cyber Security Dashboard',
    description: 'AI for detecting anomalous network behavior from PCAP traffic and translating low-level alerts into human-readable, actionable alerts.',
    img: Sentinel,
    repo: 'https://github.com/AceOfSpades-1710/Dot-Sentinel',
    live: 'https://dot-sentinel.vercel.app/',
    tags: ['Python', 'GenAI', 'ReactJS', 'API Integration', 'Postgres', 'CyberSecurity', 'ML']
  },
  {
    title: 'Vanessa',
    subtitle: 'AI Customer Support Bot',
    description: 'AI Customer Support Bot with contextual memory, FAQ support, session tracking on Neon Postgres, and a responsive chat interface.',
    img: Vanessa,
    repo: 'https://github.com/AceOfSpades-1710/Vanessa/tree/main',
    live: '#',
    tags: ['Python', 'GenAI', 'HTML', 'API Integration', 'Postgres']
  },
  {
    title: 'Harvest Hub',
    subtitle: 'Group Project',
    description: 'AI-powered web platform designed to help farmers make informed, data-driven agricultural decisions.',
    img: Harvest,
    repo: 'https://github.com/yagyeshvishnoi/EPICS?tab=readme-ov-file',
    live: 'https://frontend-ankits-projects-4916b64e.vercel.app',
    tags: ['ReactJS', 'Flask', 'OpenCV', 'AWS', 'ML']
  },
  {
    title: 'AES Image Encryption',
    subtitle: 'DSN Project',
    description: 'Securing digital images by applying cryptographic techniques. AES is a symmetric encryption algorithm widely used for securing sensitive data, including images.',
    img: DSN,
    repo: 'https://github.com/ArpitGupta4957/DSN-Project',
    live: 'https://arpitgupta4957.github.io/DSN-Project/',
    tags: ['ReactJS', 'AES', 'Python', 'GitHub', 'API Integration']
  },
  {
    title: 'ASL Translator',
    subtitle: 'Hand Sign Language Detection System (26 Alphabets)',
    description: 'The Python project employs TensorFlow, OpenCV, and Keras to interpret American Sign Language (ASL) hand gestures. It utilizes a database of 7800 images for training a model, a Convolutional Neural Network (CNN), to classify hand gestures into their corresponding alphabet categories.',
    img: ASL,
    repo: 'https://github.com/aviruddh1234/ASL-Translator-',
    live: '#',
    tags: ['Python', 'Keras/Tensorflow', 'OpenCV', 'MediaPipe', 'Numpy', 'CVZone']
  }
]

// clone slides for infinite loop
const slides = [...projects, ...projects, ...projects]
const START_INDEX = projects.length

export default function Projects() {
  const [index, setIndex] = useState(START_INDEX)

  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const autoRef = useRef(null)

  const isDragging = useRef(false)
  const startX = useRef(0)
  const currentX = useRef(0)
  const velocity = useRef(0)

  function vw() {
    return viewportRef.current?.offsetWidth || window.innerWidth
  }

  function animateTo(i, duration = 0.9) {
    gsap.to(trackRef.current, {
      x: -i * vw(),
      duration,
      ease: 'power3.out'
    })
  }

  // initial positioning
  useLayoutEffect(() => {
    gsap.set(trackRef.current, {
      x: -index * vw()
    })
  }, [])

  // infinite correction
  useEffect(() => {
    const total = projects.length

    if (index >= total * 2) {
      const newIndex = index - total
      setIndex(newIndex)
      gsap.set(trackRef.current, { x: -newIndex * vw() })
    }

    if (index < total) {
      const newIndex = index + total
      setIndex(newIndex)
      gsap.set(trackRef.current, { x: -newIndex * vw() })
    }
  }, [index])

  // autoplay
  useEffect(() => {
    autoRef.current = setInterval(() => {
      setIndex(i => i + 1)
      animateTo(index + 1)
    }, 4500)

    return () => clearInterval(autoRef.current)
  }, [index])

  function prev() {
    setIndex(i => i - 1)
    animateTo(index - 1)
  }

  function next() {
    setIndex(i => i + 1)
    animateTo(index + 1)
  }

  // drag handling with momentum
  function onPointerDown(e) {
    isDragging.current = true
    startX.current = e.touches ? e.touches[0].clientX : e.clientX
    currentX.current = startX.current
    velocity.current = 0
    gsap.killTweensOf(trackRef.current)
    clearInterval(autoRef.current)
  }

  function onPointerMove(e) {
    if (!isDragging.current) return

    const x = e.touches ? e.touches[0].clientX : e.clientX
    velocity.current = x - currentX.current
    currentX.current = x

    gsap.set(trackRef.current, {
      x: `+=${velocity.current}`
    })
  }

  function onPointerUp() {
    if (!isDragging.current) return
    isDragging.current = false

    const momentum = velocity.current * 6
    const rawIndex =
      (-gsap.getProperty(trackRef.current, 'x') - momentum) / vw()
    const target = Math.round(rawIndex)

    setIndex(target)
    animateTo(target, 0.6)
  }

  return (
    <section className="projects" id="projects">
      {/* TITLE IS NOW OUTSIDE THE CLIPPED VIEWPORT */}
      <div className="ServiceTitle">
        My <span>Projects</span>!
      </div>

      <div className="projects-viewport" ref={viewportRef}>
        <div
          className="projects-track"
          ref={trackRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          {slides.map((p, i) => (
            <article className="project-slide" key={i}>
              <div
                className="project-visual"
                style={{ backgroundImage: `url(${p.img})` }}
              />
              <div className="project-content">
                <h2>{p.title}</h2>
                <h3>{p.subtitle}</h3>
                <p>{p.description}</p>

                <div className="project-tags">
                  {p.tags.map(t => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>

                <div className="project-cta">
                  <a className="btn" href={p.repo}>View Repo</a>
                  <a className="btnghost" href={p.live}>Live Demo</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={prev}>←</button>
        <button className="carousel-btn next" onClick={next}>→</button>
      </div>
    </section>
  )
}
