import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Notification from '../components/Notification'
import { DecksContext } from '../App'

export default function CreateDeck() {
	const [title, setTitle] = useState('')
	const [coverIndex, setCoverIndex] = useState(null)
	const [showNotification, setShowNotification] = useState(false)
	const [message, setMessage] = useState({})

	const { decks, setDecks } = useContext(DecksContext)

	const covers = [
		'../src/pics/cafe.png',
		'../src/pics/girl with a pearl earring.png',
		'../src/pics/sleeping lily.png',
		'../src/pics/sunflower.png',
		'../src/pics/sunrise.png',
		'../src/pics/The Starry Night.png',
	]

	function choseCover(index) {
		setCoverIndex(index)
	}

	function createDeck() {
		if (!title) {
			setShowNotification(true)
			setMessage({
				message: "Title can't be empty!",
				status: 'error',
			})
			return
		}
		if (!coverIndex && coverIndex !== 0) {
			setShowNotification(true)
			setMessage({
				message: "Cover can't be empty!",
				status: 'error',
			})
			return
		}
		if (!decks) {
			setDecks([
				{
					title,
					cover: covers[coverIndex],
					duration: 0,
				},
			])
		} else {
			const titles = decks.map((deck) => deck.title)
			if (titles.includes(title)) {
				setShowNotification(true)
				setMessage({
					message: 'Title already exists!',
					status: 'error',
				})
			} else {
				setDecks((preDecks) => [
					...preDecks,
					{
						title,
						duration: 0,
						cover: covers[coverIndex],
					},
				])
				setShowNotification(true)
				setMessage({
					message: 'Deck is created!',
					status: 'success',
				})
			}
		}
	}

	return (
		<>
			{showNotification && (
				<Notification
					status={message.status}
					message={message.message}
					onClose={() => setShowNotification(false)}
				/>
			)}
			<div className='create-header'>
				<Link to='/'>⬅back</Link>
				<h2>Create new deck</h2>
				<a href='#' onClick={createDeck}>
					Create
				</a>
			</div>

			<input
				className='deck-title-input'
				placeholder='Input your deck title here'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			></input>
			<div className='cover-container'>
				<p>Select / Upload cover</p>
				<div className='add-cover'>
					<i className='fa-solid fa-plus'></i>
				</div>
				{covers.map((src, index) => {
					return (
						<div
							key={index}
							className='cover-frame'
							onClick={(e) => choseCover(index)}
						>
							<img className='cover' src={src} />
							{coverIndex === index && (
								<span className='checkmark'>
									<i className='fa-solid fa-circle-check'></i>
								</span>
							)}
						</div>
					)
				})}
			</div>
		</>
	)
}
