import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import Layout from './components/Layout'
import User from './pages/User/User'
import CreateDeck from './pages/CreateDeck'
import useUpdateEffect from './hooks/useUpdateEffect'
import ChoiceCard from './pages/CreateCard/ChoiceCard'
import CreateCardLayout from './pages/CreateCard/CreateCardLayout'
import NoteCard from './pages/CreateCard/NoteCard'
import DeckDetail from './pages/deckDetail/DeckDetail'
import Card from './pages/Card/Card'
import Notification from './components/Notification'
import { NotificationContextProvider } from './context/NotificationContextProvider.jsx'

const DecksContext = createContext()

function App() {
	const [decks, setDecks] = useState([])

	useEffect(() => {
		const d = localStorage.getItem('decks')
		if (d) {
			setDecks(JSON.parse(d))
		}
	}, [])

	useUpdateEffect(() => {
		localStorage.setItem('decks', JSON.stringify(decks))
		console.log('decks updated: ', decks)
	}, [decks])

	return (
		<DecksContext.Provider value={{ decks, setDecks }}>
			<NotificationContextProvider>
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
							<Route path='deckDetail/:id' element={<DeckDetail />} />
							<Route path='cards/:id' element={<Card />} />
							<Route path='*' element={<Link to='/'>back to Home</Link>} />
						</Route>
					</Routes>
				</BrowserRouter>
			</NotificationContextProvider>
		</DecksContext.Provider>
	)
}

export default App
export { DecksContext }
