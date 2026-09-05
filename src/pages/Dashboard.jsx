import '../css/dashboard.css'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'
import Login from './Login'

const Dashboard = () => {
  const { admin } = useAutorizaciones()
  const usuariosPorSector = AutorizacionesService.contarUsuariosPorSector()

  return (
    <div className="dashboard">

      <h1>Panel de Control de Clientes</h1>

      {!admin ? (
        <div className="dashboard-login">
          <h3>Bienvenido al sistema</h3>
          <p>Ingrese sus credenciales para acceder.</p>
          <Login />
        </div>
      ) : (
        <>
          <div className="user-card">
            <h3>Usuario conectado</h3>

            <p><strong>Administrador:</strong> {admin.nombre}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Sector:</strong> {admin.sector}</p>
          </div>
          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Clientes</h3>
              <p>10</p>
            </div>

            {Object.entries(usuariosPorSector).map(([nombreSector, cantidad]) => (
              <div className="dashboard-card" key={nombreSector}>
                <h3>{nombreSector}</h3>
                <p>{cantidad}</p>
              </div>
            ))}
          </div>

        </>
      )}

    </div>
  )
}

export default Dashboard