import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import User from './pages/User'
import CreateDeck from './pages/CreateDeck'
import useUpdateEffect from './hooks/useUpdateEffect'
import ChoiceCard from './pages/CreateCard/ChoiceCard'
import NoteCard from './pages/CreateCard/NoteCard'
import CreateCardLayout from './pages/CreateCard/CreateCardLayout'

const DecksContext = createContext()

function App() {
	const [decks, setDecks] = useState([])

	useEffect(() => {
		setDecks(JSON.parse(localStorage.getItem('decks')))
	}, [])

	useUpdateEffect(() => {
		localStorage.setItem('decks', JSON.stringify(decks))
	}, [decks])

	return (
		<DecksContext.Provider value={{ decks, setDecks }}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Home />} />
						<Route path='user' element={<User />} />
						<Route path='create' element={<CreateCardLayout />}>
							<Route path='Choice' element={<ChoiceCard />} />
							<Route path='Note' element={<NoteCard />} />
						</Route>
						<Route path='create/deck' element={<CreateDeck />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</DecksContext.Provider>
	)
}

export default App
export { DecksContext }
