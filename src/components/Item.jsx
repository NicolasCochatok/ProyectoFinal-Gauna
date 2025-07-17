import { Link } from 'react-router-dom'
import { productImages } from '../data/products' 

function resolveImage(item) {
  if (item.image && typeof item.image === 'string') {
    return item.image
  }
  if (item.imageKey && productImages[item.imageKey]) {
    return productImages[item.imageKey]
  }
  if (item.image) {
    return item.image
  }
  return 'https://via.placeholder.com/300x200?text=Sin+Imagen'
}

function Item({ item }) {
  const imgSrc = resolveImage(item)
  const title = item.title || item.name || 'Producto'
  const description = item.description || ''
  const price = item.price ?? '—'

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '1rem',
        margin: '1rem',
        maxWidth: '300px',
        textAlign: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <img
        src={imgSrc}
        alt={title}
        style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
      />
      <h2>{title}</h2>
      <p style={{ fontSize: '0.9rem' }}>{description}</p>
      <p style={{ fontWeight: 'bold' }}>
        {typeof price === 'number' ? `$${price}` : price}
      </p>
      <Link to={`/item/${item.id}`}>Ver detalle</Link>
    </div>
  )
}

export default Item
