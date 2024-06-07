import React from "react";
const Header = () => {
    return (
        <div className="bg-teal-700 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-2xl font-medium">
              <a href="#hero">♱ Ruteng's Miracle</a>
            </h1>
            <div>
              <button
                id="mobile-open-button"
                className="text-3xl sm:hidden focus:outline-none"
              >
                &#9776;
              </button>
              <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
                <a href="#rockets" className="hover:opacity-90">Today's Mass</a>
                <a href="#testimonials" className="hover:opacity-90">Readings</a>
                <a href="#contact" className="hover:opacity-90">Saints</a>
              </nav>
            </div>
          </div>
        </div>
        );
}

export default React.memo(Header);
