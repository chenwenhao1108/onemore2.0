import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
	return (
		<header>
			<a href='/' className='site-logo'>
				oneMore
			</a>
			<a href='#'>Search</a>
			<a href='#'>User</a>
		</header>
	)
}
