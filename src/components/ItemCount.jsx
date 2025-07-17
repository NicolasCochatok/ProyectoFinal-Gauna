import { useState } from 'react'

function ItemCount({ stock, onAdd }) {
  const [count, setCount] = useState(1)

  const increase = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={decrease}>−</button>
      <span style={{ margin: '0 1rem' }}>{count}</span>
      <button onClick={increase}>+</button>
      <br /><br />
      <button onClick={() => onAdd(count)}>Agregar</button>
    </div>
  )
}

export default ItemCount
