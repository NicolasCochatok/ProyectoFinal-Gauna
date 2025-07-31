import { NavLink, Link } from 'react-router-dom'
import CartWidget from './CartWidget'

const linkStyle = ({ isActive }) => ({
  margin: '0 1rem',
  textDecoration: 'none',
  color: isActive ? 'blue' : '#555',
  fontWeight: isActive ? 'bold' : 'normal',
})

function Navbar() {
  return (
    <nav
      style={{
        padding: '1rem',
        backgroundColor: '#eee',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>
        Mi Tienda
      </Link>

      <NavLink to="/category/joyas"      style={linkStyle}>Joyas</NavLink>
      <NavLink to="/category/accesorios" style={linkStyle}>Accesorios</NavLink>

      <div style={{ marginLeft: 'auto' }}>
        <CartWidget />
      </div>
    </nav>
  )
}

export default Navbar
