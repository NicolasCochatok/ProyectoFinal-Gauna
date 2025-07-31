// src/components/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/firebase/config';
import ItemList from './ItemList';

function ItemListContainer() {
  const { categoryId } = useParams();
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        // referencia a la colección “products”
        const productsRef = collection(db, 'products');

        // si llega categoryId armo un query filtrado
        const q = categoryId
          ? query(productsRef, where('category', '==', categoryId))
          : productsRef;

        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setItems(docs);
      } catch (err) {
        console.error('Error cargando productos:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryId]);

  if (loading) return <p style={{ padding: '2rem' }}>Cargando…</p>;

  return <ItemList items={items} />;
}

export default ItemListContainer;
