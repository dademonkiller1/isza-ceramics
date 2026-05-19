import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import ProductDetails from './pages/ProductDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:handle" element={<ProductDetails />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
