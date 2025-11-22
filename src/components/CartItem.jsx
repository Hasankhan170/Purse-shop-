import { TrashIcon } from "@heroicons/react/24/outline";
import { useCart } from "../hooks/useCart";

export default function CartItem({ item }) {
  const { updateQty, remove } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-600">₹{item.price} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
          className="w-8 h-8 rounded border hover:bg-gray-100"
        >
          -
        </button>
        <span className="w-8 text-center">{item.qty}</span>
        <button
          onClick={() => updateQty(item.id, item.qty + 1)}
          className="w-8 h-8 rounded border hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <button
        onClick={() => remove(item.id)}
        className="text-red-600 hover:text-red-800"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
}