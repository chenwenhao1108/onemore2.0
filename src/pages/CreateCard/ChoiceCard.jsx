import React from 'react'

export default function ChoiceCard() {
	return (
		<>
			<input placeholder='Input your question here~'></input>
			<label>
				<input type='checkbox' name='correct-answer' value='A'></input>
				apple
			</label>
			<button>Click to add answer</button>
			<label>
				<input type='checkbox' name='correct-answer'></input>
				orange
			</label>
		</>
	)
}
