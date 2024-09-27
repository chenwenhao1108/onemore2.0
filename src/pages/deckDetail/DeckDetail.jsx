import './DeckDetailPageStyles.scss'

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DecksContext } from '../../App'
import FrontCard from '../../components/FrontCard/FrontCard'

export default function DeckDetail() {
	const { id } = useParams()
	const { decks, setDecks } = useContext(DecksContext)
	const [deck, setDeck] = useState(null)
	const [cards, setCards] = useState([])
	const [allCards, setAllCards] = useState([])
	const [finishedCards, setFinishedCards] = useState([])
	const [unfinishedCards, setUnfinishedCards] = useState([])

	useEffect(() => {
		if (decks[id]) {
			setDeck(decks[id])
			setCards(decks[id].cards)
			setAllCards(decks[id].cards)
			setFinishedCards(decks[id].cards.filter((card) => card.done))
			setUnfinishedCards(decks[id].cards.filter((card) => !card.done))
		}
	}, [decks])

	console.log(deck)

	const deleteDeck = (deck) => {
		setDecks((preD) => {
			preD.filter((d) => d.title !== deck.title)
		})
	}

	return deck ? (
		<div className='deck-detail-page'>
			<div className='deck'>
				<img src={deck.cover} className='deck-cover' />
				<div className='deck-info'>
					<h3>{deck.title}</h3>
					<p>
						Duration: <span>{deck.duration}</span> minutes
					</p>
					<div className='progress-bar'>
						<div
							style={{
								width: `${deck.finish ? deck.finish / deck.number : '5px'}`,
							}}
						></div>
						<span>
							{deck.finish} / {deck.number}
						</span>
					</div>
					<button className='start-learning-button'>
						<i className='fa-brands fa-leanpub'></i>Start Learning
					</button>
				</div>
				<button onClick={(deck) => deleteDeck(deck)}>delete</button>
			</div>
			<div className='type-button-container'>
				<button onClick={() => setCards(allCards)}>All</button>
				<button onClick={() => setCards(finishedCards)}>Finished</button>
				<button onClick={() => setCards(unfinishedCards)}>Unfinished</button>
			</div>
			<hr className='deck-detail-hr'></hr>
			<div className='cards-container'>
				<div className='add-card'>
					<i className='fa-solid fa-plus'></i>
				</div>
				{cards.map((card, index) => {
					return <FrontCard key={index} content={card.front} />
				})}
			</div>
		</div>
	) : (
		<h1>Loading</h1>
	)
}
