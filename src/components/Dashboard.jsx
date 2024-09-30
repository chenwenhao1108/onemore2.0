import React, { useEffect } from 'react'
import { useDecksContext } from '../context/DecksContextProvider'
import { useUserContext } from '../context/UserContextProvider'

export default function Dashboard() {
	const { decks } = useDecksContext()
	const { user } = useUserContext()

	useEffect(() => {}, [user])

	return (
		<div className='dashboard'>
			<div className='dashboard-card'>Learning Duration:</div>
			<div className='dashboard-card'>Click To CheckIn</div>
			<div className='dashboard-card'>Mastered Cards:</div>
		</div>
	)
}
