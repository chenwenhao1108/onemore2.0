import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
	return (
		<footer>
			<div className='footer-nav'>
				<NavLink
					className={({ isActive }) => (isActive ? 'active-link' : '')}
					to='/'
				>
					Home
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? 'active-link' : '')}
					to='/create/note'
				>
					Add
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? 'active-link' : '')}
					to='user'
				>
					Me
				</NavLink>
			</div>
		</footer>
	)
}
