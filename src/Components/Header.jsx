import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../services/FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Carritito from "./Carritito";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpenMobile, setUserMenuOpenMobile] = useState(false);
  const [userMenuOpenDesktop, setUserMenuOpenDesktop] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const mobileRef = useRef(null);
  const desktopRef = useRef(null);

  // Detectar usuario y rol
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setRole(snap.data().role);
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setUserMenuOpenMobile(false);
      }
      if (desktopRef.current && !desktopRef.current.contains(e.target)) {
        setUserMenuOpenDesktop(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpenMobile(false);
        setUserMenuOpenDesktop(false);
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUserMenuOpenMobile(false);
    setUserMenuOpenDesktop(false);
    navigate("/login");
  };

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleScrollToBottom = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const UserMenu = () => (
    <div className="flex flex-col space-y-3">
      <div className="text-white mb-1">
        <p className="font-semibold text-lg">
          Hola, {user.displayName || user.email.split("@")[0]}
          {role === "admin" && (
            <span className="text-green-500 font-bold ml-2">Admin</span>
          )}
        </p>
        <p className="text-sm text-white/80">{user.email}</p>
      </div>

      <div className="border-b border-white/20"></div>

      <button
        onClick={() => {
          navigate("/profile");
          setUserMenuOpenMobile(false);
          setUserMenuOpenDesktop(false);
        }}
        className="w-full bg-[#E4A373] text-white py-2 rounded-xl hover:bg-[#C98752] transition"
      >
        Mi Perfil
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-[#B86832] text-white py-2 rounded-xl hover:bg-[#8A4E26] transition"
      >
        Cerrar sesión
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-[#FFF2E0] shadow-md relative z-50">
        <div className="flex items-center justify-between px-6 py-3 lg:py-4 relative w-full">
          <div className="flex items-center justify-between w-full lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#6A3A1A]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <img
              src="/logoMafi.png"
              alt="Logo"
              className="h-14 w-24 drop-shadow-md shrink-0 ml-8"
            />

            <div
              className="flex items-center space-x-2 relative"
              ref={mobileRef}
            >
              <button
                onClick={() => setUserMenuOpenMobile(!userMenuOpenMobile)}
                className="active:scale-95 transition"
              >
                <img
                  src="/usuario.png"
                  alt="Usuario"
                  className="h-9 w-9 rounded-full shadow-md cursor-pointer"
                />
              </button>

              {userMenuOpenMobile && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-black/40 backdrop-blur-md rounded-2xl shadow-xl border border-[#E4A373]/30 p-4 z-50 animate-fadeIn">
                  {!user ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setUserMenuOpenMobile(false);
                      }}
                      className="w-full text-center bg-[#E4A373] text-white py-2 rounded-xl shadow-md hover:bg-[#C98752] transition"
                    >
                      Iniciar sesión
                    </button>
                  ) : (
                    <UserMenu />
                  )}
                </div>
              )}

              <button onClick={toggleCart}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt="Carrito"
                  className="h-7 w-7"
                />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between w-full relative">
            <img
              src="/logoMafi.png"
              alt="Logo"
              className="h-28 w-32 drop-shadow-md"
            />

            <nav className="absolute left-0 right-0 mx-auto max-w-3xl flex justify-center space-x-12 text-[#6A3A1A] items-center">
              <Link
                to="/home"
                className="hover:text-[#E89A4C] transition text-3xl"
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="hover:text-[#E89A4C] transition text-3xl"
              >
                Contact
              </Link>
              <button
                onClick={handleScrollToBottom}
                className="hover:text-[#E89A4C] transition text-3xl"
              >
                Redes
              </button>
            </nav>

            <div
              className="flex items-center space-x-3 relative"
              ref={desktopRef}
            >
              <button
                onClick={() => setUserMenuOpenDesktop(!userMenuOpenDesktop)}
                className="active:scale-95 transition"
              >
                <img
                  src="/usuario.png"
                  alt="Usuario"
                  className="h-12 w-12 rounded-full shadow-md cursor-pointer"
                />
              </button>

              {userMenuOpenDesktop && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-black/50 backdrop-blur-md rounded-2xl shadow-xl border border-[#E4A373]/30 p-4 z-50 animate-fadeIn">
                  {!user ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setUserMenuOpenDesktop(false);
                      }}
                      className="w-full bg-[#E4A373] text-white py-2 rounded-xl hover:bg-[#C98752]"
                    >
                      Iniciar sesión
                    </button>
                  ) : (
                    <UserMenu />
                  )}
                </div>
              )}

              <button onClick={toggleCart}>
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt="Carrito"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-[#F4C27F] overflow-hidden transition-all duration-500 z-50 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/home"
              onClick={handleLinkClick}
              className="w-11/12 text-center py-3 rounded-xl font-semibold text-white bg-[#B86832] shadow-md hover:bg-white hover:text-[#B86832] transition transform hover:scale-105"
            >
              Home
            </Link>

            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="w-11/12 text-center py-3 rounded-xl font-semibold text-white bg-[#B86832] shadow-md hover:bg-white hover:text-[#B86832] transition transform hover:scale-105"
            >
              Contact
            </Link>

            <button
              onClick={handleScrollToBottom}
              className="w-11/12 text-center py-3 rounded-xl font-semibold text-white bg-[#B86832] shadow-md hover:bg-white hover:text-[#B86832] transition transform hover:scale-105"
            >
              Redes
            </button>
          </div>
        </div>
      </header>

      <Carritito isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
