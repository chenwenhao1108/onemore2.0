import './FrontCardStyles.scss'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

const FrontCard = ({ content }) => {
	const [htmlContent, setHtmlContent] = useState('')

	useEffect(() => {
		if (content) {
			setHtmlContent(content)
		}
	}, [content])

	const editor = useEditor({
		extensions: [StarterKit],
		content: htmlContent,
		editable: false,
	})

	useEffect(() => {
		if (htmlContent) {
			editor.commands.setContent(htmlContent, false)
		}
	}, [htmlContent, editor])

	return <EditorContent editor={editor} className='abstract-front-card' />
}

export default FrontCard
