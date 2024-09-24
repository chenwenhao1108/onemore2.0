import React, { useState } from 'react'

export default function CreateCardFooter() {
	const [bold, setBold] = useState(false)
	const [size, setSize] = useState(false)
	const [color, setColor] = useState(false)

	function toggleSize() {
		setSize(!size)
		setColor(false)
	}

	function toggleColor() {
		setSize(false)
		setColor(!color)
	}

	const fontSizeBar = (
		<div className='font-bar'>
			<button>S</button>
			<button>M</button>
			<button>L</button>
			<button className='font-bar-italic'>I</button>
			<button className='font-bar-underline'>U</button>
		</div>
	)
	const fontColorBar = (
		<div className='font-bar'>
			<button>
				<i className='fa-solid fa-circle'></i>
			</button>
			<button>
				<i class='fa-solid fa-circle' style={{ color: '#FFD43B' }}></i>
			</button>
			<button>
				<i class='fa-solid fa-circle' style={{ color: '#63E6BE' }}></i>
			</button>
			<button className='font-bar-italic'>
				<i class='fa-solid fa-circle' style={{ color: '#74C0FC' }}></i>
			</button>
			<button className='font-bar-underline'>
				<i class='fa-solid fa-circle' style={{ color: '#B197FC' }}></i>
			</button>
		</div>
	)

	return (
		<>
			<div className='create-card-footer'>
				{size && fontSizeBar}
				{color && fontColorBar}
				<button onClick={() => setBold(!bold)}>
					<i class='fa-solid fa-b' style={bold ? { color: '#FFD43B' } : {}}></i>
				</button>
				<button onClick={toggleSize}>
					{size ? (
						<i className='fa-solid fa-x' style={{ color: '#FFD43B' }}></i>
					) : (
						<i className='fa-solid fa-a'></i>
					)}
				</button>
				<button onClick={toggleColor}>
					<i className='fa-solid fa-circle'></i>
				</button>
				<button>
					<i className='fa-solid fa-image'></i>
				</button>
			</div>
		</>
	)
}
