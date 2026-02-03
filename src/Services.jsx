import { useRef, useState, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Webdev from "./assets/Fore_Hero/Webdev.png"
import ML from "./assets/Fore_Hero/ML.jpg"
import GD from "./assets/Fore_Hero/GD.jpg"

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    title: "Web Development",
    heroBg: Webdev,
    content: (
      <>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
      </>
    ),
  },
  {
    title: "Machine Learning",
    heroBg: ML,
    content: (
      <>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
      </>
    ),
  },
  {
    title: "Graphic Designing",
    heroBg: GD,
    content: (
      <>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
        <p>
          <span>●</span> Generate structured reports using AI-powered data extraction
          and formatting pipelines.
        </p>
      </>
    ),
  },
];


export default function Services() {
  const cardRefs = useRef([])
  const dropRef = useRef(null)
  const tlRef = useRef(null)

  const [activeIndex, setActiveIndex] = useState(null)

  /* ===============================
     SCROLL FADE-IN / FADE-OUT
  =============================== */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".card",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  /* ===============================
     CLICK ANIMATION (FOCUS CARD)
  =============================== */
  useLayoutEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" },
    })

    tlRef.current = tl

    return () => tl.kill()
  }, [])

  const handleCardClick = index => {
    const tl = tlRef.current
    if (!tl) return

    // Reverse if clicking active card again
    if (activeIndex === index) {
      tl.reverse()
      setActiveIndex(null)
      return
    }

    tl.clear()

    const clickedCard = cardRefs.current[index]
    const otherCards = cardRefs.current.filter((_, i) => i !== index)

    // Fade other cards
    tl.to(otherCards, {
      opacity: 0,
      scale: 0.95,
      duration: 0.4,
    })

    // Move clicked card left
    const targetX =
      cardRefs.current[0].offsetLeft - clickedCard.offsetLeft

    tl.to(
      clickedCard,
      {
        x: targetX,
        duration: 0.5,
      },
      "<"
    )

    // Reveal drop zone
    tl.to(
      dropRef.current,
      {
        opacity: 1,
        scale: 1,
        pointerEvents: "auto",
        x: -40,
        duration: 0.5,
      },
      "-=0.2"
    )

    tl.play()
    setActiveIndex(index)
  }

  return (
    <div className="Services-parent">
        <div className="ServiceTitle">
            My <span>Forte</span>?
        </div>
        <section id="services" className="parent-services">
            
            {SERVICES.map((service, i) => (
                <div
                    key={i}
                    className={`div${i + 1}-services`}
                    ref={el => (cardRefs.current[i] = el)}
                >
                    <Card
                    title={service.title}
                    heroBg={service.heroBg}
                    onView={() => handleCardClick(i)}
                    active={activeIndex === i}
                    />
                </div>
            ))}
            <div className="content-panel-wrapper" ref={dropRef}>
                {activeIndex !== null && (
                    <ContentPanel content={SERVICES[activeIndex].content} />
                )}
            </div>
        </section>
    </div>
  )
}

/* ===============================
   CARD
=============================== */
function Card({ title, heroBg, onView, active }) {
  return (
    <article className="card">
      <button
        className="card__hero"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
        onClick={onView}
      >
        <p className="card__job-title">
          {active ? "Back" : title}
        </p>
      </button>
    </article>
  );
}


function ContentPanel({ content }) {
  return (
    <div className="content-panel">
      {content}
    </div>
  );
}

