import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import Webdev from "/src/assets/Fore_Hero/Webdev.png"
import ML from '/src/assets/Fore_Hero/ML.jpg'
import GD from '/src/assets/Fore_Hero/GD.jpg'

const projects = [
  {
    title: 'Portfolio Website',
    subtitle: 'React + Vite Portfolio',
    description: 'My personal portfolio showcasing projects, blog links and contact.',
    img: Webdev,
    repo: '#',
    live: '#',
    tags: ['React', 'Vite', 'CSS']
  },
  {
    title: 'AI Chatbot',
    subtitle: 'Customer care assistant',
    description: 'LLM-powered assistant with a Node/Express backend and context memory.',
    img: ML,
    repo: '#',
    live: '#',
    tags: ['Python', 'Flask', 'AI']
  },
  {
    title: 'Design Gallery',
    subtitle: 'Graphic design showcase',
    description: 'A gallery site for design work, implemented with accessibility in mind.',
    img: GD,
    repo: '#',
    live: '#',
    tags: ['Figma', 'Illustrator']
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
                  <a className="btn ghost" href={p.live}>Live Demo</a>
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
