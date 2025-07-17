import { db } from './config'
import { products } from '../../data/products'
import { doc, setDoc } from 'firebase/firestore'


export async function seedProducts() {
  try {
    for (const prod of products) {
      const { id, ...data } = prod
      const ref = doc(db, 'products', id) 
      await setDoc(ref, data, { merge: true })
      console.log(`✅ Producto ${id} seed OK`)
    }
    console.log('🎉 Seed completado.')
  } catch (err) {
    console.error('❌ Error en seed:', err)
  }
}
