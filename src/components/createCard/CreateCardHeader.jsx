import React, { useState, useContext, useEffect } from 'react'
import Dropdown from '../Dropdown'
import { useDecksContext } from '../../context/DecksContextProvider.jsx'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEditorContext } from '../../context/EditorContextProvider'
import { useNotificationContext } from '../../context/NotificationContextProvider.jsx'

export default function CreateCardHeader() {
	const navigate = useNavigate()
	const [deckTitles, setDeckTitles] = useState([])
	const [deckId, setDeckId] = useState()
	const { decks, createCard } = useDecksContext()
	const { front, back } = useEditorContext()
	const { setNotification } = useNotificationContext()
	const location = useLocation()
	const state = location.state

	useEffect(() => {
		if (decks && decks.length > 0) {
			console.log(decks)
			if (!state) {
				setDeckId(decks[0].id)
				setDeckTitles(
					decks.map((deck, index) => {
						return {
							title: deck.title,
							select: () => setDeckId(deck.id),
							selected: index === 0,
						}
					})
				)
			} else {
				setDeckId(state.DeckId)
				setDeckTitles(
					decks.map((deck, index) => {
						if (deck.id === state.DeckId) {
							setSelectedDeck(index)
							return {
								title: deck.title,
								select: () => setDeckId(deck.id),
								selected: true,
							}
						}
						return {
							title: deck.title,
							select: () => setDeckId(deck.id),
							selected: false,
						}
					})
				)
			}
		}
	}, [decks])

	const uploadNewCard = async () => {
		if (front && back) {
			if (front.isEmpty || back.isEmpty) {
				setNotification({
					message: 'Can not have empty area!',
					status: 'error',
				})
			} else {
				const now = new Date()
				const card = {
					front: front.getHTML(),
					back: back.getHTML(),
					nextTime: now,
					correctTimes: 0,
				}
				if (deckId) {
					await createCard(card, deckId)
					front.commands.setContent('')
					back.commands.setContent('')
				} else {
					setNotification({
						status: 'error',
						message: 'Please select a deck',
					})
				}
			}
		}
	}

	return (
		<div className='create-card-header'>
			<div className='menus'>
				<Dropdown
					menu={deckTitles}
					icon={<i className='fa-solid fa-pen'></i>}
					defaultItem={{
						title: 'Add Deck',
						select: () => navigate('deck'),
					}}
					title='Deck'
				/>
			</div>
			<button className='save-button' onClick={uploadNewCard}>
				<i className='fa-solid fa-floppy-disk'></i>
				Add
			</button>
		</div>
	)
}
