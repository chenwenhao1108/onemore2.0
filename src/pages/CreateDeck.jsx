import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecksContext } from '../context/DecksContextProvider.jsx'
import { useLocation } from 'react-router-dom'

export default function CreateDeck() {
	const [title, setTitle] = useState('')
	const [tagText, setTagText] = useState('')
	const [tagColor, setTagColor] = useState('')
	const [tags, setTags] = useState([])
	const [colorIndex, setColorIndex] = useState()
	const [imgUrl, setImgUrl] = useState('')
	const [upload, setUpload] = useState(false)
	const [deck, setDeck] = useState(null)
	const [disableButton, setDisableButton] = useState(true)
	const location = useLocation()
	const state = location.state

	const { createDeck, updateDeck } = useDecksContext()

	const covers = [
		'/pics/cafe.png',
		'/pics/girl with a pearl earring.png',
		'/pics/sleeping lily.png',
		'/pics/sunflower.png',
		'/pics/sunrise.png',
		'/pics/The Starry Night.png',
	]

	function addTag(e) {
		setTags((p) => {
			return [...p, { text: tagText, color: tagColor }]
		})
		setTagText('')
	}

	useEffect(() => {
		if (state) {
			setImgUrl(state.cover)
			setTitle(state.title)
			setTags(state.tags)
		}
	}, [])

	useEffect(() => {
		setDeck({
			title,
			duration: 0,
			cover: imgUrl,
			tags,
			number: 0,
			finish: 0,
		})
		if (title && imgUrl) {
			setDisableButton(false)
		}
	}, [title, imgUrl, tags])

	return (
		<>
			<div className='create-header'>
				<Link to='/'>⬅back</Link>
				<h2>Create new deck</h2>
				<button
					disabled={disableButton}
					onClick={() => {
						if (state) {
							updateDeck(state.deckId, deck)
						} else {
							createDeck(deck)
						}
					}}
				>
					Create
				</button>
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
							onClick={() => setImgUrl(src)}
						>
							<img className='cover' src={src} />
							{imgUrl === src && (
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
