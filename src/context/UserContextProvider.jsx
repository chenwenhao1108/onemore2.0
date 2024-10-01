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
import { collection, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useNotificationContext } from './NotificationContextProvider.jsx'
import LoadingPage from '../pages/LoadingPage.jsx'

const UserContext = createContext()

function UserContextProvider({ children }) {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const { setNotification } = useNotificationContext()
	const navigate = useNavigate()

	const register = async (username, email, password) => {
		if (!username) {
			setNotification({
				status: 'error',
				message: "Username can't be empty",
			})
			return
		}
		if (!email) {
			setNotification({
				status: 'error',
				message: "Email can't be empty",
			})
			return
		}
		if (!password) {
			setNotification({
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
			setNotification({
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
			sevenDaysLearningTime: {},
		})
		const decksRef = collection(userDocRef, 'decks')
		const deckRef = doc(decksRef)
		setDoc(deckRef, {
			cover: '/pics/sunrise.png',
			duration: 0,
			tags: [
				{
					text: 'Web Developing',
					color: 'rgb(255, 212, 59)',
				},
				{
					text: 'JavaScript',
					color: 'rgb(116, 192, 252)',
				},
			],
			title: 'JavaScript',
		})
		const cardsRef = collection(deckRef, 'cards')
		const cardRef1 = doc(cardsRef)
		const cardRef2 = doc(cardsRef)
		setDoc(cardRef1, {
			back: '<h3>forEach：</h3><ul><li><p>Iterates through the elements in an array.</p></li><li><p>Executes a callback for each element.</p></li></ul><p>Does not return a value.</p><pre><code>const a = [1, 2, 3];const doubled = a.forEach((num, index) =&gt; {  // Do something with num and/or index.});// doubled = undefined</code></pre><h4>map:</h4><ul><li><p>Iterates through the elements in an array.</p></li><li><p>"Maps" each element to a new element by calling the function on each element, creating a new array as a result.</p><pre><code>const a = [1, 2, 3];const doubled = a.map((num) =&gt; {  return num * 2;});// doubled = [2, 4, 6]</code></pre></li></ul>',
			front:
				'<blockquote><h4><strong>Can you describe the main difference between a </strong><code>.forEach() </code><strong>loop and a </strong><code>.map()</code><strong> loop and why you would pick one versus the other?</strong></h4></blockquote>',
			correctTimes: 0,
			nextTime: new Date(),
		})
		setDoc(cardRef2, {
			back: `<p><span style="color: rgb(28, 30, 33)">A <strong>closure</strong> is the combination of a function and the lexical environment </span><span style="color: #FFD43B">within which that function was declared</span><span style="color: rgb(28, 30, 33)">. The word "lexical" refers to the fact that </span><span style="color: #63E6BE">lexical scoping uses the location where a variable is declared</span><span style="color: rgb(28, 30, 33)"> within the source code to determine where that variable is available. Closures are functions that have access to the outer (enclosing) function's variables—scope chain even after the outer function has returned.</span></p>`,
			front:
				'<h3><strong>What is a </strong><span style="color: #B197FC"><strong>closure</strong></span><strong>, and how/why would you use one?</strong></h3>',
			correctTimes: 0,
			nextTime: new Date(),
		})
	}

	const login = async (email, password) => {
		if (!email) {
			setNotification({
				status: 'error',
				message: "Email can't be empty",
			})
			return
		}
		if (!password) {
			setNotification({
				status: 'error',
				message: "Password can't be empty",
			})
			return
		}
		try {
			await signInWithEmailAndPassword(auth, email, password)
			console.log('log in')
		} catch (error) {
			console.error(error.message)
			setNotification({
				status: 'error',
				message: 'Invalid Credential',
			})
		}
	}

	const logout = async () => {
		await signOut(auth)
		setUser(null)
	}

	const updateUserMessage = async (newMessage) => {
		if (!newMessage) {
			setNotification({
				status: 'error',
				message: 'Can not be empty',
			})
			return
		}
		const userRef = doc(db, 'user', user.id)
		try {
			await updateDoc(userRef, newMessage)
			console.log('message updated')
			setNotification({
				status: 'success',
				message: 'User message updated',
			})
		} catch (error) {
			console.error(error.message)
			setNotification({
				status: 'error',
				message: error.message,
			})
		}
	}

	useEffect(() => {
		let isMounted = true
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				getDoc(doc(db, 'user', currentUser.uid))
					.then((snapshot) => {
						if (snapshot.exists) {
							const userData = snapshot.data()
							setUser(userData)
							setLoading(false)
							setNotification({
								status: 'success',
								message: 'Welcome',
							})
							navigate('/')
						} else {
							console.log('Error: snapshot dose not exist')
						}
					})
					.catch((error) => {
						console.error('Error getting document:', error)
					})
			} else {
				setLoading(false)
			}
		})
		return () => {
			isMounted = false
			unsubscribe()
		}
	}, [auth, db])

	return loading ? (
		<LoadingPage />
	) : (
		<UserContext.Provider
			value={{
				register,
				login,
				logout,
				updateUserMessage,
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
		throw new Error('UserContext must be used within a UserProvider!')
	}
	return context
}
export { UserContextProvider, useUserContext }
