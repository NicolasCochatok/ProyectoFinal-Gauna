import { Link } from 'react-router-dom'

function Item({ item }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '10px',
      padding: '1rem',
      margin: '1rem',
      maxWidth: '300px',
      textAlign: 'center',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <h2>{item.name}</h2>
      <p style={{ fontSize: '0.9rem' }}>{item.description}</p>
      <p style={{ fontWeight: 'bold' }}>${item.price}</p>
      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </div>
  )
}

export default Item
