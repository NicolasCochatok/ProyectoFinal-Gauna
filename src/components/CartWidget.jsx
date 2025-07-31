import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CartWidget() {
  const { totalQty } = useCart()

  return (
    <Link
      to="/cart"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        fontSize: '1.5rem',
        textDecoration: 'none',
        lineHeight: 1,
        color: '#000',
      }}
      aria-label="Carrito"
    >
      🛒
      {totalQty > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            background: 'red',
            color: '#fff',
            borderRadius: '50%',
            padding: '0 6px',
            fontSize: '0.75rem',
          }}
        >
          {totalQty}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
