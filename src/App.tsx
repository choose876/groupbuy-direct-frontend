import { useEffect, useState } from 'react'
import axios from 'axios'


type Product = {
  id: string
  title: string
  priceJMD: number
  imageUrl: string
}

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Check backend status via a server-side proxy to avoid CORS issues
    axios.get('/.netlify/functions/api-status')
      .then(res => setApiStatus(res.data.message))
      .catch(() => setApiStatus('Status check failed'))

    // 2. Mock products for now - we'll replace this with real API call later
    setProducts([
      {
        id: '1',
        title: 'Samsung Galaxy A15',
        priceJMD: 32000,
        imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400'
      },
      {
        id: '2', 
        title: '5L Rice Cooker',
        priceJMD: 8500,
        imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-green-600 text-white p-4 text-center text-sm">
        Backend Status: {apiStatus}
      </div>
      
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">GroupBuy Direct</h1>
          <p className="text-gray-600">Buy together, save more in Jamaica</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow p-6">
              <img src={p.imageUrl} alt={p.title} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="text-2xl font-bold text-green-600 my-2">
                ${p.priceJMD.toLocaleString()} JMD
              </p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mt-4">
                Join Group Buy
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
