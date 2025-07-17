📄 README.md
markdown
Copiar
Editar
# Segunda Pre-Entrega - React JS (Coderhouse)

Este proyecto corresponde a la segunda pre-entrega del curso de React JS. Se trata de una tienda online básica con navegación entre categorías, listado de productos y vista de detalle, utilizando React Router DOM y simulación de asincronía.

---

## 🛠️ Tecnologías usadas

- React
- Vite
- React Router DOM
- JavaScript (ES6+)

---

## ✅ Funcionalidades implementadas

### Navegación
- Configuración de rutas con `BrowserRouter`, `Routes` y `Route`.
- Navegación entre la **Home** y páginas por **categoría** (`/category/:categoryId`).
- Vista de detalle por producto (`/item/:itemId`).

### Componentes
- `Navbar`: menú superior con enlaces a la home y categorías.
- `ItemListContainer`: obtiene productos con una promesa y filtra por categoría.
- `ItemList`: recorre los productos con `.map()` y renderiza un `Item` por cada uno.
- `Item`: muestra una card de producto con botón de acceso al detalle.
- `ItemDetailContainer`: obtiene un producto según `id` por URL y pasa a `ItemDetail`.
- `ItemDetail`: muestra el detalle del producto, con selector de cantidad.
- `ItemCount`: contador que permite sumar/restar cantidad hasta el stock disponible.

### Asincronía
- Simulación de llamadas a API con `setTimeout` y promesas.
- Productos cargados desde un mock en `data/products.js`.

---

## 📸 Imágenes

Todos los productos se muestran con imágenes locales en `src/assets/`, importadas dinámicamente desde el mock.

---

## 🚀 Cómo ejecutar el proyecto

1. Cloná el repositorio:
```bash
git clone https://github.com/tu-usuario/segunda-pre-entrega.git
Instalá las dependencias:

bash
Copiar
Editar
npm install
Ejecutá el proyecto:

bash
Copiar
Editar
npm run dev
Abrí http://localhost:5173 en tu navegador.

📂 Estructura principal
css
Copiar
Editar
src/
├── components/
│   ├── Navbar.jsx
│   ├── ItemListContainer.jsx
│   ├── ItemList.jsx
│   ├── Item.jsx
│   ├── ItemDetailContainer.jsx
│   ├── ItemDetail.jsx
│   └── ItemCount.jsx
├── data/
│   └── products.js
├── assets/
│   └── *.jpeg
├── App.jsx
├── main.jsx
└── index.css
💬 Autor
Marcos Nicolás Gauna Cochatok
Estudiante - Comisión Flex React JS