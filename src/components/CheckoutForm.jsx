import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/firebase/db'

function CheckoutForm() {
  const navigate = useNavigate()
  const { cart, totalPrice, totalQty, clearCart } = useCart()


  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No tenés productos en el carrito.</h2>
        <Link to="/">Volver a la tienda</Link>
      </div>
    )
  }

  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    email2: '',
    phone: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [error, setError] = useState(null)

  const emailsMatch = buyer.email.trim() !== '' && buyer.email === buyer.email2
  const formValid =
    buyer.name.trim() !== '' &&
    buyer.email.trim() !== '' &&
    buyer.phone.trim() !== '' &&
    emailsMatch

  const orderItems = useMemo(
    () =>
      cart.map((p) => ({
        id: p.id,
        title: p.title || p.name,
        price: p.price,
        qty: p.qty,
      })),
    [cart]
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setBuyer((b) => ({ ...b, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValid) return

    setSubmitting(true)
    setError(null)

    try {
      const newOrder = {
        buyer: {
          name: buyer.name,
          email: buyer.email,
          phone: buyer.phone,
        },
        items: orderItems,
        total: totalPrice,
      }

      const id = await createOrder(newOrder)
      setOrderId(id)
      clearCart()
    } catch (err) {
      console.error('Error creando orden:', err)
      setError('Ocurrió un error al generar tu orden. Intentá nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }


  if (orderId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu número de orden es:</p>
        <code style={{ fontSize: '1.25rem' }}>{orderId}</code>
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }


  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '0.25rem',
  }

  const inputStyle = (hasError = false) => ({
    padding: '0.5rem',
    borderRadius: '4px',
    border: `1px solid ${hasError ? 'red' : '#ccc'}`,
    width: '100%',
  })

  const summaryBoxStyle = {
    marginTop: '2rem',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    background: '#f9f9f9',
    textAlign: 'left',
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Checkout</h1>
      <p>Completá tus datos para finalizar la compra.</p>

      {error && (
        <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: '1.5rem',
          display: 'grid',
          gap: '1rem',
        }}
      >
        <div style={fieldStyle}>
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={buyer.name}
            onChange={handleChange}
            style={inputStyle(buyer.name.trim() === '')}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={buyer.email}
            onChange={handleChange}
            style={inputStyle(
              buyer.email.trim() === '' ? true : false
            )}
          />
        </div>

        <div style={fieldStyle}>
          <label htmlFor="email2">Confirmá tu email</label>
          <input
            id="email2"
            name="email2"
            type="email"
            required
            value={buyer.email2}
            onChange={handleChange}
            style={inputStyle(buyer.email2.trim() !== '' && !emailsMatch)}
          />
          {buyer.email2.trim() !== '' && !emailsMatch && (
            <span style={{ color: 'red', fontSize: '0.8rem' }}>
              Los emails no coinciden.
            </span>
          )}
        </div>

        <div style={fieldStyle}>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={buyer.phone}
            onChange={handleChange}
            style={inputStyle(buyer.phone.trim() === '')}
          />
        </div>

        <button
          type="submit"
          disabled={!formValid || submitting}
          style={{
            padding: '0.75rem 1rem',
            background: formValid ? '#28a745' : '#aaa',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: formValid ? 'pointer' : 'not-allowed',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          {submitting ? 'Procesando...' : `Confirmar compra ($${totalPrice})`}
        </button>
      </form>

      {/* Resumen de compra */}
      <div style={summaryBoxStyle}>
        <h3>Resumen</h3>
        <ul style={{ paddingLeft: '1rem', margin: 0 }}>
          {cart.map((p) => (
            <li key={p.id} style={{ marginBottom: '0.25rem' }}>
              {p.title} x {p.qty} — ${p.price * p.qty}
            </li>
          ))}
        </ul>
        <hr style={{ margin: '0.75rem 0' }} />
        <p>Total unidades: {totalQty}</p>
        <p style={{ fontWeight: 'bold' }}>Total a pagar: ${totalPrice}</p>
      </div>
    </div>
  )
}

export default CheckoutForm
