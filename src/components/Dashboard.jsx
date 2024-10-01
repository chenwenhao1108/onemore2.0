import React, { useEffect, useState } from 'react'
import { useDecksContext } from '../context/DecksContextProvider'
import { useUserContext } from '../context/UserContextProvider'

export default function Dashboard() {
	const { decks, getCards } = useDecksContext()
	const { user } = useUserContext()
	const [duration, setDuration] = useState(0)
	const [totalCards, setTotalCards] = useState(0)
	const [doneCards, setDoneCards] = useState(0)

	useEffect(() => {
		if (decks) {
			let d = 0
			decks.forEach((deck) => {
				d += deck.duration / 1000 / 60
			})
			setDuration(d.toFixed(1))
		}
		const getCardsData = async () => {
			const cardsData = await getCards()
			if (cardsData) {
				let totalCards = 0
				let doneCards = 0
				cardsData.forEach((card) => {
					t += 1
					if (card.correctTimes >= 7) {
						doneCards += 1
					}
				})
				setTotalCards(totalCards)
				setDoneCards(doneCards)
			}
		}
		getCardsData()
	}, [user, decks])
	console.log(duration)
	return (
		<div className='dashboard'>
			<div className='dashboard-card'>
				Learning Duration:
				<span>{duration}</span>mins
			</div>
			<div className='dashboard-card'>Click To CheckIn</div>
			<div className='dashboard-card'>Mastered Cards:</div>
		</div>
	)
}
