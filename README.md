# Proyecto Final – React JS    
_E-commerce “Mi Tienda” – Joyas & Accesorios_

Este repositorio contiene la **entrega final** del curso React JS (Coderhouse).  
La SPA muestra un catálogo de productos almacenados en **Cloud Firestore**, permite ver el detalle, agregar al carrito, generar una orden y guardar la compra en la base de datos.

---

## 🌐 Demo

| Entorno | URL |
|---------|-----|
| **GitHub Pages** | <https://nicolascochatok.github.io/ProyectoFinal-Gauna/> |

---

## 🚀 Stack & librerías

| Área | Herramienta |
|------|-------------|
| Framework | **React 19** + Vite |
| Ruteo SPA | `react-router-dom ^7` |
| Estado global | **Context API** + Hooks |
| Backend as a Service | **Firebase v11** (Firestore DB + Analytics) |
| Lint & Build | ESLint • Vite |

---

## 📁 Estructura principal

src/
├─ assets/ # imágenes locales
├─ components/ # componentes presentacionales y contenedores
├─ context/CartContext # provider & hook de carrito
├─ data/products.js # mock + mapa de imágenes (solo para seed)
└─ services/firebase/
├─ config.js # inicialización Firebase + export db
├─ seed.js # helper para sembrar productos
└─ db.js # helpers Firestore (createOrder,...)

yaml
Copiar
Editar

---

## 🔧 Instalación local

```bash
git clone https://github.com/NicolasCochatok/ProyectoFinal-Gauna.git
cd ProyectoFinal-Gauna
npm install
cp .env.example .env        # rellena tus credenciales Firebase
npm run dev                 # abre http://localhost:5173/ProyectoFinal-Gauna/
Variables .env
ini
Copiar
Editar
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
🌱 Sembrar productos (opcional)
Si tu colección products está vacía pulsa:

bash
Copiar
Editar
npm run seed
Usa src/services/firebase/seed.js para crear / actualizar los 10 productos de ejemplo.

🛠️ Scripts útiles
Comando	Descripción
npm run dev	Vite dev-server con recarga en caliente
npm run build	Build de producción en dist/
npm run preview	Sirve el build para testear
npm run lint	Ejecuta ESLint

✨ Funcionalidades
Listado dinámico de productos por categoría (consulta Firestore).

Detalle con selector de cantidad y stock.

Carrito global (Context) – agrega, elimina, totaliza.

Checkout con validaciones, genera orden en Firestore y muestra ID.

Render condicional: loaders, “carrito vacío”, etc.

Deploy automático a GitHub Pages vía Actions.

📸 Screenshot

Autor
Nicolás Gauna – LinkedIn – Comisión # React JS
Coderhouse · Julio 2025

makefile
Copiar
Editar
::contentReference[oaicite:0]{index=0}







Fuentes

Preguntar a ChatGPT
