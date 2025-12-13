import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleIngresar = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen w-screen relative">
      <img
        src="/portada.jpg"
        alt="Portada"
        className="h-full w-full object-cover brightness-90"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 md:px-8">
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                      font-handwriting font-extrabold
                      bg-clip-text text-transparent
                      bg-linear-to-r from-yellow-300 via-amber-400 to-amber-500
                      drop-shadow-[3px_3px_2px_rgba(0,0,0,0.7)]
                      uppercase text-center mb-8
                      animate-fallJelly`}
          style={{
            fontFamily: "'Comic Sans MS', 'Brush Script MT', cursive",
          }}
        >
          <span className="block">Bienvenidos</span>
          <span className="block">a</span>
          <span className="block">MAFI</span>
        </h1>

        <button
          onClick={handleIngresar}
          className="bg-linear-to-r from-amber-900 via-amber-700 to-amber-600
                     text-amber-100 font-extrabold
                     py-4 px-10 sm:py-5 sm:px-12 md:py-6 md:px-16
                     text-lg sm:text-xl md:text-2xl 2xl:text-3xl
                     rounded-3xl
                     shadow-[0_12px_25px_rgba(133,77,14,0.8),0_6px_8px_rgba(72,41,5,0.7)]
                     hover:shadow-[0_18px_30px_rgba(153,87,17,1),0_10px_12px_rgba(102,56,12,0.9)]
                     hover:scale-105
                     hover:brightness-110
                     2xl:mt-12
                     transform transition-all duration-300"
        >
          Ingresar
        </button>

        <style>{`
          @keyframes fallJelly {
            0% {
              transform: translateY(-200px) scaleX(1) scaleY(1);
              opacity: 0;
            }
            40% {
              transform: translateY(0px) scaleX(1.2) scaleY(0.8);
              opacity: 1;
            }
            60% {
              transform: translateY(-15px) scaleX(0.9) scaleY(1.1);
            }
            80% {
              transform: translateY(0px) scaleX(1.05) scaleY(0.95);
            }
            100% {
              transform: translateY(0px) scaleX(1) scaleY(1);
            }
          }

          .animate-fallJelly {
            animation: fallJelly 1.2s ease forwards;
          }
        `}</style>
      </div>
    </div>
  );
}
