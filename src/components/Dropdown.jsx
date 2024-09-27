import React, { useEffect, useState } from 'react'

export default function Dropdown({ menu, icon, title, defaultLink, select }) {
	const [open, setOpen] = useState(false)

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
				<>
					<div className='menu-dropdown'>
						{menu.map((item, index) => {
							return (
								<>
									<div
										key={index}
										className='menu-item'
										onClick={() => select(index)}
									>
										{item}
									</div>
									<hr></hr>
								</>
							)
						})}
						{defaultLink && <div className='menu-item'>{defaultLink}</div>}
					</div>
				</>
			)}
		</div>
	)
}
