import { useState } from 'react'

function ItemCount({ stock, onAdd }) {
  const [qty, setQty] = useState(1)

  const increase = () => qty < stock && setQty(qty + 1)
  const decrease = () => qty > 1     && setQty(qty - 1)

  if (stock === 0) {
    return <p style={{ color: 'red' }}>Sin stock disponible</p>
  }

  return (
    <div style={{ marginTop: '1rem', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button onClick={decrease}>−</button>
        <span>{qty}</span>
        <button onClick={increase}>+</button>
      </div>

      <button
        onClick={() => onAdd(qty)}
        style={{ marginTop: '0.75rem', padding: '0.4rem 1rem' }}
      >
        Agregar
      </button>
    </div>
  )
}

export default ItemCount
