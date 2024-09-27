import React, { useState, useContext, useEffect } from 'react'
import Dropdown from '../Dropdown'
import { DecksContext } from '../../App'
import { Link } from 'react-router-dom'
import { useEditorContext } from '../../context/EditorContextProvider'

export default function CreateCardHeader() {
	const [typeArr, setTypeArr] = useState(['Note', 'Choice', 'Fill-in'])
	const [cardType, setCardType] = useState(0)
	const [deckTitles, setDeckTitles] = useState([])
	const [selectedDeck, setSelectedDeck] = useState(0)
	const { decks, setDecks } = useContext(DecksContext)
	const { front, back } = useEditorContext()

	useEffect(() => {
		setDeckTitles(decks.map((deck) => deck.title))
	}, [decks])

	const getEditorContentAsJSON = () => {
		if (front && back) {
			const json = {
				cardType: typeArr[cardType],
				front: front.getHTML(),
				back: back.getHTML(),
				done: false,
			}
			setDecks((preD) =>
				preD.map((deck) => {
					if (deck.title === decks[selectedDeck].title) {
						return {
							...deck,
							cards: [...deck.cards, json],
						}
					} else {
						return deck
					}
				})
			)
		}
	}
	console.log(decks)
	const selectCardType = (type) => {
		setCardType(type)
	}

	const selectDeck = (deck) => {
		setSelectedDeck(deck)
	}

	return (
		<div className='create-card-header'>
			<Dropdown
				menu={typeArr.map((type) => (
					<Link to={type}>{type}</Link>
				))}
				icon={<i className='fa-solid fa-bars'></i>}
				select={selectCardType}
				title='Type'
			/>
			<Dropdown
				menu={deckTitles}
				icon={<i className='fa-solid fa-pen'></i>}
				defaultLink={<Link to='./deck'>New Deck</Link>}
				select={selectDeck}
				title='Deck'
			/>
			<button className='save-button' onClick={getEditorContentAsJSON}>
				<i className='fa-solid fa-floppy-disk' style={{ color: '#FFD43B' }}></i>
			</button>
		</div>
	)
}
