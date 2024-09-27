import React from 'react'
import { Link } from 'react-router-dom'

export default function Deck({ deck, finish = 0, number = 0, index = 0 }) {
	return (
		<Link to={`deckDetail/${index}`}>
			<div className='deck'>
				<img src={deck.cover} className='deck-cover' />
				<div className='deck-info'>
					<h3>{deck.title}</h3>
					<p>
						Duration: <span>{deck.duration}</span> minutes
					</p>
					<div className='progress-bar'>
						<div style={{ width: `${finish ? finish / number : '5px'}` }}></div>
						<span>
							{finish} / {number}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
