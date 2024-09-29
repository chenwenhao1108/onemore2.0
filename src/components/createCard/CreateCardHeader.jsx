import React, { useState, useContext, useEffect } from 'react'
import Dropdown from '../Dropdown'
import { DecksContext } from '../../App'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEditorContext } from '../../context/EditorContextProvider'
import { v4 } from 'uuid'
import { useNotificationContext } from '../../context/NotificationContextProvider.jsx'

export default function CreateCardHeader() {
	const navigate = useNavigate()
	const [typeArr] = useState([
		{
			title: 'Note',
			select: () => {
				setCardType('Note')
				navigate('note', { replace: false })
			},
			selected: true,
		},
		{
			title: 'Choice',
			select: () => {
				setCardType('Choice')
				navigate('choice', { replace: false })
			},
		},
		{
			title: 'Fill-in',
			select: () => {
				setCardType('Fill-in')
				navigate('note', { replace: false })
			},
		},
	])
	const [cardType, setCardType] = useState(0)
	const [deckTitles, setDeckTitles] = useState([])
	const [selectedDeck, setSelectedDeck] = useState(0)
	const { decks, setDecks } = useContext(DecksContext)
	const { front, back, setContent } = useEditorContext()
	const { setMessage, setShowNotification } = useNotificationContext()
	const location = useLocation()
	const state = location.state

	useEffect(() => {
		if (!state) {
			setDeckTitles(
				decks.map((deck, index) => {
					return {
						title: deck.title,
						select: () => setSelectedDeck(index),
						selected: index === selectedDeck,
					}
				})
			)
		} else {
			setDeckTitles(
				decks.map((deck, index) => {
					if (deck.id === state.DeckId) {
						setSelectedDeck(index)
						return {
							title: deck.title,
							select: () => setSelectedDeck(index),
							selected: true,
						}
					}
					return {
						title: deck.title,
						select: () => setSelectedDeck(index),
						selected: false,
					}
				})
			)
		}
	}, [decks])

	const getEditorContentAsJSON = () => {
		if (front && back) {
			if (front.isEmpty || back.isEmpty) {
				setShowNotification(true)
				setMessage({
					message: 'Can not have empty area!',
					status: 'error',
				})
			} else {
				const now = new Date()
				const id = v4()
				const card = {
					id,
					cardType: typeArr[cardType].title,
					front: front.getHTML(),
					back: back.getHTML(),
					nextTime: now,
					correctTimes: 0,
				}
				setDecks((preD) =>
					preD.map((deck) => {
						if (deck.id === decks[selectedDeck].id) {
							return {
								...deck,
								cards: [...deck.cards, card],
							}
						} else {
							return deck
						}
					})
				)
				setShowNotification(true)
				setMessage({
					message: 'Card is created!',
					status: 'success',
				})
				front.commands.setContent('')
				back.commands.setContent('')
			}
		}
	}

	return (
		<div className='create-card-header'>
			<div className='menus'>
				<Dropdown
					menu={typeArr}
					icon={<i className='fa-solid fa-bars'></i>}
					title='Type'
				/>
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
			<button className='save-button' onClick={getEditorContentAsJSON}>
				<i className='fa-solid fa-floppy-disk'></i>
			</button>
		</div>
	)
}
