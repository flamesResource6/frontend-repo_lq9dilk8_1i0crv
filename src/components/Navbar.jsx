import { ShoppingCart, Chips, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ cartCount = 0, onCartClick, onSeed }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-700">
            <Chips size={20} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">ChipMart</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#potato" className="hover:text-gray-900">Potato</a>
          <a href="#tortilla" className="hover:text-gray-900">Tortilla</a>
          <a href="#kettle" className="hover:text-gray-900">Kettle</a>
          <button onClick={onSeed} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Seed Products</button>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setOpen(v=>!v)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 px-4 py-3 flex items-center gap-4 text-sm">
          <a href="#potato" className="hover:text-gray-900">Potato</a>
          <a href="#tortilla" className="hover:text-gray-900">Tortilla</a>
          <a href="#kettle" className="hover:text-gray-900">Kettle</a>
          <button onClick={onSeed} className="ml-auto px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Seed</button>
        </div>
      )}
    </header>
  )
}
