import { useEffect, useRef, useState } from 'react'

export default function useUpdateEffect(callback, deps) {
	const firstRender = useRef(true)
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false
		} else {
			callback()
		}
	}, deps)
}
