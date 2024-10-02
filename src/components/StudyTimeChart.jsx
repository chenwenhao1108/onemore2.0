import React from 'react'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

const StudyTimeChart = ({ studyTimes }) => {
	const labels = [
		'Today',
		'Day 2',
		'Day 3',
		'Day 4',
		'Day 5',
		'Day 6',
		'Day 7',
	].reverse()

	const data = {
		labels,
		datasets: [
			{
				label: 'Study Time (minutes)',
				data: studyTimes,
				borderColor: 'rgba(75, 192, 192, 1)',
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderWidth: 2,
				fill: true,
			},
		],
	}
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'User Study Time in the Last 7 Days',
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Minutes',
				},
			},
			x: {
				title: {
					display: true,
					text: 'Days',
				},
			},
		},
	}

	return (
		<div className='chart'>
			<Line data={data} options={options} />
		</div>
	)
}

export default StudyTimeChart
