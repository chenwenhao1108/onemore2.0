import React, { useEffect, useState } from 'react'
import { useNotificationContext } from '../context/NotificationContextProvider.jsx'

export default function Notification() {
	const [slideUp, setSlideUp] = useState(false)
	const { notification, setNotification } = useNotificationContext()

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setSlideUp(true)
			}, 2500)
			return () => clearTimeout(timer)
		}
	}, [notification])

	return (
		notification && (
			<div
				className={`notification ${notification.status} ${
					slideUp && 'slide-up'
				}`}
				onAnimationEnd={(e) => {
					if (e.animationName === 'slide-up') {
						setNotification(null)
						setSlideUp(false)
					}
				}}
			>
				<p>{notification.message}</p>
			</div>
		)
	)
}
