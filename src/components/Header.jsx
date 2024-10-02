import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<a href='/' className='site-logo'>
				<span>oneMore</span>
			</a>
			<Link to='/create/deck'>New Deck</Link>
		</header>
	)
}
