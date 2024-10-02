import React, { useEffect, useState } from 'react'
import { useDecksContext } from '../context/DecksContextProvider'
import { useUserContext } from '../context/UserContextProvider'
import StudyTimeChart from './StudyTimeChart'

export default function Dashboard() {
	const { decks, getCards } = useDecksContext()
	const { user, getLearningTimes } = useUserContext()
	const [duration, setDuration] = useState(0)
	const [totalCards, setTotalCards] = useState(0)
	const [doneCards, setDoneCards] = useState(0)
	const [learningTimes, setLearningTimes] = useState([])

	useEffect(() => {
		const getCardsData = async (decks) => {
			let allCardsData = []
			let totalCardsNum = 0
			let doneCardsNum = 0

			try {
				const promises = decks.map(async (deck) => {
					return await getCards(deck.id)
				})

				const results = await Promise.all(promises)

				allCardsData = results.flat()

				if (allCardsData.length > 0) {
					allCardsData.forEach((card) => {
						totalCardsNum += 1
						if (card.correctTimes >= 7) {
							doneCardsNum += 1
						}
					})
					console.log(totalCards, doneCards)
					setTotalCards(totalCardsNum)
					setDoneCards(doneCardsNum)
				}
			} catch (error) {
				console.error(error)
			}
		}
		const getLearningTimesArr = async () => {
			const learningTimesArr = await getLearningTimes(user.id)

			setLearningTimes(
				learningTimesArr.map((time) => time / 1000 / 60).reverse()
			)
		}
		if (decks) {
			let d = 0
			decks.forEach((deck) => {
				d += deck.duration / 1000 / 60
			})
			setDuration(d.toFixed(1))

			getCardsData(decks)
			getLearningTimesArr()
		}
	}, [user, decks])
	return (
		<div className='dashboard'>
			<div>
				<StudyTimeChart studyTimes={learningTimes} />
			</div>
			<div className='progress-chart'>
				<h3>Progress</h3>
				<svg
					width='100'
					height='100'
					viewBox='0 0 100 100'
					xmlns='http://www.w3.org/2000/svg'
				>
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='#ddd'
						strokeWidth='10'
						fill='none'
					/>
					<circle
						cx='50'
						cy='50'
						r='45'
						stroke='#95e1d3'
						strokeWidth='10'
						fill='none'
						strokeDasharray={`${(doneCards / totalCards) * 314} 314`}
					/>
				</svg>
				<p id='progressPercentage'>{`${doneCards} / ${totalCards}`}</p>
			</div>
			<div className='info'>
				<div>
					Total: <span>{totalCards}</span>
				</div>
				<div>
					Completed: <span>{doneCards}</span>
				</div>
				<div>
					Duration: <span>{duration} m</span>
				</div>
			</div>
		</div>
	)
}
