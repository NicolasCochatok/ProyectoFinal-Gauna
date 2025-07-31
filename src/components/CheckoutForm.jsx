// src/components/CheckoutForm.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/firebase/db'

function CheckoutForm() {
  const navigate = useNavigate()
  const { cart, totalPrice, totalQty, clearCart } = useCart()

  /* hooks al tope del componente */
  const [buyer, setBuyer]       = useState({ name: '', email: '', email2: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId]   = useState(null)
  const [error, setError]       = useState(null)

  /* carrito vacío */
  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No tenés productos en el carrito.</h2>
        <Link to="/">Volver a la tienda</Link>
      </div>
    )
  }

  /* validaciones */
  const emailsMatch = buyer.email.trim() !== '' && buyer.email === buyer.email2
  const formValid =
    buyer.name.trim() !== '' &&
    buyer.email.trim() !== '' &&
    buyer.phone.trim() !== '' &&
    emailsMatch

  const handleChange = ({ target }) =>
    setBuyer(b => ({ ...b, [target.name]: target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formValid) return
    setSubmitting(true)
    setError(null)

    try {
      const newOrder = {
        buyer: { name: buyer.name, email: buyer.email, phone: buyer.phone },
        items: cart.map(p => ({ id: p.id, title: p.title, price: p.price, qty: p.qty })),
        total: totalPrice,
      }
      const id = await createOrder(newOrder)
      setOrderId(id)
      clearCart()
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error al generar tu orden. Intentá nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  /* orden creada */
  if (orderId) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>¡Gracias por tu compra!</h1>
        <p>Tu número de orden es:</p>
        <code style={{ fontSize: '1.25rem' }}>{orderId}</code>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '2rem', padding: '0.75rem 1.5rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px' }}
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  const field = {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '0.25rem',
  }
  const input = (err) => ({
    padding: '0.5rem',
    borderRadius: '4px',
    border: `1px solid ${err ? 'red' : '#ccc'}`,
    width: '100%',
  })

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Checkout</h1>
      <p>Completá tus datos para finalizar la compra.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', display: 'grid', gap: '1rem' }}>
        <div style={field}>
          <label>Nombre completo</label>
          <input name="name"  type="text"  required value={buyer.name}  onChange={handleChange} style={input(buyer.name.trim() === '')} />
        </div>

        <div style={field}>
          <label>Email</label>
          <input name="email" type="email" required value={buyer.email} onChange={handleChange} style={input(buyer.email.trim() === '')} />
        </div>

        <div style={field}>
          <label>Confirmá tu email</label>
          <input name="email2" type="email" required value={buyer.email2} onChange={handleChange} style={input(buyer.email2 && !emailsMatch)} />
          {buyer.email2 && !emailsMatch && <span style={{ color: 'red', fontSize: '0.8rem' }}>Los emails no coinciden.</span>}
        </div>

        <div style={field}>
          <label>Teléfono</label>
          <input name="phone" type="tel" required value={buyer.phone} onChange={handleChange} style={input(buyer.phone.trim() === '')} />
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
            fontWeight: 'bold',
          }}
        >
          {submitting ? 'Procesando…' : `Confirmar compra ($${totalPrice})`}
        </button>
      </form>

      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '6px', background: '#f9f9f9', textAlign: 'left' }}>
        <h3>Resumen</h3>
        <ul style={{ paddingLeft: '1rem', margin: 0 }}>
          {cart.map(p => (
            <li key={p.id}>{p.title} x {p.qty} — ${p.price * p.qty}</li>
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
