import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserContext } from './UserContextProvider'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from './NotificationContextProvider.jsx'

const DecksContext = createContext()

function DecksContextProvider({ children }) {
	const { user } = useUserContext()
	const [decks, setDecks] = useState(null)
	const navigate = useNavigate()
	const { setShowNotification, setMessage } = useNotificationContext()

	useEffect(() => {
		if (user) {
			getDecks()
		}
	}, [user])

	const getDecks = async () => {
		const userRef = doc(db, 'user', user.id)
		const decksRef = collection(userRef, 'decks')
		await getDocs(decksRef).then((snapshot) => {
			const decksSnapshot = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				}
			})
			setDecks(decksSnapshot)
		})
	}

	const createDeck = async (deck) => {
		console.log(deck)
		if (!deck.title) {
			setShowNotification(true)
			setMessage({
				message: "Title can't be empty!",
				status: 'error',
			})
			return
		}
		if (!deck.cover) {
			setShowNotification(true)
			setMessage({
				message: "Cover can't be empty!",
				status: 'error',
			})
			return
		}
		try {
			const userRef = doc(db, 'user', user.id)
			const decksRef = collection(userRef, 'decks')
			const newDeckRef = await addDoc(decksRef, deck)
			setShowNotification(true)
			setMessage({
				message: 'Deck is created!',
				status: 'success',
			})
			navigate('/create/note', { state: { deckId: newDeckRef.id } })
		} catch (error) {
			console.error(error.message)
			setShowNotification(true)
			setMessage({
				message: error.message,
				status: 'error',
			})
		}
	}

	const createCard = async (card, deckId) => {
		try {
			const userRef = doc(db, 'user', user.id)
			const deckRef = doc(collection(userRef, 'decks'), deckId)
			const cardsRef = collection(deckRef, 'cards')
			await addDoc(cardsRef, card)
			console.log('card created')
			setShowNotification(true)
			setMessage({
				message: 'Card is created!',
				status: 'success',
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	// const updateDecks = async () => {
	// 	try{
	// 		const decksRef = collection(doc(db, 'user', user.id), 'decks')

	// 	}
	// }

	// useEffect(() => {
	// 	const d = localStorage.getItem('decks')
	// 	if (d) {
	// 		setDecks(JSON.parse(d))
	// 	}
	// }, [])

	// useUpdateEffect(() => {
	// 	localStorage.setItem('decks', JSON.stringify(decks))
	// 	console.log('decks updated: ', decks)
	// }, [decks])

	return (
		<DecksContext.Provider
			value={{
				decks,
				setDecks,
				createDeck,
				createCard,
			}}
		>
			{children}
		</DecksContext.Provider>
	)
}

const useDecksContext = () => {
	const context = useContext(DecksContext)
	if (!context) {
		throw new Error(
			'NotificationContext must be used within a NotificationProvider!'
		)
	}
	return context
}
export { DecksContextProvider, useDecksContext }
