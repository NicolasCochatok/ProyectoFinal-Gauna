import { useState } from 'react'
import ItemCount from './ItemCount'

function ItemDetail({ item }) {
  const [cantidad, setCantidad] = useState(0)

  const onAdd = (count) => {
    setCantidad(count)
    console.log(`Agregaste ${count} unidades al carrito`)
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '100%', maxWidth: '400px', borderRadius: '10px', marginBottom: '1.5rem' }}
      />
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p><strong>Precio:</strong> ${item.price}</p>
      <p><strong>Stock disponible:</strong> {item.stock}</p>

      {cantidad > 0
        ? <p style={{ color: 'green', fontWeight: 'bold' }}>Agregaste {cantidad} unidades</p>
        : <ItemCount stock={item.stock} onAdd={onAdd} />}
    </div>
  )
}

export default ItemDetail
