import AnchorLink from "react-anchor-link-smooth-scroll";
import { useState } from "react";
const Header = () => {
  const [hamburger, setHamburger] = useState(false);
  return (
    <div className="bg-teal-700 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-medium">
          <a href="#hero">♱ Ruteng's Miracle</a>
        </h1>
        <div>
          <button
            onClick={() => setHamburger(!hamburger)}
            id="humburger-button"
            className="text-3xl md:hidden cursor-pointer"
          >
            &#9776;
          </button>
          <nav className="hidden md:block space-x-8 text-xl" aria-label="main">
            <AnchorLink href="#mass">
              <button className="hover:opacity-90">Today's Mass</button>
            </AnchorLink>
            <AnchorLink href="#readings">
              <button className="hover:opacity-90">Readings</button>
            </AnchorLink>
            <AnchorLink href="#saints">
              <button className="hover:opacity-90">Saints</button>
            </AnchorLink>
          </nav>
        </div>
      </div>
      <div
        id="mobile-menu"
        className={`absolute top-0 dark:bg-black dark:text-white bg-black text-white w-full text-5xl flex-col justify-content-center origin-top animate-open-menu ${!hamburger ? "hidden" : "flex"}`}
      >
        <button
          onClick={() => setHamburger(!hamburger)}
          className="text-8xl self-end px-6"
        >
          &times;
        </button>
        <nav
          className="flex flex-col min-h-screen items-center py-8"
          aria-label="mobile"
        >
          <a
            href="#home"
            className="w-full text-center py-6 hover:opacity-90"
            onClick={() => setHamburger(!hamburger)}
          >
            Home
          </a>
          <a
            href="#mass"
            className="w-full text-center py-6 hover:opacity-90"
            onClick={() => setHamburger(!hamburger)}
          >
            Mass
          </a>
          <a
            href="#readings"
            className="w-full text-center py-6 hover:opacity-90"
            onClick={() => setHamburger(!hamburger)}
          >
            Readings
          </a>
          <a
            href="#saints"
            className="w-full text-center py-6 hover:opacity-90"
            onClick={() => setHamburger(!hamburger)}
          >
            Saints
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Header;
