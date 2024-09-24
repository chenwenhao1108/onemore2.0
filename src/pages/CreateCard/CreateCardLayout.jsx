import React, { useContext, useEffect, useState } from 'react'
import { DecksContext } from '../../App'
import { Outlet } from 'react-router-dom'
import CreateCardHeader from '../../components/CreateCardHeader'
import CreateCardFooter from '../../components/CreateCardFooter'

export default function CreateCard() {
	return (
		<div className='create-card-page'>
			<CreateCardHeader />
			<Outlet />
			<CreateCardFooter />
		</div>
	)
}
