import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function CreateDeck() {
	const [title, setTitle] = useState('')

	function handleChange(e) {
		setTitle(e.target.value)
	}

	return (
		<>
			<div className='create-header'>
				<Link to='/'>⬅back</Link>
				<h2>Create new deck</h2>
				<a href='#'>Create</a>
			</div>

			<input
				className='deck-title-input'
				placeholder='Input your deck title here'
				value={title}
				onChange={(e) => handleChange(e)}
			></input>
			<div className='cover-container'>
				<p>Select / Upload cover</p>
				<div className='add-cover'>
					<i class='fa-solid fa-plus'></i>
				</div>
				<img className='cover' src='src/pics/cafe.png' />
				<img className='cover' src='src/pics/girl with a pearl earring.png' />
				<img className='cover' src='src/pics/sleeping lily.png' />
				<img className='cover' src='src/pics/sunflower.png' />
				<img className='cover' src='src/pics/sunrise.png' />
				<img className='cover' src='src/pics/The Starry Night.png' />
			</div>
		</>
	)
}
