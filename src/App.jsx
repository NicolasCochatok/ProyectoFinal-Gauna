import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import CartView from './components/CartView'
import CheckoutForm from './components/CheckoutForm'

function App() {
  return (
    <BrowserRouter basename="/ProyectoFinal-Gauna">
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
