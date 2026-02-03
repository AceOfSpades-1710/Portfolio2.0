import Nav from './Nav'
import Footer from './Footer'
import Home from './pages/home'
import Projects from './Projects'
import Links from './pages/links'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './ScrollToHash'

function App() {
  return (
    <>
      <Nav />
      <ScrollToHash />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/links" element={<Links />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
