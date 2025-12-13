import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Complete todos los campos");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error("No existe el documento del usuario en Firestore.");
      }

      const data = snap.data();

      localStorage.setItem("userRole", data.role);

      if (data.role === "admin") {
        console.log("El usuario inició sesión como ADMIN");
      } else {
        console.log("El usuario inició sesión como CLIENTE");
      }

      navigate("/home", { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") setError("Usuario no encontrado");
      else if (err.code === "auth/wrong-password")
        setError("Contraseña incorrecta");
      else setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleNuevoUsuario = () => {
    navigate("/NewUser");
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 bg-[#decdbb] bg-opacity-90 p-10 md:p-12 2xl:p-16 rounded-2xl shadow-2xl w-80 md:w-96 2xl:w-[500px]">
        <h2 className="text-3xl md:text-4xl 2xl:text-5xl font-bold mb-8 text-center text-gray-800">
          Iniciar Sesión
        </h2>

        {error && (
          <p className="text-red-600 text-center text-sm md:text-base mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm md:text-lg 2xl:text-xl font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              className="mt-2 p-3 md:p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400 text-lg md:text-xl 2xl:text-2xl"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="text-sm md:text-lg 2xl:text-xl font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="mt-2 w-full p-3 md:p-4 pr-12 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-400 text-lg md:text-xl 2xl:text-2xl"
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
            disabled={loading}
            className="mt-6 w-full text-lg md:text-xl 2xl:text-2xl bg-gray-800 text-white p-3 md:p-4 rounded-xl hover:bg-gray-900 transition transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Entrar"}
          </button>

          <p
            onClick={handleNuevoUsuario}
            className="text-sm md:text-lg 2xl:text-xl w-full flex justify-center cursor-pointer text-blue-900 hover:underline mt-2"
          >
            ¿No tienes cuenta? Crear nueva
          </p>
        </form>
      </div>
    </div>
  );
}
