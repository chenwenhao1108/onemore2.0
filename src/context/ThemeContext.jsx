import React, { createContext, useState, useContext, useEffect } from 'react'
import useUpdateEffect from '../hooks/useUpdateEffect'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light')

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
	}

	useEffect(() => {
		const localTheme = localStorage.getItem('theme')
		if (localTheme) {
			setTheme(localTheme)
		}
	}, [])

	useUpdateEffect(() => {
		localStorage.setItem('theme', theme)
	}, [theme])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
