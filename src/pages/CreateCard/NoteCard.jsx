import React, { useState } from 'react'
import Editor from '../../components/editor/Editor'
import { useEditorContext } from '../../context/EditorContextProvider'

export default function NoteCard2() {
	const { setActiveEditor, setFront, setBack } = useEditorContext()
	return (
		<div className='note-page'>
			<Editor setActive={setActiveEditor} setType={setFront} focus />
			<hr></hr>
			<Editor setActive={setActiveEditor} setType={setBack} />
		</div>
	)
}
