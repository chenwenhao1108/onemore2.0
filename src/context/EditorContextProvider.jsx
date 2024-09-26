import React, { createContext, useContext, useState } from 'react'

const EditorContext = createContext()

const EditorContextProvider = ({ children }) => {
	const [activeEditor, setActiveEditor] = useState(null)
	const [front, setFront] = useState(null)
	const [back, setBack] = useState(null)

	return (
		<EditorContext.Provider
			value={{ activeEditor, setActiveEditor, front, setFront, back, setBack }}
		>
			{children}
		</EditorContext.Provider>
	)
}

const useEditorContext = () => {
	const context = useContext(EditorContext)
	if (!context) {
		throw new Error('useEditorContext must be used within a EditorProvider')
	}
	return context
}

export { EditorContextProvider, useEditorContext }
