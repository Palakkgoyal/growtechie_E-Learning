/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import handleScrollToElement from '../../commonFn';
import siteMapData from '../../navData';

const Header = () => {
  const navigate = useNavigate();
  const navRef = useRef();
  useScroll(navRef);

  function handleNavigation(e, elementId) {
    e.preventDefault();
    handleScrollToElement(elementId, navigate);
    toggleMobileNav();
  }

  function toggleMobileNav() {
    const navMobileBtn = document.getElementById('nav-mobile-btn');
    const nav = document.getElementById('nav');
    if (navMobileBtn && nav) {
      if (navMobileBtn.classList.contains('close')) {
        nav.classList.add('hidden');
        navMobileBtn.classList.remove('close');
      } else {
        nav.classList.remove('hidden');
        navMobileBtn.classList.add('close');
      }
    }
  }

  useEffect(() => {
    const navMobileBtn = document.getElementById('nav-mobile-btn');
    if (navMobileBtn) {
      navMobileBtn.addEventListener('click', toggleMobileNav);
    }

    return () => {
      if (navMobileBtn) {
        navMobileBtn.removeEventListener('click', toggleMobileNav);
      }
    };
  }, []);

  return (
    <header ref={navRef} className="sticky-nav z-50">
      <div
        id="sticky-header"
        className="container flex items-center justify-between max-w-6xl px-8 mx-auto sm:justify-between xl:px-0"
      >
        <a
          href="/"
          className="relative flex items-center inline-block h-5 h-full font-black leading-none"
        >
          <img
            src="/logo.png"
            alt="GrowTechie logo"
            className="w-auto h-20 fill-current invert"
          />
          <span className="ml-3 text-2xl text-slate-200">GrowTechie</span>
        </a>

        <nav
          id="nav"
          className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-lg text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative"
        >
          {siteMapData.map((item, idx) => (
            <a
              key={idx}
              onClick={(e) => handleNavigation(e, item.to)}
              className="mr-0 cursor-pointer text-white font-semibold duration-200 md:mr-3 lg:mr-8 transition-color hover:text-[var(--active-link)]"
            >
              {item.text}
            </a>
          ))}
        </nav>

        <div
          id="nav-mobile-btn"
          className="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10"
        >
          <span className="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
          <span className="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;


function useScroll(navRef) {
  const lastScrollTop = useRef(0);
  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    navRef.current.style.top = scrollTop > lastScrollTop.current ? "-90px" : "0px";
    lastScrollTop.current = scrollTop
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
}