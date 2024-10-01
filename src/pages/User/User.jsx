import './styles.scss'

import React, { useState } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { useUserContext } from '../../context/UserContextProvider'
import { Link } from 'react-router-dom'

export default function User() {
	const { theme, toggleTheme } = useTheme()
	const { logout, user } = useUserContext()

	return (
		<>
			<div>
				<img src={user.avatar} className='avatar' />
			</div>
			<h3 className='username'>{user.username}</h3>
			<div className='settings'>
				<Link to='/user/center' className='user-center setting-item'>
					<i className='fa-solid fa-user user-icon'></i>

					<p>User center</p>
					<i className='fa-solid fa-chevron-right'></i>
				</Link>
				<hr></hr>
				<div className='theme-setting setting-item'>
					<i className='fa-solid fa-sun'></i>
					<p>Theme</p>
					<div className='theme-button' onClick={toggleTheme}>
						<div
							className={`slider ${theme === 'light' ? 'slide-back' : 'slide'}`}
						></div>
					</div>
				</div>
			</div>
			<button className='log-out-button' onClick={logout}>
				Log Out
			</button>
		</>
	)
}
