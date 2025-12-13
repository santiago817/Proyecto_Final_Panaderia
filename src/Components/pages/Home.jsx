import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen relative">
      <img
        src="/fondo_panaderia.jpg"
        alt="Fondo panadería"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <h1
        className="pt-6 w-full text-center text-4xl lg:text-6xl font-bold text-white z-20"
        style={{ WebkitTextStroke: "3px black" }}
      >
        Categorías
      </h1>

      <div className="w-full flex items-center justify-center p-6 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          <Link to="/home/panes">
            <div
              className="relative rounded-xl overflow-hidden
              h-[200px] sm:h-[250px] md:h-80 lg:h-[750px]
              shadow-[0_40px_100px_rgba(0,0,0,1)]
              transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src="/panes.jpg"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/95 to-transparent p-3 text-center">
                <span
                  className="text-white text-3xl md:text-4xl font-bold drop-shadow-2xl"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  Panes
                </span>
              </div>
            </div>
          </Link>

          <Link to="/home/facturas">
            <div
              className="relative rounded-xl overflow-hidden
              h-[200px] sm:h-[250px] md:h-80 lg:h-[750px]
              shadow-[0_40px_100px_rgba(0,0,0,1)]
              transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src="/Facturas.jpg"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/95 to-transparent p-3 text-center">
                <span
                  className="text-white text-3xl md:text-4xl font-bold drop-shadow-2xl"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  Facturas
                </span>
              </div>
            </div>
          </Link>

          <Link to="/home/pasteleria">
            <div
              className="relative rounded-xl overflow-hidden
              h-[200px] sm:h-[250px] md:h-80 lg:h-[750px]
              shadow-[0_40px_100px_rgba(0,0,0,1)]
              transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src="/pasteleria.jpg"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/95 to-transparent p-3 text-center">
                <span
                  className="text-white text-3xl md:text-4xl font-bold drop-shadow-2xl"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  Pastelería
                </span>
              </div>
            </div>
          </Link>

          <Link to="/home/sandwiches-miga">
            <div
              className="relative rounded-xl overflow-hidden
              h-[200px] sm:h-[250px] md:h-80 lg:h-[750px]
              shadow-[0_40px_100px_rgba(0,0,0,1)]
              transition-transform duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src="/sandwichesmiga.jpg"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/95 to-transparent p-3 text-center">
                <span
                  className="text-white text-3xl md:text-4xl font-bold drop-shadow-2xl"
                  style={{ WebkitTextStroke: "1px black" }}
                >
                  Sándwiches de Miga
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
