import React from 'react'
import { BubbleMenu } from '@tiptap/react'

export default function CustomBubbleMenu({ editor }) {
	return (
		<div>
			<BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
				<div className='bubble-menu'>
					<button
						onClick={() => editor.chain().focus().toggleBold().run()}
						className={editor.isActive('bold') ? 'is-active' : ''}
					>
						Bold
					</button>
					<button
						onClick={() => editor.chain().focus().toggleItalic().run()}
						className={editor.isActive('italic') ? 'is-active' : ''}
					>
						Italic
					</button>
					<button
						onClick={() => editor.chain().focus().toggleStrike().run()}
						className={editor.isActive('strike') ? 'is-active' : ''}
					>
						Strike
					</button>

					<button
						onClick={() => editor.chain().focus().setColor('#000000').run()}
						className={
							editor.isActive('textStyle', { color: '#000000' })
								? 'is-active'
								: ''
						}
					>
						<i className='fa-solid fa-circle'></i>
					</button>
					<button
						onClick={() => editor.chain().focus().setColor('#FFD43B').run()}
						className={
							editor.isActive('textStyle', { color: '#FFD43B' })
								? 'is-active'
								: ''
						}
					>
						<i className='fa-solid fa-circle' style={{ color: '#FFD43B' }}></i>
					</button>
					<button
						onClick={() => editor.chain().focus().setColor('#63E6BE').run()}
						className={
							editor.isActive('textStyle', { color: '#63E6BE' })
								? 'is-active'
								: ''
						}
					>
						<i className='fa-solid fa-circle' style={{ color: '#63E6BE' }}></i>
					</button>
					<button
						onClick={() => editor.chain().focus().setColor('#74C0FC').run()}
						className={
							editor.isActive('textStyle', { color: '#74C0FC' })
								? 'is-active'
								: ''
						}
					>
						<i className='fa-solid fa-circle' style={{ color: '#74C0FC' }}></i>
					</button>
					<button
						onClick={() => editor.chain().focus().setColor('#B197FC').run()}
						className={
							editor.isActive('textStyle', { color: '#B197FC' })
								? 'is-active'
								: ''
						}
					>
						<i className='fa-solid fa-circle' style={{ color: '#B197FC' }}></i>
					</button>
				</div>
			</BubbleMenu>
		</div>
	)
}
