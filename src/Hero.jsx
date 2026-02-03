import Heroimg from "/src/assets/Hero3.png"
function Hero() {
  return (
    <section id="top" className="hero">
      {/* Background text layer */}
      <div className="hero-text">
        <h1 className="hero-hi">Hi, I'm Siddhant</h1>
        <h2 className="hero-title">Software<br></br>Engineer</h2>
      </div>

      <div className="hero-image">
        <img src={Heroimg} alt="Hero" />
      </div>
    </section>
  );
}

export default Hero;
