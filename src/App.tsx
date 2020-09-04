import React, {useState} from 'react'
import Header from './components/Header'
import Field from './components/Field'
import CellInfo, {CellType, Coordinates} from './interfaces/interfaces'
import {searchPath} from './search-logic/main'
import {ROWS_AMOUNT, COLUMNS_AMOUNT} from './parameters'



let data: Array<CellInfo[]> = [];

for (let r = 0; r < ROWS_AMOUNT; r++) {
	data[r] = []
	for (let c = 0; c < COLUMNS_AMOUNT; c++) {
		data[r][c] = {
			coordinates: {
				row: r,
				column: c
			},
			state: null,
			explored: false,
			path: false
		}
	}
}


const App: React.FC = () => {
	const [cellState, setCellState]: [CellType, React.Dispatch<React.SetStateAction<CellType>>] = useState<CellType>('border')
	const [grid, setGrid]: [Array<CellInfo[]>, React.Dispatch<React.SetStateAction< Array<CellInfo[]> >>] = useState(data)
	const [startPoint, setStartPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	const [endPoint, setEndPoint]: [Coordinates | null, React.Dispatch<React.SetStateAction<Coordinates | null>>] = useState<Coordinates | null>(null)
	
	const changeColor = (row: number, column: number): void => {
		setGrid(prev => {
			const newState = [...prev]
			const clickedCell = newState[row][column]
			switch (cellState) {
				case 'start':
					if (startPoint) {
						newState[startPoint.row][startPoint.column].state = null
					}
					setStartPoint({row, column})
					if (endPoint && row === endPoint.row && column === endPoint.column) {
						setEndPoint(null)
					}
					break
				case 'end':
					if (endPoint) {
						newState[endPoint.row][endPoint.column].state = null
					}
					setEndPoint({row, column})
					if (startPoint && row === startPoint.row && column === startPoint.column) {
						setStartPoint(null)
					}
					break
				case 'border':
					if (startPoint && row === startPoint.row && column === startPoint.column) {
						setStartPoint(null)
					} else if (endPoint && row === endPoint.row && column === endPoint.column) {
						setEndPoint(null)
					} 
			}
			clickedCell.state = cellState
			return newState
		})
	}

	const startSearch = (searchType: string) => {
		return async function() {
			if (!(startPoint && endPoint)) throw new Error("There's no start or end point")

			setGrid( prev => prev.map(row => row.map(column => {
												column.path = false
												column.explored = false
												return column
											 })
							 )
			)

			try {
				for await (let value of searchPath(grid, searchType, startPoint, endPoint)){
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
	}

	const cleanField = () => {
		setGrid(prev => prev.map(row => row.map(column => {
											column.state = null
											column.explored = false
											column.path = false
											return column
										})
						)
		)
	}

    return <>
        <Header handleRadio={setCellState} handleStart={startSearch} handleClean={cleanField} cellState={cellState} />
        <Field changeColor={changeColor} grid={grid}/>
    </>
}

export default App