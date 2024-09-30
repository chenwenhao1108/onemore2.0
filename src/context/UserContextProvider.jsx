import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	getAuth,
} from 'firebase/auth'
import { auth, db } from '../../firebase'
import { collection, setDoc, doc, getDoc } from 'firebase/firestore'
import { useNotificationContext } from './NotificationContextProvider.jsx'

const UserContext = createContext()

function UserContextProvider({ children }) {
	const [user, setUser] = useState(null)
	const { setShowNotification, setMessage } = useNotificationContext()
	const navigate = useNavigate()

	useEffect(() => console.log(user), [user])

	const register = async (username, email, password) => {
		if (!username) {
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: "Username can't be empty",
			})
			return
		}
		if (!email) {
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: "Email can't be empty",
			})
			return
		}
		if (!password) {
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: "Password can't be empty",
			})
			return
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const user = userCredential.user
			await saveUserToFireStore(user, username)
		} catch (error) {
			console.error(error.message)
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: `Error: ${error.message}`,
			})
		}
	}

	const saveUserToFireStore = async (user, username) => {
		const userDocRef = doc(collection(db, 'user'), user.uid)
		setDoc(userDocRef, {
			id: user.uid,
			username,
			avatar: '/pics/sunflower.png',
			decks: null,
			duration: 0,
			mastered: 0,
		})
	}

	const login = async (email, password) => {
		if (!email) {
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: "Email can't be empty",
			})
			return
		}
		if (!password) {
			setShowNotification(true)
			setMessage({
				status: 'error',
				message: "Password can't be empty",
			})
			return
		}
		try {
			await signInWithEmailAndPassword(auth, email, password)
		} catch (error) {
			console.error(error.message)
			setShowNotification(true)
			if (error.message.includes('invalid')) {
				setMessage({
					status: 'error',
					message: 'Invalid Credential',
				})
			}
		}
	}

	const logout = async () => {
		await signOut(auth)
		setUser(null)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				getDoc(doc(db, 'user', currentUser.uid))
					.then((snapshot) => {
						if (snapshot.exists) {
							const userData = snapshot.data()
							// console.log(userData)
							setUser(userData)
						} else {
							console.log('Error: snapshot dose not exist')
						}
					})
					.catch((error) => {
						console.error('Error getting document:', error)
					})
				setShowNotification(true)
				setMessage({
					status: 'success',
					message: 'Welcome',
				})
				navigate('/')
			}
		})
		return unsubscribe
	}, [])

	return (
		<UserContext.Provider
			value={{
				register,
				login,
				logout,
				user,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

const useUserContext = () => {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error(
			'NotificationContext must be used within a NotificationProvider!'
		)
	}
	return context
}
export { UserContextProvider, useUserContext }
