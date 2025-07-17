import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'


const productsRef = collection(db, 'products')
const ordersRef = collection(db, 'orders')


export async function getProducts() {
  const snapshot = await getDocs(productsRef)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}


export async function getProductsByCategory(categoryId) {
  const q = query(productsRef, where('category', '==', categoryId))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}


export async function getProductById(id) {
  const docRef = doc(db, 'products', id)
  const snap = await getDoc(docRef)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}


export async function createOrder({ buyer, items, total }) {
  const order = {
    buyer,
    items,
    total,
    createdAt: serverTimestamp(),
  }
  const docOrder = await addDoc(ordersRef, order)
  return docOrder.id
}
