import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContextProvider'

export default function Register() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { register } = useUserContext()

	return (
		<div className='login-form'>
			<h1>Register</h1>
			<img src='/pics/cat.jpg'></img>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			></input>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			></input>
			<input
				type='password'
				placeholder='PassWord'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			></input>
			<button onClick={() => register(username, email, password)}>
				Register
			</button>
			<Link to='/login'>Login</Link>
		</div>
	)
}
