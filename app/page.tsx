import initialItems  from '../public/items.json';
import ItemList from './components/ItemList';
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const itemsWithQuantity = initialItems.map(item => ({
  ...item,
  quantity: 1,
}));
export default function Home() {
  return (
    <div>
      <h1>Item List</h1>
      <ItemList initialItems={itemsWithQuantity} />
    </div>
  );
}
