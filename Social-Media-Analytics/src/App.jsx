import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navigationbar'
import { Routes, Route } from "react-router-dom";
import TopUsers from './Pages/topUsers'
import Feed from './Pages/feed'
import TrendingPosts from './Pages/trendingposts'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/top-users" element={<TopUsers />} />
            <Route path="/trending" element={<TrendingPosts />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
