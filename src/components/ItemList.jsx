import Item from './Item'

function ItemList({ items }) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      {items.map(product => (
        <Item key={product.id} item={product} />
      ))}
    </div>
  )
}

export default ItemList
