import {createSlice} from '@reduxjs/toolkit'
import {Dispatch} from 'redux'
import {Field, Coordinates} from '../../interfaces/interfaces'
import {ROWS_AMOUNT, COLUMNS_AMOUNT} from '../../parameters'


const initialState: Field = {
	startPoint: null,
	endPoint: null,
	grid: []
}
for (let r = 0; r < ROWS_AMOUNT; r++) {
	initialState.grid[r] = []
	for (let c = 0; c < COLUMNS_AMOUNT; c++) {
		initialState.grid[r][c] = {
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


const searchSlice = createSlice({
	name: 'field',
	initialState,
	reducers: {
		markAsStart: (state, action) => {
			// Remove 'start' from the previous start cell
			if (state.startPoint) {
				state.grid[state.startPoint.row][state.startPoint.column].state = null
			}
			state.startPoint = {row: action.payload.coordinates.row, column: action.payload.coordinates.column}
			// Remove 'end' if the current cell has been set as 'end'
			if (state.endPoint && action.payload.coordinates.row === state.endPoint.row && action.payload.coordinates.column === state.endPoint.column) {
				state.endPoint = null
			}
			// Set the current cell state to a value of what we draw ('start', 'end' or border).
			// The setting 'cellState' button is located in the 'Header' component
			state.grid[action.payload.coordinates.row][action.payload.coordinates.column].state = action.payload.state
		},
		markAsEnd: (state, action) => {
			// Remove 'end' from the previous end cell
			if (state.endPoint) {
				state.grid[state.endPoint.row][state.endPoint.column].state = null
			}
			state.endPoint = {row: action.payload.coordinates.row, column: action.payload.coordinates.column}
			// Remove 'start' if the current cell has been set as 'start'
			if (state.startPoint && action.payload.coordinates.row === state.startPoint.row && action.payload.coordinates.column === state.startPoint.column) {
				state.startPoint = null
			}
			// Set the current cell state to a value of what we draw ('start', 'end' or border).
			// The setting 'cellState' button is located in the 'Header' component
			state.grid[action.payload.coordinates.row][action.payload.coordinates.column].state = action.payload.state
		},
		markAsBorder: (state, action) => {
			// Remove 'start' or 'end' if the current cell has been set as 'start' or 'end'
			if (state.startPoint && action.payload.coordinates.row === state.startPoint.row && action.payload.coordinates.column === state.startPoint.column) {
				state.startPoint = null
			} else if (state.endPoint && action.payload.coordinates.row === state.endPoint.row && action.payload.coordinates.column === state.endPoint.column) {
				state.endPoint = null
			}
			// Set the current cell state to a value of what we draw ('start', 'end' or border).
			// The setting 'cellState' button is located in the 'Header' component
			state.grid[action.payload.coordinates.row][action.payload.coordinates.column].state = action.payload.state
		},
		markAsPath: (state, action) => {
			state.grid[action.payload.row][action.payload.column].path = true
		},
		markAsExplored: (state, action) => {
			state.grid[action.payload.row][action.payload.column].explored = true
		},
		clean: state => {
			// Reset the field
			state.grid.map(row => row.map(column => {
										column.state = null
										column.explored = false
										column.path = false
										return column
								  })
			)
		},
		cleanPrevSearch: state => {
			// Clean the path and explored cells from the previous search
			state.grid.map(row => row.map(column => {
										column.explored = false
										column.path = false
										return column
								  })
			)
		}
	}
})

export const {markAsStart, markAsEnd, markAsBorder, markAsPath, markAsExplored, clean, cleanPrevSearch} = searchSlice.actions

export const drawPath = (path: Coordinates[]) => {
	return (dispatch: Dispatch) => {
		let index = 0
		const intervalID = setInterval(() => {
			dispatch(markAsPath(path[index]))
			if (++index >= path.length) {
				clearInterval(intervalID)
			}
		}, 100)
	}
}

export default searchSlice.reducer