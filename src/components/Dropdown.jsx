import React, { useEffect, useState } from 'react'

export default function Dropdown({
	menu,
	icon,
	title,
	defaultItem,
	className,
}) {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState(null)

	useEffect(() => {
		if (Array.isArray(menu)) {
			menu.forEach((item, index) => {
				if (item.selected) {
					setSelected(index)
				}
			})
		} else {
			console.error('menu is not an array:', menu)
		}
	}, [menu])

	return (
		<div className={`menu ${className}`} onClick={() => setOpen(!open)}>
			{open && (
				<div className='menu-close' onClick={() => setOpen(false)}></div>
			)}
			<button className='menu-button' onClick={() => setOpen(!open)}>
				{icon}
				{title}
			</button>
			{open && (
				<>
					<div className='menu-dropdown'>
						{menu.map((item, index) => {
							return (
								<div
									key={index}
									className='menu-item'
									style={selected === index ? { color: '#f07b3f' } : null}
									onClick={() => {
										item.select()
										setSelected(index)
									}}
								>
									{item?.icon ? <span>{item?.icon}</span> : null}
									<span>{item.title}</span>
								</div>
							)
						})}
						{defaultItem && (
							<div className='menu-item' onClick={defaultItem.select}>
								{defaultItem?.icon ? <span>{defaultItem?.icon}</span> : null}
								<span>{defaultItem.title}</span>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}
