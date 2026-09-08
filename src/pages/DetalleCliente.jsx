import '../css/detallecliente.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import clientesService from "../services/clientesService";
import useAutorizaciones from "../hooks/useAutorizaciones";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sector } = useAutorizaciones();

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(false);
 const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    clientesService
      .obtenerClientePorId(id)
      .then((data) => setCliente(data))
      .catch(() => setError(true));
  }, [id]);

  const solicitarConfirmacion = () => {
  if (!puedeEliminar) {
    setMensaje("No tiene permisos para eliminar clientes");
    return;
  }
  setMostrarModal(true);
};

// Agregar efecto para capturar la tecla Escape cuando el modal está abierto
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && mostrarModal) {
      setMostrarModal(false);
    }
  };
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [mostrarModal]);

  if (error) {
    return <h2>Error al cargar el detalle del cliente.</h2>;
  }

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {sector}</p>

      {mensaje && <p className="mensaje-eliminado">{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

    </div>
  );
};

export default DetalleCliente;