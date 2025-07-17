import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]) // [{id,title,price,qty,stock,image}]

  // Agregar item (suma si ya existe, respetando stock)
  const addItem = (item, qty) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id)
      if (exists) {
        const updated = prev.map(p =>
          p.id === item.id
            ? { ...p, qty: Math.min(p.qty + qty, item.stock ?? p.stock ?? qty) }
            : p
        )
        return updated
      }
      return [...prev, { ...item, qty }]
    })
  }

  // Quitar un item por id
  const removeItem = id => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  // Vaciar carrito
  const clearCart = () => setCart([])

  // Helpers memorizados
  const totalQty = useMemo(
    () => cart.reduce((acc, p) => acc + p.qty, 0),
    [cart]
  )

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.qty * (p.price ?? 0), 0),
    [cart]
  )

  const isInCart = id => cart.some(p => p.id === id)

  const value = {
    cart,
    addItem,
    removeItem,
    clearCart,
    totalQty,
    totalPrice,
    isInCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return ctx
}
