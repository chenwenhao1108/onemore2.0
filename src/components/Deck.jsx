import React from 'react'

export default function Deck({
	title,
	cover = 'src/pics/cafe.png',
	duration = 0,
}) {
	return (
		<div className='deck'>
			<img src={cover} className='deck-cover' />
			<div className='deck-info'>
				<h4>{title}</h4>
				<p>Duration: {duration} minutes</p>
				<p>progress bar</p>
			</div>
		</div>
	)
}
