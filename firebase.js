// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCWdYd0BLsO-jAtGqTjCQA8hSktIXrf7IE',
	authDomain: 'onemore2-acfd8.firebaseapp.com',
	projectId: 'onemore2-acfd8',
	storageBucket: 'onemore2-acfd8.appspot.com',
	messagingSenderId: '372847410429',
	appId: '1:372847410429:web:f079860010ea37d2681294',
	measurementId: 'G-1ZY3C2J925',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db }
