import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problema } from './components/Problema'
import { Features } from './components/Features'
import { Telas } from './components/Telas'
import { Impacto } from './components/Impacto'
import { Tecnologias } from './components/Tecnologias'
import { Executar } from './components/Executar'
import { Footer } from './components/Footer'

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Features />
        <Telas />
        <Impacto />
        <Tecnologias />
        <Executar />
      </main>
      <Footer />
    </>
  )
}
