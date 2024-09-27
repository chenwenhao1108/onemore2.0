import React from 'react'
import Editor from '../../components/editor/Editor'
import { useEditorContext } from '../../context/EditorContextProvider'

export default function NoteCard() {
	const { setActiveEditor, setFront, setBack } = useEditorContext()
	return (
		<div className='note-page'>
			<Editor
				setActive={setActiveEditor}
				setType={setFront}
				focus
				placeholder='Here is the front of your card'
			/>
			<hr></hr>
			<Editor
				setActive={setActiveEditor}
				setType={setBack}
				placeholder='Here is the back of your card'
			/>
		</div>
	)
}
