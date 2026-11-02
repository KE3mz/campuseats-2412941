import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartProvider'

import Layout from './routes/Layout'
import HomePage from './pages/HomePage'
import VendorPage from './pages/VendorPage'
import CartPage from './pages/CartPage'
import OrdersPage from './pages/OrdersPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
        <CartProvider>
            <Routes>
                <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="vendor/:id" element={<VendorPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </CartProvider>
    </BrowserRouter>
  )
}