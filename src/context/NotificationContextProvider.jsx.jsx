import React, { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

const NotificationContextProvider = ({ children }) => {
	const [message, setMessage] = useState(null)
	const [showNotification, setShowNotification] = useState(false)

	return (
		<NotificationContext.Provider
			value={{
				message,
				showNotification,
				setShowNotification,
				setMessage,
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}

const useNotificationContext = () => {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error(
			'NotificationContext must be used within a NotificationProvider!'
		)
	}
	return context
}

export { NotificationContextProvider, useNotificationContext }
