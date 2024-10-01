import React, { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

const NotificationContextProvider = ({ children }) => {
	const [notification, setNotification] = useState(null)

	return (
		<NotificationContext.Provider
			value={{
				notification,
				setNotification,
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
