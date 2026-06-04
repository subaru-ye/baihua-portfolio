import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import SiteShaderBackdrop from './components/SiteShaderBackdrop'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-foreground">
      <SiteShaderBackdrop />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
