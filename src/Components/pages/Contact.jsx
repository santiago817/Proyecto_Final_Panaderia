import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log("Email enviado:", result.text);
      setSent(true);
      e.target.reset();

      setTimeout(() => {
        setSent(false);
      }, 2000);
    } catch (err) {
      console.error("Error al enviar:", err.text || err);
      setError("Hubo un error al enviar el mensaje. Intenta nuevamente.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <img
        src="/formulario.jpg"
        alt="Formulario"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-20 w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-xl p-8 border border-[#F0D9B5]">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#D18B47]">
          Contáctanos
        </h2>

        {sent ? (
          <div className="text-center text-green-600 font-semibold text-xl">
            ✔ Tu mensaje ha sido enviado con éxito
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold text-[#A0662F]">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-3 mt-1 border border-[#E5C6A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E89A4C]"
                placeholder="Ingresa tu nombre"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#A0662F]">
                Correo
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 mt-1 border border-[#E5C6A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E89A4C]"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#A0662F]">
                Mensaje
              </label>
              <textarea
                name="message"
                required
                rows="4"
                className="w-full p-3 mt-1 border border-[#E5C6A5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E89A4C]"
                placeholder="Escribe tu mensaje..."
              ></textarea>
            </div>

            {error && <div className="text-red-600 font-semibold">{error}</div>}

            <button
              type="submit"
              className="w-full bg-[#E89A4C] hover:bg-[#D67E2D] text-white font-bold py-3 rounded-lg transition"
            >
              Enviar Mensaje
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
