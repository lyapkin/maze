import React/*, {useState}*/ from 'react'
import Header from './features/header/Header'
import Field from './features/search/Field'
// import CellInfo, {CellType, Coordinates} from './interfaces/interfaces'
// import {searchPath} from './search-logic/main'
// import {ROWS_AMOUNT, COLUMNS_AMOUNT} from './parameters'



// let data: Array<CellInfo[]> = [];

// for (let r = 0; r < ROWS_AMOUNT; r++) {
// 	data[r] = []
// 	for (let c = 0; c < COLUMNS_AMOUNT; c++) {
// 		data[r][c] = {
// 			coordinates: {
// 				row: r,
// 				column: c
// 			},
// 			state: null,
// 			explored: false,
// 			path: false
// 		}
// 	}
// }


const App: React.FC = () => {
	// const [cellState, setCellState]: [CellType, React.Dispatch<React.SetStateAction<CellType>>] = useState<CellType>('border')
	// const [grid, setGrid]: [Array<CellInfo[]>, React.Dispatch<React.SetStateAction< Array<CellInfo[]> >>] = useState(data)
	// const [startPoint, setStartPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	// const [endPoint, setEndPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	
	// Change cell color drawing 'start', 'end', 'border' 
	/*const changeColor = (row: number, column: number): void => {
		setGrid(prev => {
			const newState = [...prev]
			const clickedCell = newState[row][column]
			switch (cellState) {
				case 'start':
					// Remove 'start' from the previous start cell
					if (startPoint) {
						newState[startPoint.row][startPoint.column].state = null
					}
					setStartPoint({row, column})
					// Remove 'end' if the current cell has been set as 'end'
					if (endPoint && row === endPoint.row && column === endPoint.column) {
						setEndPoint(null)
					}
					break
				case 'end':
					// Remove 'end' from the previous end cell
					if (endPoint) {
						newState[endPoint.row][endPoint.column].state = null
					}
					setEndPoint({row, column})
					// Remove 'start' if the current cell has been set as 'start'
					if (startPoint && row === startPoint.row && column === startPoint.column) {
						setStartPoint(null)
					}
					break
				case 'border':
					// Remove 'start' or 'end' if the current cell has been set as 'start' or 'end'
					if (startPoint && row === startPoint.row && column === startPoint.column) {
						setStartPoint(null)
					} else if (endPoint && row === endPoint.row && column === endPoint.column) {
						setEndPoint(null)
					} 
			}
			// Set the current cell state to a value of what we draw ('start', 'end' or border).
			// The setting 'cellState' button is located in the 'Header' component
			clickedCell.state = cellState
			return newState
		})
	}*/

	/*const startSearch = (searchType: string) => {
		return async function() {
			if (!(startPoint && endPoint)) throw new Error("There's no start or end point")

			// Clean up the field from the previous search
			setGrid( prev => prev.map(row => row.map(column => {
												column.path = false
												column.explored = false
												return column
											 })
							 )
			)

			try {
				// Handle search. The 'searchPath' function locates in 'search-logic/main'
				// The function return a coordinates of a cell that is explored or
				// an array of coordinates with a path in the end
				for await (let value of searchPath(grid, searchType, startPoint, endPoint)) {
					// Draw a path from 'start' to 'end'
					if (Array.isArray(value)) {
						value.forEach(item => {
							setGrid(prev => {
								const newState = [...prev]
								newState[item.row][item.column].path = true
								return newState
							})
						})
						break
					}
					// Mark a cell as explored painting it out
					setGrid(prev => {
						const newState = [...prev]
						const cor = value as Coordinates
						newState[cor.row][cor.column].explored = true
						return newState
					})
				}
			} catch(e) {
				console.log(e)
			}
		}
	}*/
	
	// Reset the field
	/*const cleanField = () => {
		setGrid(prev => prev.map(row => row.map(column => {
											column.state = null
											column.explored = false
											column.path = false
											return column
										})
						)
		)
	}*/

    return <>
        <Header
        	// handleStart={startSearch}
        	// handleClean={cleanField}
        />
        <Field /*changeColor={changeColor} grid={grid}*//>
    </>
}

export default App