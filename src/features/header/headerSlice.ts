import {createSlice} from '@reduxjs/toolkit'

const initialState: {value: 'start' | 'end' | 'border'} = {
	value: 'border'
}

const headerSlice = createSlice({
	name: 'cellType',
	initialState,
	reducers: {
		setCellType: (state, action) => {
			state.value = action.payload
		}
	}
})

export const {setCellType} = headerSlice.actions

export default headerSlice.reducer