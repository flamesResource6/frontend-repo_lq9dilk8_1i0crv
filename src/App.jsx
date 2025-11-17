import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [category, setCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/products`)
      .then(r => r.json())
      .then(data => {
        setProducts(data)
        setFiltered(data)
      })
      .catch(() => {})
  }, [baseUrl])

  useEffect(() => {
    if (category === 'all') {
      setFiltered(products)
    } else {
      setFiltered(products.filter(p => p.category === category))
    }
  }, [category, products])

  const addToCart = (p) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.title === p.title)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...p, quantity: 1 }]
    })
    setOpen(true)
  }

  const handleCheckout = async () => {
    const order = {
      items: cart.map(i => ({
        product_id: i._id || '',
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image_url: i.image_url
      })),
      subtotal: cart.reduce((a, i) => a + i.price * i.quantity, 0)
    }
    const res = await fetch(`${baseUrl}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    })
    if (res.ok) {
      setCart([])
      alert('Order placed!')
      setOpen(false)
    } else {
      alert('Something went wrong.')
    }
  }

  const onSeed = async () => {
    await fetch(`${baseUrl}/api/seed`)
    const r = await fetch(`${baseUrl}/api/products`)
    const data = await r.json()
    setProducts(data)
  }

  const categories = useMemo(() => ([
    { key: 'all', label: 'All' },
    { key: 'potato', label: 'Potato' },
    { key: 'tortilla', label: 'Tortilla' },
    { key: 'kettle', label: 'Kettle' }
  ]), [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar cartCount={cart.reduce((a,i)=>a+i.quantity,0)} onCartClick={() => setOpen(true)} onSeed={onSeed} />

      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Snacks that go crunch
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Discover a curated selection of chips from classic salted to spicy tortilla. Add to cart and check out in seconds.
          </p>
        </div>

        <div className="flex gap-2 justify-center mt-6 flex-wrap">
          {categories.map(c => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-full border ${category===c.key? 'bg-yellow-500 text-white border-yellow-500':'bg-white hover:bg-gray-50'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filtered.map(p => (
            <ProductCard key={p.title} product={p} onAdd={addToCart} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            No products yet. Click Seed Products above to add sample chips.
          </div>
        )}
      </section>

      <CartDrawer open={open} items={cart} onClose={() => setOpen(false)} onCheckout={handleCheckout} />

      <footer className="mt-20 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ChipMart. All rights reserved.
      </footer>
    </div>
  )
}

export default App
