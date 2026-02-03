import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-left">
        <div className="contact-pretitle">
            <p>Let's Talk,</p>
        </div>
        <h2 className="contact-title">
          <span>Connect</span>
        </h2>
        <p className="contact-text-1">
          Hey!<br></br>I am a senior at Vellore Institute of Technology,
          who loves developing stuff and finding solutions to problems around him.
        </p>
        <p className="contact-text-2">
          📍 New Delhi, Delhi, India
        </p>
        <p className="contact-text-3">
          Have a project in mind, a question, or just want to say hello?
          Drop a message and I'll get back to you.
        </p>
      </div>

      <div className="contact-right">
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && <p>Message sent successfully ✅</p>}
          {status === "error" && <p>Something went wrong ❌</p>}
        </form>
      </div>
    </section>
  );
}
