import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown({
	menu = ['1', '2', '3'],
	icon = null,
	select,
}) {
	const [open, setOpen] = useState(false)
	const [title, setTitle] = useState('')
	useEffect(() => {
		setTitle(menu[0])
	}, [menu])
	return (
		<div className='menu' onClick={() => setOpen(!open)}>
			{open && (
				<div className='menu-close' onClick={() => setOpen(false)}></div>
			)}
			<button className='menu-button' onClick={() => setOpen(!open)}>
				{icon}
				{title}
			</button>
			{open && (
				<div className='menu-dropdown'>
					{menu.map((item, index) => {
						return (
							<button
								key={index}
								className='menu-item'
								onClick={() => setTitle(item)}
							>
								{item}
							</button>
						)
					})}
				</div>
			)}
		</div>
	)
}
