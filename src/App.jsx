import { createContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import Layout from './components/Layout'
import User from './pages/User/User'
import CreateDeck from './pages/CreateDeck'
import ChoiceCard from './pages/CreateCard/ChoiceCard'
import CreateCardLayout from './pages/CreateCard/CreateCardLayout'
import NoteCard from './pages/CreateCard/NoteCard'
import DeckDetail from './pages/deckDetail/DeckDetail'
import Card from './pages/Card/Card'
import { NotificationContextProvider } from './context/NotificationContextProvider.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { DecksContextProvider } from './context/DecksContextProvider.jsx'
import A404Page from './pages/A404Page.jsx'
import LogIn from './pages/LogIn.jsx'
import Register from './pages/Register.jsx'
import { UserContextProvider } from './context/UserContextProvider.jsx'
import AuthRequired from './components/AuthRequired.jsx'

function App() {
	return (
		<BrowserRouter>
			<NotificationContextProvider>
				<UserContextProvider>
					<DecksContextProvider>
						<ThemeProvider>
							<Routes>
								<Route path='/' element={<Layout />}>
									<Route element={<AuthRequired />}>
										<Route index element={<Home />} />
										<Route path='user' element={<User />} />
										<Route path='create' element={<CreateCardLayout />}>
											<Route path='Choice' element={<ChoiceCard />} />
											<Route path='Note' element={<NoteCard />} />
										</Route>
										<Route path='create/deck' element={<CreateDeck />} />
										<Route path='deckDetail/:id' element={<DeckDetail />} />
										<Route path='cards/:id' element={<Card />} />
									</Route>
								</Route>
								<Route path='/login' element={<LogIn />} />
								<Route path='/register' element={<Register />} />
								<Route path='*' element={<A404Page />} />
							</Routes>
						</ThemeProvider>
					</DecksContextProvider>
				</UserContextProvider>
			</NotificationContextProvider>
		</BrowserRouter>
	)
}

export default App
