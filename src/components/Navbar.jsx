import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
      <Link to='/' style={{ marginRight: '2rem', fontWeight: 'bold' }}>🛍 Mi Tienda</Link>
      <Link to='/category/joyas' style={{ marginRight: '1rem' }}>Joyas</Link>
      <Link to='/category/accesorios'>Accesorios</Link>
    </nav>
  )
}

export default Navbar
