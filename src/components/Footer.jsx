import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
	const [open, setOpen] = useState(false)

	const menuElement = (
		<div className='create-menu' onClick={() => setOpen(false)}>
			<div onClick={() => setOpen(false)}></div>
			<Link to='/createDeck'>Create Deck</Link>
			<Link to='/createCard'>Create Card</Link>
		</div>
	)
	return (
		<footer>
			{open ? menuElement : null}
			<div className='footer-nav'>
				<Link to='/' onClick={() => setOpen(false)}>
					Home
				</Link>
				<a href='#' onClick={() => setOpen(!open)}>
					Create
				</a>
				<Link to='user' onClick={() => setOpen(false)}>
					Me
				</Link>
			</div>
		</footer>
	)
}
