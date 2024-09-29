import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'
import { DecksContext } from '../App'
import { v4 } from 'uuid'
import { useNotificationContext } from '../context/NotificationContextProvider.jsx'

export default function CreateDeck() {
	const [title, setTitle] = useState('')
	const [coverIndex, setCoverIndex] = useState(null)
	const [tagText, setTagText] = useState('')
	const [tagColor, setTagColor] = useState('')
	const [tags, setTags] = useState([])
	const [colorIndex, setColorIndex] = useState()
	const [imgUrl, setImgUrl] = useState('')
	const [upload, setUpload] = useState(false)

	const { decks, setDecks } = useContext(DecksContext)

	const navigate = useNavigate()

	const covers = [
		'../src/pics/cafe.png',
		'../src/pics/girl with a pearl earring.png',
		'../src/pics/sleeping lily.png',
		'../src/pics/sunflower.png',
		'../src/pics/sunrise.png',
		'../src/pics/The Starry Night.png',
	]

	const id = v4()

	const { showNotification, setShowNotification, message, setMessage } =
		useNotificationContext()

	function addTag(e) {
		setTags((p) => {
			return [...p, { text: tagText, color: tagColor }]
		})
		setTagText('')
	}

	function choseCover(index) {
		setCoverIndex(index)
		setImgUrl(covers[index])
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
		if (!imgUrl) {
			setShowNotification(true)
			setMessage({
				message: "Cover can't be empty!",
				status: 'error',
			})
			return
		}
		if (!decks) {
			return
		} else {
			const titles = decks.map((deck) => deck?.title)
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
						id,
						title,
						duration: 0,
						cover: imgUrl,
						tags,
						number: 0,
						finish: 0,
						cards: [],
					},
				])
				setShowNotification(true)
				setMessage({
					message: 'Deck is created!',
					status: 'success',
				})
				navigate('/create/note', { state: { deckId: id } })
			}
		}
	}

	return (
		<>
			<div className='create-header'>
				<Link to='/'>⬅back</Link>
				<h2>Create new deck</h2>
				<a href='#' onClick={createDeck}>
					Create
				</a>
			</div>

			<input
				className='deck-title-input'
				placeholder="Here is your deck's title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			></input>
			<div className='deck-tag-setting'>
				<input
					className='deck-tag-input'
					placeholder='Add a tag'
					value={tagText}
					onChange={(e) => setTagText(e.target.value)}
				></input>
				<div
					className='deck-tag-color-button-container'
					onClick={(e) => setTagColor(e.target.style.color)}
				>
					{['#FFD43B', '#63E6BE', '#74C0FC', '#B197FC', '#bad7df'].map(
						(color, index) => (
							<i
								key={index}
								className={`tag-color-button fa-solid fa-circle ${
									colorIndex === index ? 'selected-color' : ''
								}`}
								onClick={() => setColorIndex(index)}
								style={{ color }}
							></i>
						)
					)}
				</div>
				<button className='add-deck-tag-button' onClick={addTag}>
					Add
				</button>
			</div>
			<div className='tags-container'>
				{tags.map((tag, index) => {
					return (
						<div
							key={index}
							className='tag'
							style={{ backgroundColor: tag.color }}
							onClick={() => {
								// delete tag
								setTags((preT) => preT.filter((t) => t.color !== tag.color))
							}}
						>
							{tag.text}
						</div>
					)
				})}
			</div>

			<div className='cover-container'>
				{upload ? (
					<>
						<div className='upload-image-container'>
							<input
								placeholder='Image URL'
								value={imgUrl}
								onChange={(e) => setImgUrl(e.target.value)}
							></input>
							<button onClick={() => setUpload(false)}>Confirm</button>
							<button
								onClick={() => {
									setImgUrl('')
									setUpload(false)
								}}
							>
								Cancel
							</button>
						</div>
						<div
							className='close-margin'
							onClick={() => setUpload(false)}
						></div>
					</>
				) : null}
				<p>Select / Upload cover</p>
				<div className='add-cover' onClick={() => setUpload(true)}>
					<i className='fa-solid fa-plus'></i>
				</div>

				{covers.map((src, index) => {
					return (
						<div
							key={index}
							className='cover-frame'
							onClick={() => choseCover(index)}
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
