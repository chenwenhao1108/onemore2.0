import React, { useState } from 'react'

export default function NoteCard() {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')

	return (
		<div className='note-card'>
			<textarea
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='note-card-title'
				placeholder='Front: Title / Question'
			></textarea>

			<textarea
				value={summary}
				onChange={(e) => setSummary(e.target.value)}
				className='note-card-summary'
				placeholder='Back: Summary / Answer'
			></textarea>
		</div>
	)
}
