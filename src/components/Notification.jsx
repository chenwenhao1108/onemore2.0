import React, { useEffect, useState } from 'react'
import { useNotificationContext } from '../context/NotificationContextProvider.jsx'

export default function Notification() {
	const [slideUp, setSlideUp] = useState(false)
	const { showNotification, setShowNotification, message } =
		useNotificationContext()

	useEffect(() => {
		if (showNotification) {
			const timer = setTimeout(() => {
				setSlideUp(true)
			}, 2500)
			return () => clearTimeout(timer)
		}
	}, [showNotification])

	return (
		showNotification && (
			<div
				className={`notification ${message.status} ${slideUp && 'slide-up'}`}
				onAnimationEnd={(e) => {
					if (e.animationName === 'slide-up') {
						setShowNotification(false)
						setSlideUp(false)
					}
				}}
			>
				<p>{message.message}</p>
			</div>
		)
	)
}
