import React, { useContext } from 'react'
import Header from '../components/Header'
import Deck from '../components/Deck'
import Dashboard from '../components/Dashboard'
import { DecksContext } from '../App'

export default function Home() {
	const { decks } = useContext(DecksContext)
	return (
		<>
			<Header />
			<Dashboard />
			{decks.map((deck, index) => {
				return (
					<Deck
						key={index}
						title={deck.title}
						duration={deck.duration}
						cover={deck.cover}
					/>
				)
			})}
		</>
	)
}
