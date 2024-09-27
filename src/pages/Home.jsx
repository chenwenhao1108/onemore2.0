import React, { useContext } from 'react'
import Header from '../components/Header'
import Deck from '../components/Deck'
import Dashboard from '../components/Dashboard'
import { DecksContext } from '../App'

export default function Home() {
	const { decks } = useContext(DecksContext)
	console.log(decks)
	return (
		<>
			<Header />
			<Dashboard />
			{decks.map((deck, index) => {
				return <Deck key={index} deck={deck} index={index} />
			})}
		</>
	)
}
