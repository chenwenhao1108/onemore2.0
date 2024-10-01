import './DeckDetailPageStyles.scss'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FrontCard from '../../components/FrontCard/FrontCard'
import Dropdown from '../../components/Dropdown'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import { useDecksContext } from '../../context/DecksContextProvider'
import LoadingPage from '../LoadingPage'

export default function DeckDetail() {
	const { id } = useParams()
	const { getDeck, getCards, deleteDeck } = useDecksContext()
	const [deck, setDeck] = useState(null)
	const [cardsToRender, setCardsToRender] = useState([])
	const [allCards, setAllCards] = useState([])
	const [finishedCards, setFinishedCards] = useState([])
	const [unfinishedCards, setUnfinishedCards] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const getDeckData = async () => {
			try {
				const deckData = await getDeck(id)
				setDeck(deckData)
			} catch (error) {
				console.error(error)
			}
		}
		getDeckData()

		const getCardsData = async () => {
			try {
				const cardsData = await getCards(id)
				setAllCards(cardsData)
				console.log('cards: ', cardsData)
			} catch (error) {
				console.error(error)
			}
		}

		getCardsData()
	}, [])

	useEffect(() => console.log(deck), [deck])
	useEffect(() => console.log(allCards), [allCards])

	useUpdateEffect(() => {
		if (allCards) {
			setCardsToRender(allCards)
			setFinishedCards(allCards.filter((card) => card.correctTimes >= 7))
			setUnfinishedCards(allCards.filter((card) => card.correctTimes < 7))
		}
	}, [allCards])

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
						Duration: <span>{(deck.duration / 1000 / 60).toFixed(1)}</span> min
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
							select: () =>
								navigate('/create/deck', {
									state: {
										title: deck.title,
										tags: deck.tags,
										cover: deck.cover,
										deckId: deck.id,
									},
								}),
							icon: <i className='fa-regular fa-pen-to-square'></i>,
						},
						{
							title: 'Delete',
							select: async () => {
								// delete deck
								await deleteDeck(id)
								// navigate to home
								navigate('/')
							},
							icon: <i className='fa-solid fa-trash-can'></i>,
						},
					]}
					icon={<i className='fa-solid fa-ellipsis'></i>}
					className='deck-menu'
				/>
				<Link
					to={`/cards/${id}`}
					className='start-learning-button'
					state={{ deck: deck }}
				>
					<i className='fa-brands fa-leanpub'></i>Start Learning
				</Link>
			</div>
			<div className='type-button-container'>
				<button onClick={() => setCardsToRender(allCards)}>All</button>
				<button onClick={() => setCardsToRender(finishedCards)}>
					Finished
				</button>
				<button onClick={() => setCardsToRender(unfinishedCards)}>
					Unfinished
				</button>
			</div>
			<hr className='deck-detail-hr'></hr>
			<div className='cards-container'>
				{cardsToRender.map((card, index) => {
					return <FrontCard key={index} content={card.front} />
				})}
				<div
					className='add-card'
					onClick={() => navigate('/create/note', { state: { deckId: id } })}
				>
					<i className='fa-solid fa-plus'></i>
				</div>
			</div>
		</div>
	) : (
		<LoadingPage />
	)
}
