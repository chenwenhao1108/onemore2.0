import './CardPageStyles.scss'

import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { useDecksContext } from '../../context/DecksContextProvider'
import LoadingPage from '../LoadingPage'
import { useUserContext } from '../../context/UserContextProvider'

export default function Card() {
	const { getCardsToLearn, updateCard, updateDeck } = useDecksContext()
	const { user, updateLearningTime } = useUserContext()
	const [deck, setDeck] = useState(null)
	const [cardsToLearn, setCardsToLearn] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [frontHtmlContent, setFrontHtmlContent] = useState('')
	const [backHtmlContent, setBackHtmlContent] = useState('')
	const [startTime, setStartTime] = useState(null)
	const [showBack, setShowBack] = useState(false)
	const [done, setDone] = useState(false)
	const [loading, setLoading] = useState(true)

	const location = useLocation()

	const front = useEditor({
		extensions: [StarterKit],
		content: frontHtmlContent,
		editable: false,
	})

	const back = useEditor({
		extensions: [StarterKit],
		content: backHtmlContent,
		editable: false,
	})

	useEffect(() => {
		if (frontHtmlContent) {
			front.commands.setContent(frontHtmlContent, false)
		}
		if (backHtmlContent) {
			back.commands.setContent(backHtmlContent, false)
		}
	}, [frontHtmlContent, backHtmlContent])

	useEffect(() => {
		const getCardsData = async () => {
			const cardsData = await getCardsToLearn(deck.id)
			if (cardsData.length > 0) {
				setCardsToLearn(cardsData)
				setStartTime(new Date())
			} else {
				setDone(true)
			}
			setLoading(false)
		}
		if (deck) {
			getCardsData()
		}
	}, [deck])

	useEffect(() => {
		const state = location.state
		if (state) {
			setDeck(state.deck)
		}
		console.log(state)
	}, [location])

	useEffect(() => {
		console.log(cardsToLearn)
		if (cardsToLearn.length > 0 && currentIndex < cardsToLearn.length) {
			setFrontHtmlContent(cardsToLearn[currentIndex].front)
			setBackHtmlContent(cardsToLearn[currentIndex].back)
		}
	}, [cardsToLearn])

	useEffect(() => {
		if (done && cardsToLearn.length > 0) {
			const endTime = new Date()
			const duration = endTime - startTime
			const newDeck = {
				...deck,
				duration,
			}
			updateDeck(deck.id, newDeck)

			updateLearningTime(user.id, duration)
		}
	}, [done])

	function handleMemo(min) {
		if (currentIndex + 1 === cardsToLearn.length) {
			setDone(true)
		}
		let correctTimes = cardsToLearn[currentIndex].correctTimes
		if (min === 2) {
			correctTimes = cardsToLearn[currentIndex].correctTimes - 1
		} else if (min === 14400) {
			correctTimes = cardsToLearn[currentIndex].correctTimes + 1
		}

		const now = new Date()
		const nextTime = new Date(now.setTime(now.getTime() + min * 60 * 1000))
		const card = {
			...cardsToLearn[currentIndex],
			correctTimes,
			nextTime,
		}
		updateCard(deck.id, cardsToLearn[currentIndex].id, card)
		setShowBack(false)
		setCurrentIndex((p) => p + 1)
	}

	return loading ? (
		<LoadingPage />
	) : done ? (
		<div className='done-page'>
			<h1>Congrats!🥳</h1>
			<h3>You went through all cards!</h3>
			<div>
				<Link to={'/create/note'}>Add more cards</Link>
				<Link to={'/'} state={{ deckId: deck.id }}>
					Back to home
				</Link>
			</div>
		</div>
	) : (
		<div className='card-page'>
			<div className='card-page-title'>
				<i className='fa-solid fa-book'></i>
				{deck.title}
			</div>
			<EditorContent editor={front} className='card-page-front-card' />
			<EditorContent
				editor={back}
				className='card-page-back-card'
				style={{ visibility: showBack ? 'visible' : 'hidden' }}
			/>
			<div className='card-page-button-container'>
				{!showBack ? (
					<button
						className='show-back-button'
						onClick={() => setShowBack(!showBack)}
					>
						Show Back
					</button>
				) : (
					<div className='level-buttons-container'>
						<button className='hard-button' onClick={() => handleMemo(2)}>
							Hard<span>2 min</span>
						</button>
						<button className='good-button' onClick={() => handleMemo(10080)}>
							Good<span>7 days</span>
						</button>
						<button className='easy-button' onClick={() => handleMemo(14400)}>
							Easy<span>10 days</span>
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
