import { Link } from 'react-router-dom'
import React from 'react'

export default function A404Page() {
	return (
		<div className='404page'>
			<h1>Nothing Found Here</h1>
			<hr></hr>
			<Link to='/'>Back To Home</Link>
		</div>
	)
}
