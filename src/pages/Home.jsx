import React from 'react'
import Header from '../components/Header'
import Deck from '../components/Deck'
import Dashboard from '../components/Dashboard'
import { useDecksContext } from '../context/DecksContextProvider'

export default function Home() {
	const { decks } = useDecksContext()

	return (
		<>
			<Header />
			<Dashboard />
			{decks &&
				decks.map((deck, index) => {
					return <Deck key={index} deck={deck} id={deck.id} />
				})}
		</>
	)
}
