
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../services/firebase/config'
import ItemDetail from './ItemDetail'

function ItemDetailContainer () {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, 'products', itemId)
    getDoc(ref)
      .then(snap => {
        if (snap.exists()) setItem({ id: snap.id, ...snap.data() })
      })
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading)  return <p style={{ textAlign: 'center' }}>Cargando…</p>
  if (!item)    return <p style={{ textAlign: 'center' }}>Producto no encontrado</p>
  return <ItemDetail item={item} />
}

export default ItemDetailContainer
