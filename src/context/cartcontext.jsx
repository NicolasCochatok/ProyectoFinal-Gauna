import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addItem = (item, qty) => {
    setCart(prev => {
      const found = prev.find(p => p.id === item.id)
      if (found) {
        return prev.map(p =>
          p.id === item.id
            ? { ...p, qty: Math.min(p.qty + qty, item.stock ?? p.stock) }
            : p
        )
      }
      return [...prev, { ...item, qty }]
    })
  }

  const removeItem = id => setCart(prev => prev.filter(p => p.id !== id))
  const clearCart  = () => setCart([])

  const getItemQty = id => cart.find(p => p.id === id)?.qty || 0
  const isInCart   = id => getItemQty(id) > 0
  const totalQty   = cart.reduce((acc, p) => acc + p.qty, 0)
  const totalPrice = cart.reduce((acc, p) => acc + p.qty * (p.price ?? 0), 0)

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, getItemQty, isInCart, totalQty, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
