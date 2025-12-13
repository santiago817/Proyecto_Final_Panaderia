import React, { useState, useEffect } from "react";
import { db, auth } from "../../services/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function SandwichesMiga() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [cantidades, setCantidades] = useState({});
  const [productoAEliminar, setProductoAEliminar] = useState("");

  const [deleteMessage, setDeleteMessage] = useState({ text: "", type: "" });
  const [closingDeleteModal, setClosingDeleteModal] = useState(false);

  // Verificar admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          setAdmin(snap.exists() && snap.data().role === "admin");
        } catch {
          setAdmin(false);
        }
      } else setAdmin(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const categoriaRef = doc(db, "categorias", "sandwich_de_miga");
        const productosSnapshot = await getDocs(
          collection(categoriaRef, "productos")
        );
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (productosData.length === 0)
          setError("No hay productos disponibles.");
        else {
          setProductos(productosData);
          setError("");
          const inicial = {};
          productosData.forEach((p) => (inicial[p.id] = 0));
          setCantidades(inicial);
        }
      } catch {
        setError("Error al obtener productos. Revisa Firestore.");
      }
    };
    fetchProductos();
  }, []);

  const handleAgregarProducto = async () => {
    if (!nombre || !precio || !imagenURL)
      return alert("Completa todos los campos");
    try {
      const categoriaRef = doc(db, "categorias", "sandwich_de_miga");
      const productosRef = collection(categoriaRef, "productos");
      await addDoc(productosRef, {
        nombre,
        precio: parseFloat(precio),
        imagen: imagenURL,
      });
      setNombre("");
      setPrecio("");
      setImagenURL("");
      setModalOpen(false);
      const productosSnapshot = await getDocs(productosRef);
      const productosData = productosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
      const inicial = {};
      productosData.forEach((p) => {
        inicial[p.id] = cantidades[p.id] || 0;
      });
      setCantidades(inicial);
    } catch {
      alert("Error al agregar producto. Solo admins pueden hacerlo.");
    }
  };

  const aumentar = (id) =>
    setCantidades((prev) => ({ ...prev, [id]: prev[id] + 1 }));

  const disminuir = (id) =>
    setCantidades((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));

  const handleBorrarProducto = async () => {
    if (!productoAEliminar)
      return setDeleteMessage({
        text: "Seleccioná un producto primero",
        type: "error",
      });

    try {
      const productoRef = doc(
        db,
        "categorias",
        "sandwich_de_miga",
        "productos",
        productoAEliminar
      );

      await deleteDoc(productoRef);

      setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar));
      setProductoAEliminar("");

      setDeleteMessage({
        text: "Producto eliminado correctamente",
        type: "success",
      });

      setTimeout(() => {
        setClosingDeleteModal(true);

        setTimeout(() => {
          setDeleteModalOpen(false);
          setClosingDeleteModal(false);
          setDeleteMessage({ text: "", type: "" });
        }, 300);
      }, 1500);
    } catch (err) {
      console.error(err);
      setDeleteMessage({
        text: "Error al eliminar el producto",
        type: "error",
      });
    }
  };

  return (
    <div
      className="w-full min-h-screen p-6 bg-linear-to-b from-yellow-50 via-yellow-100 to-yellow-200"
      style={{
        backgroundImage: 'url("/mesa.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {admin && (
        <div className="flex gap-4 mb-6">
          <button
            className="px-6 py-3 bg-orange-300 text-orange-900 font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={() => setModalOpen(true)}
          >
            Agregar producto
          </button>
          <button
            className="px-6 py-3 bg-red-400 text-white font-bold rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={() => {
              setDeleteMessage({ text: "", type: "" });
              setDeleteModalOpen(true);
            }}
          >
            Borrar producto
          </button>
        </div>
      )}

      {modalOpen && admin && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-96 md:w-[500px] p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
              Agregar producto
            </h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              />
              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              />
              <input
                type="text"
                placeholder="URL Imagen"
                value={imagenURL}
                onChange={(e) => setImagenURL(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition"
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-5 py-2 bg-linear-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                onClick={handleAgregarProducto}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteModalOpen && admin && (
        <div
          className={`fixed inset-0 flex justify-center items-center bg-black/30 z-50 transition-opacity duration-300 ${
            closingDeleteModal ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className={`bg-white rounded-3xl shadow-2xl w-96 md:w-[500px] p-8 transition-all duration-300 ${
              closingDeleteModal
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
              Borrar producto
            </h2>

            <select
              value={productoAEliminar}
              onChange={(e) => {
                setProductoAEliminar(e.target.value);
                setDeleteMessage({ text: "", type: "" });
              }}
              className="w-full p-3 border border-gray-300 rounded-xl mb-4"
            >
              <option value="">Selecciona un producto</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>

            {deleteMessage.text && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 animate-fade-in 
                  ${
                    deleteMessage.type === "success"
                      ? "bg-green-100 border border-green-300 text-green-700"
                      : "bg-red-100 border border-red-300 text-red-700"
                  }`}
              >
                <span className="text-xl">
                  {deleteMessage.type === "success" ? "✔️" : "⚠️"}
                </span>
                <p className="font-medium">{deleteMessage.text}</p>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setDeleteMessage({ text: "", type: "" });
                }}
              >
                Cancelar
              </button>
              <button
                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all"
                onClick={handleBorrarProducto}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-[#FFF4E0] rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border border-gray-200 flex flex-col justify-between"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-t-2xl">
              <img
                src={producto.imagen || "https://via.placeholder.com/150"}
                alt={producto.nombre || producto.id}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                <h3 className="text-white font-semibold text-lg truncate w-full text-center">
                  {producto.nombre}
                </h3>
              </div>
            </div>

            <div className="p-3 flex flex-col gap-2">
              <div className="flex justify-end items-center gap-2 mb-2">
                <img
                  src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png"
                  alt="carrito"
                  className="w-6 h-6"
                />
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => disminuir(producto.id)}
                    className="px-3 py-1 bg-white hover:bg-gray-100 transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white">
                    {cantidades[producto.id]}
                  </span>
                  <button
                    onClick={() => aumentar(producto.id)}
                    className="px-3 py-1 bg-white hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-900 font-bold text-xl text-left">
                  Precio: ${producto.precio ?? "0"}
                </p>
                <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                  Reservar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
