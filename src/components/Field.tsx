import React, {useState} from 'react'
import Cell from './Cell'
import CellInfo from '../interfaces/interfaces'


// let data: Array<CellInfo[]> = [];

// for (let r = 0; r < 10; r++) {
// 	data[r] = []
// 	for (let c = 0; c < 10; c++) {
// 		data[r][c] = {
// 			coordinates: {
// 				row: r,
// 				column: c
// 			},
// 			state: null,
// 			explored: false
// 		}
// 	}
// }

const Field: React.FC<{changeColor: (row: number, column: number) => void, grid: Array<CellInfo[]>}> = ({changeColor, grid}) => {
	// const [grid, setGrid]: [Array<CellInfo[]>, React.Dispatch<React.SetStateAction< Array<CellInfo[]> >>] = useState(data)
	// const [startPoint, setStartPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	// const [endPoint, setEndPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	const [mouseDowned, setMouseDowned] = useState(false)

	// const changeColor = (row: number, column: number): void => {
	// 	setGrid(prev => {
	// 		const newState = [...prev]
	// 		const clickedCell = newState[row][column]
	// 		switch (cellState) {
	// 			case 'start':
	// 				if (startPoint) {
	// 					newState[startPoint.row][startPoint.column].state = null
	// 				}
	// 				setStartPoint({row, column})
	// 				if (endPoint && row === endPoint.row && column === endPoint.column) {
	// 					setEndPoint(null)
	// 				}
	// 				break
	// 			case 'end':
	// 				if (endPoint) {
	// 					newState[endPoint.row][endPoint.column].state = null
	// 				}
	// 				setEndPoint({row, column})
	// 				if (startPoint && row === startPoint.row && column === startPoint.column) {
	// 					setStartPoint(null)
	// 				}
	// 				break
	// 			case 'border':
	// 				if (startPoint && row === startPoint.row && column === startPoint.column) {
	// 					setStartPoint(null)
	// 				} else if (endPoint && row === endPoint.row && column === endPoint.column) {
	// 					setEndPoint(null)
	// 				} 
	// 		}
	// 		clickedCell.state = cellState
	// 		return newState
	// 	})
	// }

	const handleMouseDown = (row: number, column: number): void => {
		setMouseDowned(true)
		changeColor(row, column)
	}
	const handleMouseUp = (): void => {
		setMouseDowned(false)
	}

	

	const renderedGrid = grid.map((row, index) => (
		<div key={index} className="grid-row">
			{ row.map((cell, index) => <Cell 
											key={index}
											info={cell}
											mouseDowned={mouseDowned}
											handleClick={changeColor}
											handleMouseUp={handleMouseUp}
											handleMouseDown={handleMouseDown}
										/>) }
		</div>
	))

    return (
    	<section className="grid">
			{renderedGrid}
		</section>
	)
}

export default Field