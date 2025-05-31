
import Faq from '@/components/ui/Faq'
import Features from '@/components/ui/Features'
import Footer from '@/components/ui/Footer'
import Hero from '@/components/ui/Hero'
import HowItWorks from '@/components/ui/HowItWorks'
import Navbar from '@/components/ui/Navbar'
import UseCases from '@/components/ui/UseCases'
import { ModeToggle } from '@/components/ui/mode-toggle'
import React from 'react'

const Home = () => {
  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>

    <Hero />
    <Features />
    <HowItWorks />
    <UseCases />
    <Faq />



    </div>
  )
  
}

export default Home
