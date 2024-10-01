import { Outlet, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContextProvider'

export default function AuthRequired() {
	const { user } = useUserContext()

	return user ? <Outlet /> : <Navigate to='/login' />
}
