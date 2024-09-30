import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/UserContextProvider'

export default function LogInPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { login } = useUserContext()

	return (
		<div className='login-form'>
			<h1>Please login first</h1>
			<img src='/src/pics/cat.jpg'></img>
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
			<button onClick={() => login(email, password)}>Login</button>
			<Link to='/register'>Register</Link>
		</div>
	)
}
