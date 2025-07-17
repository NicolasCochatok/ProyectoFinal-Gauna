import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ItemCount from './ItemCount'
import { productImages } from '../data/products'
import { useCart } from '../context/CartContext'


function resolveImage(item) {
  if (item?.image && typeof item.image === 'string') return item.image
  if (item?.imageKey && productImages[item.imageKey]) return productImages[item.imageKey]
  if (item?.image) return item.image
  return 'https://via.placeholder.com/400x300?text=Sin+Imagen'
}

function ItemDetail({ item }) {
  const { addItem, isInCart, cart } = useCart()
  const [cantidadAgregada, setCantidadAgregada] = useState(0)
  const title = item?.title || item?.name || 'Producto'
  const description = item?.description || ''
  const price = item?.price ?? '—'
  const stock = item?.stock ?? 0
  const imgSrc = resolveImage(item)
  const qtyEnCarrito = useMemo(() => {
    if (!item) return 0
    const found = cart.find((p) => p.id === item.id)
    return found?.qty ?? 0
  }, [cart, item])
  const handleAdd = (count) => {
    setCantidadAgregada(count)
    addItem(
      {
        id: item.id,
        title,
        price: typeof price === 'number' ? price : 0,
        stock,
        image: imgSrc,
      },
      count
    )
    console.log(`Agregaste ${count} unidades al carrito`)
  }

  const yaEnCarrito = isInCart(item?.id) || cantidadAgregada > 0
  const totalAgregado = cantidadAgregada || qtyEnCarrito

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <img
        src={imgSrc}
        alt={title}
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '10px',
          marginBottom: '1.5rem',
        }}
      />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <strong>Precio:</strong>{' '}
        {typeof price === 'number' ? `$${price}` : price}
      </p>
      <p>
        <strong>Stock disponible:</strong> {stock}
      </p>

      {yaEnCarrito ? (
        <>
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            Agregaste {totalAgregado} unidad{totalAgregado === 1 ? '' : 'es'} al carrito.
          </p>
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            <Link
              to="/cart"
              style={{
                padding: '0.5rem 1rem',
                background: '#28a745',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Ir al carrito
            </Link>
            <Link
              to="/"
              style={{
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Seguir comprando
            </Link>
          </div>
        </>
      ) : (
        <ItemCount stock={stock} onAdd={handleAdd} />
      )}
    </div>
  )
}

export default ItemDetail
