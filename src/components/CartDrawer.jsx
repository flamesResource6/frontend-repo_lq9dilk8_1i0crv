import { X } from 'lucide-react'

export default function CartDrawer({ open, items, onClose, onCheckout }) {
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  return (
    <div className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your cart</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100"><X /></button>
        </div>
        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex gap-3 items-center">
                <img src={item.image_url} alt={item.title} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty {item.quantity}</p>
                </div>
                <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
