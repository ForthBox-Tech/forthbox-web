<template>
  <div class="home">
    <Banners></Banners>
    <WhyForthbox1></WhyForthbox1>
    <WhyForthbox2></WhyForthbox2>
    <WhyForthbox3></WhyForthbox3>
    <WhyForthbox4></WhyForthbox4>
    <MintHam id="nft-cast"></MintHam>
    <GameCenter id="gamefi-center"></GameCenter>
    <SocialFi id="forthbox-society"></SocialFi>
    <EcologicalSystem id="forthbox-ecosystem"></EcologicalSystem>
    <Partnets></Partnets>
    <Footer></Footer>
  </div>
</template>

<script>
import Banners from './modules/Banners.vue'
import WhyForthbox1 from './modules/WhyForthbox1.vue'
import WhyForthbox2 from './modules/WhyForthbox2.vue'
import WhyForthbox3 from './modules/WhyForthbox3.vue'
import WhyForthbox4 from './modules/WhyForthbox4.vue'
import MintHam from './modules/MintHam.vue'
import GameCenter from './modules/GameCenter.vue'
import SocialFi from './modules/SocialFi.vue'
import EcologicalSystem from './modules/EcologicalSystem.vue'
import Partnets from './modules/Partnets.vue'
import Footer from '@/modules/Footer.vue'

function scrollTo(elemId) {
  let elem = null
  if (['#nft-cast', '#gamefi-center', '#forthbox-society'].indexOf(elemId) > -1) {
    elem = document.querySelector(elemId)
  } else if (['#roadmap', '#about', '#tokenomics'].indexOf(elemId) > -1) {
    elem = document.querySelector('#forthbox-ecosystem')
  }
  if (elem) {
    elem.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

function onScrollChange() {
  let header = document.querySelector('.header')
  let main = document.querySelector('.main')
  let whyForthbox2 = document.querySelector('.why-forthbox-2')
  let whyForthbox3 = document.querySelector('.why-forthbox-3')
  let whyForthbox4 = document.querySelector('.why-forthbox-4')
  let petCast = document.querySelector('.pet-cast')
  let forthboxSociety = document.querySelector('.forthbox-society')

  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        let elem = ''
        if (entry.target.classList.contains('header')) {
          elem = header
        } else if (entry.target.classList.contains('main')) {
          elem = main
        } else if (entry.target.classList.contains('why-forthbox-2')) {
          elem = whyForthbox2.querySelector('.main')
        } else if (entry.target.classList.contains('why-forthbox-3')) {
          elem = whyForthbox3.querySelector('.main')
        } else if (entry.target.classList.contains('why-forthbox-4')) {
          elem = whyForthbox4.querySelector('.main')
        } else if (entry.target.classList.contains('pet-cast')) {
          elem = petCast
        } else if (entry.target.classList.contains('forthbox-society')) {
          elem = forthboxSociety
        }
        elem && elem.classList.add('main-animation')
      }
    })
  })

  observer.observe(header)
  observer.observe(main)
  observer.observe(whyForthbox2)
  observer.observe(whyForthbox3)
  observer.observe(whyForthbox4)
  observer.observe(petCast)
  observer.observe(forthboxSociety)
}

