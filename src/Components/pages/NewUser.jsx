import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/FirebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Nuevo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !email || !password) {
      setMessageType("error");
      setMessage("Complete todos los campos");
      return;
    }

    try {
      
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        uid: user.uid,
        role: "client",
      });

      
      await signOut(auth);

      setMessageType("success");
      setMessage("¡Tu cuenta se ha creado exitosamente!");

      console.log("Cuenta creada con éxito");

      
      setTimeout(() => {
        setMessage(null);
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage(err.message || "Hubo un error al crear tu cuenta");
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/nuevos.png')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 bg-[#decdbb] bg-opacity-90 p-8 md:p-12 2xl:p-16 rounded-2xl shadow-2xl w-80 md:w-96 2xl:w-[500px]">
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold mb-6 text-center text-gray-800">
          Crear Cuenta
        </h2>

        {message && (
          <div
            className={`flex items-center gap-2 mb-4 p-3 rounded-lg border-l-4
              ${
                messageType === "success"
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "bg-red-50 border-red-500 text-red-700"
              }`}
          >
            <span className="text-sm md:text-base font-medium">{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm md:text-lg 2xl:text-xl font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              placeholder="Ej: Maria Lopez"
              className="mt-2 p-3 md:p-4 rounded-xl text-lg md:text-xl 2xl:text-2xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm md:text-lg 2xl:text-xl font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              placeholder="email@gmail.com"
              className="mt-2 p-3 md:p-4 rounded-xl text-lg md:text-xl 2xl:text-2xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm md:text-lg 2xl:text-xl font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full p-3 md:p-4 pr-12 rounded-xl text-lg md:text-xl 2xl:text-2xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                Mostrar
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full text-lg md:text-xl 2xl:text-2xl bg-gray-800 text-white p-3 md:p-4 rounded-xl hover:bg-gray-900 transition"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
