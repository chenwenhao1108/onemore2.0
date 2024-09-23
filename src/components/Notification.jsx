import React, { useEffect, useState } from 'react'

export default function Notification({ status, message, onClose }) {
	const [fadingOut, setFadingOut] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setFadingOut(true)
		}, 2000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div
			className={`notification ${status} ${fadingOut && 'fade-out'}`}
			onAnimationEnd={onClose}
		>
			<p>{message}</p>
		</div>
	)
}
