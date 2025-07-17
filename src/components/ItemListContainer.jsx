import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import ItemList from './ItemList'

function ItemListContainer() {
  const { categoryId } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    const getProducts = new Promise((resolve) => {
      setTimeout(() => {
        const filtered = categoryId
          ? products.filter(prod => prod.category === categoryId)
          : products
        resolve(filtered)
      }, 500)
    })

    getProducts.then(data => setItems(data))
  }, [categoryId])

  return <ItemList items={items} />
}

export default ItemListContainer
