import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<a href='/' className='site-logo'>
				<span>oneMore</span>
			</a>
			<a href='#'>
				<i className='fa-solid fa-magnifying-glass'></i>
			</a>
			<Link to='/create/deck'>New Deck</Link>
		</header>
	)
}
