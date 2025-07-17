import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import ItemDetail from './ItemDetail'

function ItemDetailContainer() {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find(prod => prod.id === itemId))
      }, 500)
    })

    getItem.then(data => setItem(data))
  }, [itemId])

  return item ? <ItemDetail item={item} /> : <p>Cargando...</p>
}

export default ItemDetailContainer
