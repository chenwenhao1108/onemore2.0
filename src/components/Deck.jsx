import React from 'react'
import { Link } from 'react-router-dom'

export default function Deck({ deck, finish = 0, number = 0, id }) {
	return (
		<Link to={`deckDetail/${id}`}>
			<div className='deck'>
				<img src={deck.cover} className='deck-cover' />
				<div className='deck-info'>
					<h3>{deck.title}</h3>
					<div className='home-page-tags-container'>
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
						Duration: <span>{(deck.duration / 1000 / 60).toFixed(1)}</span>{' '}
						minutes
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
