import { Link } from 'react-router-dom'
import { useCart } from '../context/cartcontext'

function CartWidget() {
  const { totalQty } = useCart()

  return (
    <Link
      to="/cart"
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0.25rem 0.5rem',
        textDecoration: 'none',
        fontSize: '1.25rem',
        lineHeight: 1,
      }}
      aria-label="Ir al carrito"
      title="Ir al carrito"
    >
      🛒
      {totalQty > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: 'red',
            color: '#fff',
            borderRadius: '50%',
            padding: '0 6px',
            fontSize: '0.75rem',
            lineHeight: 1.2,
          }}
        >
          {totalQty}
        </span>
      )}
    </Link>
  )
}

export default CartWidget
