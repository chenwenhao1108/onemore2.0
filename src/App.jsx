import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import User from './pages/User'
import CreateDeck from './pages/CreateDeck'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='user' element={<User />} />
					<Route path='createdeck' element={<CreateDeck />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
