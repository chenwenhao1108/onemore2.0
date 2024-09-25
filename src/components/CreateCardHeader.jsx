import React, { useState, useContext } from 'react'
import Dropdown from './Dropdown'
import { DecksContext } from '../App'
import { Link } from 'react-router-dom'

export default function CreateCardHeader() {
	const [typeArr, setTypeArr] = useState(['Note', 'Choice', 'Fill-in'])
	const { decks } = useContext(DecksContext)
	return (
		<div className='create-card-header'>
			<Dropdown
				menu={typeArr.map((type) => (
					<Link to={type}>{type}</Link>
				))}
				icon={<i className='fa-solid fa-bars'></i>}
			/>
			<Dropdown
				menu={decks.map((deck) => deck.title)}
				icon={<i className='fa-solid fa-pen'></i>}
			/>
		</div>
	)
}
