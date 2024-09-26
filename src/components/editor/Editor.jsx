import './styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState, useRef } from 'react'

import CustomFloatingMenu from './FloatingMenu'
import CustomBubbleMenu from './BubbleMenu'

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextStyle.configure({ types: [ListItem.name] }),
	StarterKit.configure({
		bulletList: {
			keepMarks: true,
			keepAttributes: false,
		},
		orderedList: {
			keepMarks: true,
			keepAttributes: false,
		},
	}),
]

export default ({ setActive: setActiveEditor, setType, focus = false }) => {
	const editor = useEditor({
		extensions: extensions,
		content: '<p>Hello, World!</p>',
	})

	useEffect(() => {
		if (editor) {
			if (focus) {
				editor.commands.focus('end')
			}
			const handleFocus = () => {
				setActiveEditor(editor)
			}

			editor.on('focus', handleFocus)
			setType(editor)

			return () => {
				editor.off('focus', handleFocus)
			}
		}
	}, [editor])

	return (
		<>
			<div className='undo-redo-container'>
				<button
					onClick={() => editor.chain().focus().undo().run()}
					disabled={!editor.can().chain().focus().undo().run()}
					className='undo'
				>
					<i class='fa-solid fa-rotate-left'></i>
				</button>
				<button
					onClick={() => editor.chain().focus().redo().run()}
					disabled={!editor.can().chain().focus().redo().run()}
				>
					<i class='fa-solid fa-rotate-right'></i>
				</button>
			</div>
			{editor && <CustomBubbleMenu editor={editor} />}
			{<CustomFloatingMenu editor={editor} />}
			<EditorContent editor={editor} className='editor' />
		</>
	)
}
