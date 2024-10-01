import React, { createContext, useContext, useState, useEffect } from 'react'
import { useUserContext } from './UserContextProvider'
import {
	addDoc,
	collection,
	doc,
	getDocs,
	getDoc,
	deleteDoc,
	updateDoc,
	where,
	query,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { useNotificationContext } from './NotificationContextProvider.jsx'

const DecksContext = createContext()

function DecksContextProvider({ children }) {
	const { user } = useUserContext()
	const [decks, setDecks] = useState(null)
	const navigate = useNavigate()
	const { setNotification } = useNotificationContext()

	useEffect(() => {
		if (user) {
			getDecks()
		}
	}, [user])

	const getDecks = async () => {
		const userRef = doc(db, 'user', user.id)
		const decksRef = collection(userRef, 'decks')
		getDocs(decksRef)
			.then((snapshot) => {
				const decksSnapshot = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					}
				})
				setDecks(decksSnapshot)
			})
			.catch((error) => console.log(error))
	}

	const getCards = async (deckId) => {
		const userRef = doc(db, 'user', user.id)
		const deckRef = doc(collection(userRef, 'decks'), deckId)
		const cardsRef = collection(deckRef, 'cards')
		return getDocs(cardsRef)
			.then((snapshot) => {
				const cardsSnapshot = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					}
				})
				return cardsSnapshot
			})
			.catch((error) => console.log(error))
	}

	const getDeck = async (deckId) => {
		const userRef = doc(db, 'user', user.id)
		const deckRef = doc(collection(userRef, 'decks'), deckId)
		try {
			const deckSnapshot = await getDoc(deckRef)
			return {
				...deckSnapshot.data(),
				id: deckSnapshot.id,
			}
		} catch (error) {
			console.error(error.message)
			setNotification({
				status: 'error',
				message: 'something went wrong',
			})
			navigate('/')
		}
	}

	const deleteDeck = async (deckId) => {
		const deckRef = doc(collection(doc(db, 'user', user.id), 'decks'), deckId)
		try {
			await deleteDoc(deckRef)
			console.log('deck deleted')
			setNotification({
				message: 'Deck is deleted!',
				status: 'success',
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	const createDeck = async (deck) => {
		console.log(deck)
		if (!deck.title) {
			setNotification({
				message: "Title can't be empty!",
				status: 'error',
			})
			return
		}
		if (!deck.cover) {
			setNotification({
				message: "Cover can't be empty!",
				status: 'error',
			})
			return
		}
		try {
			const userRef = doc(db, 'user', user.id)
			const decksRef = collection(userRef, 'decks')
			const newDeckRef = await addDoc(decksRef, deck)
			setNotification({
				message: 'Deck is created!',
				status: 'success',
			})
			navigate('/create/note', { state: { deckId: newDeckRef.id } })
		} catch (error) {
			console.error(error.message)
			setNotification({
				message: error.message,
				status: 'error',
			})
		}
	}

	const updateDeck = async (deckId, deck) => {
		try {
			const deckRef = doc(collection(doc(db, 'user', user.id), 'decks'), deckId)
			await updateDoc(deckRef, deck)
			setNotification({
				status: 'success',
				message: 'deck updated',
			})
		} catch (error) {
			console.error(error.message)
			setNotification({
				status: 'error',
				message: error.message,
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
			setNotification({
				message: 'Card is created!',
				status: 'success',
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	const getCardsToLearn = async (deckId) => {
		try {
			const now = new Date()
			const cardsRef = collection(
				doc(collection(doc(db, 'user', user.id), 'decks'), deckId),
				'cards'
			)
			const q = query(
				cardsRef,
				where('nextTime', '<=', now),
				where('correctTimes', '<=', 7)
			)
			const cardsSnapshot = await getDocs(q)
			return cardsSnapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				}
			})
		} catch (error) {
			console.error(error.message)
		}
	}

	const updateCard = async (deckId, cardId, card) => {
		try {
			const cardRef = doc(
				collection(
					doc(collection(doc(db, 'user', user.id), 'decks'), deckId),
					'cards'
				),
				cardId
			)
			updateDoc(cardRef, card)
		} catch (error) {
			console.error(error.message)
		}
	}

	return (
		<DecksContext.Provider
			value={{
				decks,
				setDecks,
				createDeck,
				createCard,
				getDeck,
				getCards,
				deleteDeck,
				updateDeck,
				getCardsToLearn,
				updateCard,
			}}
		>
			{children}
		</DecksContext.Provider>
	)
}

const useDecksContext = () => {
	const context = useContext(DecksContext)
	if (!context) {
		throw new Error('DecksContext must be used within a DecksProvider!')
	}
	return context
}
export { DecksContextProvider, useDecksContext }
