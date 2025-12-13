import React, { useState, useEffect } from "react";

const Carritito = ({ isOpen, onClose, productos = [], setProductos }) => {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carritoGuardado.length > 0) {
      setProductos(carritoGuardado);
    }
  }, [setProductos]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productos));
  }, [productos]);

  const total = (productos || []).reduce(
    (acc, prod) => acc + prod.precio * (prod.cantidad || 0),
    0
  );

  const incrementar = (id) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === id ? { ...prod, cantidad: prod.cantidad + 1 } : prod
      )
    );
  };

  const decrementar = (id) => {
    setProductos((prev) =>
      prev
        .map((prod) =>
          prod.id === id ? { ...prod, cantidad: prod.cantidad - 1 } : prod
        )
        .filter((prod) => prod.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((prod) => prod.id !== id));
  };

  const handleReservar = () => {
    if (productos.length === 0) return;
    setMensaje(
      `Productos reservados: ${productos
        .map((p) => `${p.nombre} x${p.cantidad}`)
        .join(", ")}`
    );
    setProductos([]);
    localStorage.removeItem("carrito");
    setTimeout(() => setMensaje(""), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-[#FFF2E0] w-full max-w-lg rounded-2xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-[#B86832] hover:text-[#8A4E26]"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-[#6A3A1A] mb-4">Mi Carrito</h2>

        {mensaje && (
          <div className="bg-green-400 text-white p-2 rounded-lg mb-4 text-center animate-fade-in">
            {mensaje}
          </div>
        )}

        {productos.length === 0 ? (
          <p className="text-[#6A3A1A] text-center py-10">
            No hay productos en el carrito.
          </p>
        ) : (
          <div className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
            {productos.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between bg-[#F4C27F] rounded-xl p-3 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={prod.imagen}
                    alt={prod.nombre}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-[#6A3A1A]">
                      {prod.nombre}
                    </p>
                    <p className="text-[#6A3A1A]/80">${prod.precio}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => decrementar(prod.id)}
                    className="px-2 py-1 bg-[#B86832] text-white rounded-lg hover:bg-[#8A4E26]"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{prod.cantidad}</span>
                  <button
                    onClick={() => incrementar(prod.id)}
                    className="px-2 py-1 bg-[#B86832] text-white rounded-lg hover:bg-[#8A4E26]"
                  >
                    +
                  </button>
                  <button
                    onClick={() => eliminarProducto(prod.id)}
                    className="ml-2 text-red-600 hover:text-red-800 font-bold"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col space-y-3">
          <p className="text-xl font-bold text-[#6A3A1A]">Total: ${total}</p>
          <button
            onClick={handleReservar}
            className="w-full bg-[#E4A373] text-white py-3 rounded-xl hover:bg-[#C98752] transition font-semibold"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carritito;
