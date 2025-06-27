"use client"
import React from 'react'
import HeroSection from '@/components/about/HeroSection'
import Milestone from '@/components/about/Milestone'
import WhyChooseUs from '@/components/about/WhyChooseUs'




const About = () => {
  return (
    <div className='mt-5 sm:mt-10'>
        <HeroSection />
        <WhyChooseUs />
        <Milestone />
    </div>
  )
}

export default About