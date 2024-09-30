import React, { useEffect } from 'react'
import { FloatingMenu } from '@tiptap/react'
import { useState } from 'react'
export default function CustomFloatingMenu({ editor }) {
	const [showMenu, setShowMenu] = useState(false)
	const [focused, setFocused] = useState(true)

	useEffect(() => {
		const onFocus = () => setFocused(true)
		const onBlur = () => setFocused(false)
		editor.on('focus', onFocus)
		editor.on('blur', onBlur)

		return () => {
			editor.off('focus', onFocus)
			editor.off('blur', onBlur)
		}
	}, [editor])
	return (
		<FloatingMenu
			editor={editor}
			tippyOptions={{
				duration: 100,
				followCursor: true,
				placement: 'top',
				flip: true,
				popperOptions: {
					modifiers: [
						{
							name: 'flip',
							options: {
								fallbackPlacements: ['bottom', 'left', 'right'],
							},
						},
						{
							name: 'preventOverflow',
							options: {
								padding: 10,
							},
						},
					],
				},
			}}
			shouldShow={({ state }) => {
				return state.selection.$cursor && focused
			}}
		>
			{showMenu ? (
				<div className='floating-menu'>
					<button
						onClick={() => {
							editor.view.dom.focus()
							setShowMenu(false)
						}}
					>
						<i className='fa-solid fa-minus'></i>
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 1 }).run()
						}
						className={
							editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
						}
					>
						H1
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 2 }).run()
						}
						className={
							editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
						}
					>
						H2
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 3 }).run()
						}
						className={
							editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
						}
					>
						H3
					</button>
					<button
						onClick={() =>
							editor.chain().focus().toggleHeading({ level: 4 }).run()
						}
						className={
							editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
						}
					>
						H4
					</button>
					<button
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={editor.isActive('bulletList') ? 'is-active' : ''}
					>
						BL
					</button>
					<button
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={editor.isActive('orderedList') ? 'is-active' : ''}
					>
						OL
					</button>
					<button
						onClick={() => editor.chain().focus().setHorizontalRule().run()}
					>
						——
					</button>

					<button
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						className={editor.isActive('blockquote') ? 'is-active' : ''}
					>
						<i className='fa-solid fa-quote-left'></i>
					</button>
					<button
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						className={editor.isActive('codeBlock') ? 'is-active' : ''}
					>
						<i className='fa-solid fa-code'></i>
					</button>
					<button onClick={() => editor.chain().focus().clearNodes().run()}>
						<i className='fa-solid fa-x'></i>
					</button>
				</div>
			) : (
				<button
					className='showMenu-button'
					onClick={() => {
						editor.view.dom.focus()
						setShowMenu(true)
					}}
				>
					<i className='fa-solid fa-plus'></i>
				</button>
			)}
		</FloatingMenu>
	)
}
