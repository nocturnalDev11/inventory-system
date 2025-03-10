import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInventory } from '../../services/inventoryService.';
import { setInventory } from '../../store/inventorySlice';

function InventoryList() {
    const dispatch = useDispatch();
    const { items } = useSelector((state: any) => state.inventory);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const data = await getInventory();
                dispatch(setInventory(data));
            } catch (error) {
                console.error('Failed to fetch inventory:', error);
            }
        };
        fetchInventory();
    }, [dispatch]);

  return (
    <div>
        <h2>Inventory List</h2>
        <ul>
            {items.map((item: any) => (
            <li key={item._id}>{item.name} - {item.quantity} units</li>
            ))}
        </ul>
    </div>
  );
}

export default InventoryList;