import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Footer from './Footer'
import Notification from './Notification'

export default function Layout() {
	return (
		<>
			<Notification />
			<Outlet />
			<Footer />
		</>
	)
}
