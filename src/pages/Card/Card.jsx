import './CardPageStyles.scss'

import React, { useEffect, useState } from 'react'
import { DecksContext } from '../../App'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import useUpdateEffect from '../../hooks/useUpdateEffect'

export default function Card() {
	const { decks, setDecks } = useContext(DecksContext)
	const { id } = useParams()
	const [deckTitle, setDeckTitle] = useState(null)
	const [cardsToLearn, setCardsToLearn] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [frontHtmlContent, setFrontHtmlContent] = useState('')
	const [backHtmlContent, setBackHtmlContent] = useState('')
	const [showBack, setShowBack] = useState(false)
	const [cardIndex, setCardIndex] = useState([])
	const [done, setDone] = useState(false)

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
		if (Array.isArray(decks) && decks.length > 0) {
			decks.forEach((deck) => {
				if (deck.id === id) {
					const now = new Date()
					setCardsToLearn(
						deck.cards.filter((card, index) => {
							if (now >= new Date(card.nextTime) && card.correctTimes < 7) {
								setCardIndex((preCardIndex) => {
									if (!preCardIndex.includes(index)) {
										return [...preCardIndex, index]
									}
									return preCardIndex
								})
								return true
							}
							return false
						})
					)
					setDeckTitle(deck.title)
				}
			})
		}
	}, [decks])

	useEffect(() => {
		if (cardsToLearn.length > 0 && currentIndex < cardsToLearn.length) {
			setFrontHtmlContent(cardsToLearn[currentIndex].front)
			setBackHtmlContent(cardsToLearn[currentIndex].back)
		}
	}, [cardsToLearn])

	useUpdateEffect(() => {
		if (done) {
			setDecks((preDecks) =>
				preDecks.map((deck) => {
					if (deck.id === id) {
						const newCards = [...deck.cards]
						cardIndex.forEach((cardIndex, index) => {
							newCards[cardIndex] = cardsToLearn[index]
						})
						return { ...deck, cards: newCards }
					} else return deck
				})
			)
		}
	}, [done])

	function handleMemo(min) {
		if (currentIndex + 1 === cardsToLearn.length) {
			setDone(true)
		}

		setCardsToLearn((preCards) =>
			preCards.map((card, index) => {
				if (index === currentIndex) {
					let nextTime = new Date()

					nextTime = nextTime.setTime(nextTime.getTime() + min * 60 * 1000)

					return { ...card, nextTime, correctTimes: card.correctTimes + 1 }
				} else return card
			})
		)

		setCurrentIndex((p) => p + 1)
	}

	return done ? (
		<div className='done-page'>
			<h1>Congrats! You went through all cards!</h1>
			<Link to={`/cards/${id}`}>Go through again</Link>
		</div>
	) : (
		<div className='card-page'>
			<div className='card-page-title'>
				<i className='fa-solid fa-book'></i>
				{deckTitle}
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
