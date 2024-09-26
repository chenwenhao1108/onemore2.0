import React, { useState, useContext } from 'react'
import Dropdown from '../Dropdown'
import { DecksContext } from '../../App'
import { Link } from 'react-router-dom'
import { useEditorContext } from '../../context/EditorContextProvider'

export default function CreateCardHeader() {
	const [typeArr, setTypeArr] = useState(['Note', 'Choice', 'Fill-in'])
	const { decks } = useContext(DecksContext)
	const { activeEditor: editor, front, back } = useEditorContext()

	if (!editor) {
		return (
			<div className='create-card-header'>
				<Dropdown
					menu={typeArr.map((type) => (
						<Link to={type}>{type}</Link>
					))}
					icon={<i className='fa-solid fa-bars'></i>}
				/>
				<Dropdown
					menu={decks.map((deck) => deck.title)}
					icon={<i className='fa-solid fa-pen'></i>}
				/>
			</div>
		)
	}

	const getEditorContentAsJSON = () => {
		console.log([front, back])
		if (front && back) {
			const json = {
				front: front.getJSON(),
				back: back.getJSON(),
			}
			console.log(json)
		}
	}

	return (
		<div className='create-card-header'>
			<Dropdown
				menu={typeArr.map((type) => (
					<Link to={type}>{type}</Link>
				))}
				icon={<i className='fa-solid fa-bars'></i>}
			/>
			<Dropdown
				menu={decks.map((deck) => deck.title)}
				icon={<i className='fa-solid fa-pen'></i>}
			/>
			<button className='save-button' onClick={getEditorContentAsJSON}>
				<i className='fa-solid fa-floppy-disk' style={{ color: '#FFD43B' }}></i>
			</button>
		</div>
	)
}
