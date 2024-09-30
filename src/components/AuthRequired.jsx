import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContextProvider'
import { useEffect, useState } from 'react'

export default function AuthRequired() {
	const { user } = useUserContext()
	useEffect(() => console.log(user), [user])

	return user ? <Outlet /> : <Navigate to='/login' />
}
