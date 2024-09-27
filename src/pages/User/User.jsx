import './styles.scss'

import React, { useState } from 'react'

export default function User({ username = 'Kurt' }) {
	const [lightTheme, setLightTheme] = useState(true)
	console.log(lightTheme)
	return (
		<>
			<div>
				<img src='../src/pics/sunrise.png' className='avatar' />
			</div>
			<h3 className='username'>{username}</h3>
			<div className='settings'>
				<div className='user-center setting-item'>
					<i className='fa-solid fa-user user-icon'></i>

					<p>User center</p>
					<i class='fa-solid fa-chevron-right'></i>
				</div>
				<hr></hr>
				<div className='theme-setting setting-item'>
					<i className='fa-solid fa-sun'></i>
					<p>Theme</p>
					<div
						className='theme-button'
						onClick={() => setLightTheme(!lightTheme)}
					>
						<div
							className={`slider ${lightTheme ? 'slide-back' : 'slide'}`}
						></div>
					</div>
				</div>
			</div>
			<button className='log-out-button'>Log Out</button>
		</>
	)
}
