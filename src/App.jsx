import Nav from './Nav'
import Footer from './Footer'
import Home from './pages/Home'
import Projects from './Projects'
import Links from './pages/Links'
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
