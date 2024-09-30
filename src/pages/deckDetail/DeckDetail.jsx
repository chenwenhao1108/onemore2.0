import './DeckDetailPageStyles.scss'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FrontCard from '../../components/FrontCard/FrontCard'
import Dropdown from '../../components/Dropdown'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import { useDecksContext } from '../../context/DecksContextProvider'

export default function DeckDetail() {
	const { id } = useParams()
	const { decks, setDecks } = useDecksContext()
	const [deck, setDeck] = useState(null)
	const [cards, setCards] = useState([])
	const [allCards, setAllCards] = useState([])
	const [finishedCards, setFinishedCards] = useState([])
	const [unfinishedCards, setUnfinishedCards] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		if (Array.isArray(decks) && decks?.length > 0) {
			setDeck(decks.filter((deck) => deck.id === id)[0])
		}
	}, [decks])

	useUpdateEffect(() => {
		if (deck) {
			setCards(deck.cards)
			setAllCards(deck.cards)
			setFinishedCards(deck.cards.filter((card) => card.correctTimes >= 7))
			setUnfinishedCards(deck.cards.filter((card) => card.correctTimes < 7))
		}
	}, [deck])

	const deleteDeck = () => {
		setDecks((preD) => {
			return preD.filter((d) => {
				return d.title !== deck.title
			})
		})
	}

	return deck ? (
		<div className='deck-detail-page'>
			<div className='deck'>
				<img src={deck.cover} className='deck-cover' />
				<div className='deck-info'>
					<h3>{deck.title}</h3>
					<div className='deck-info-tags-container'>
						{deck.tags.map((tag, index) => {
							return (
								<div
									key={index}
									className='tag'
									style={{ backgroundColor: tag.color }}
								>
									{tag.text}
								</div>
							)
						})}
					</div>
					<p>
						Duration: <span>{deck.duration}</span> min
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
				</div>
				<Dropdown
					menu={[
						{
							title: 'Modify',
							select: () => navigate('/create/deck'),
							icon: <i className='fa-regular fa-pen-to-square'></i>,
						},
						{
							title: 'Delete',
							select: () => {
								// delete deck

								// navigate to home
								navigate('/')
							},
							icon: <i className='fa-solid fa-trash-can'></i>,
						},
					]}
					icon={<i className='fa-solid fa-ellipsis'></i>}
					className='deck-menu'
				/>
				<Link to={`/cards/${id}`} className='start-learning-button'>
					<i className='fa-brands fa-leanpub'></i>Start Learning
				</Link>
			</div>
			<div className='type-button-container'>
				<button onClick={() => setCards(allCards)}>All</button>
				<button onClick={() => setCards(finishedCards)}>Finished</button>
				<button onClick={() => setCards(unfinishedCards)}>Unfinished</button>
			</div>
			<hr className='deck-detail-hr'></hr>
			<div className='cards-container'>
				<div
					className='add-card'
					onClick={() => navigate('/create/note', { state: { deckId: id } })}
				>
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
