import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContextProvider'

export default function UserCenter() {
	const { user, updateUserMessage } = useUserContext()
	const [uploadAvatar, setUploadAvatar] = useState(false)
	const [uploadUsername, setUploadUsername] = useState(false)
	const [newAvatar, setNewAvatar] = useState('')
	const [newUsername, setNewUsername] = useState('')

	return (
		<div className='user-center-page'>
			<div className='user-center-header'>
				<Link to='/user'>Back</Link>
			</div>
			<div className='settings'>
				<div className='setting-item' onClick={() => setUploadAvatar(true)}>
					<span>My Avatar</span>
					<div>
						<img src={user.avatar} className='user-center-avatar' />
						<i className='fa-solid fa-chevron-right'></i>
					</div>
				</div>
				<hr></hr>
				<div className='setting-item' onClick={() => setUploadUsername(true)}>
					<span>My Username</span>
					<div>
						<span>{user.username}</span>
						<i className='fa-solid fa-chevron-right'></i>
					</div>
				</div>
			</div>
			{uploadAvatar && (
				<div className='change-avatar'>
					<input
						placeholder='Image URL'
						value={newAvatar}
						onChange={(e) => setNewAvatar(e.target.value)}
					></input>
					<button onClick={() => setUploadAvatar(false)}>Cancel</button>
					<button
						onClick={() => {
							updateUserMessage({ avatar: newAvatar })
							setUploadAvatar(false)
						}}
					>
						Confirm
					</button>
				</div>
			)}
			{uploadUsername && (
				<div className='change-avatar'>
					<input
						placeholder='Username'
						value={newUsername}
						onChange={(e) => setNewUsername(e.target.value)}
					></input>
					<button onClick={() => setUploadUsername(false)}>Cancel</button>
					<button
						onClick={() => {
							updateUserMessage({ username: newUsername })
							setUploadUsername(false)
						}}
					>
						Confirm
					</button>
				</div>
			)}
			{(uploadAvatar || uploadUsername) && (
				<div
					className='close-margin'
					onClick={() => {
						setUploadAvatar(false)
						setUploadUsername(false)
					}}
				></div>
			)}
		</div>
	)
}
