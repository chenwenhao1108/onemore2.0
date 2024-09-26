import React from 'react'
import { Outlet } from 'react-router-dom'
import CreateCardHeader from '../../components/createCard/CreateCardHeader'
import { EditorContextProvider } from '../../context/EditorContextProvider'

export default function CreateCardLayout() {
	return (
		<EditorContextProvider>
			<div className='create-card-page'>
				<CreateCardHeader />
				<Outlet />
			</div>
		</EditorContextProvider>
	)
}
