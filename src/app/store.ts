import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import searchReducer from '../features/search/searchSlice'
import headerReducer from '../features/header/headerSlice'

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
})

export default configureStore({
	reducer: {
		cellType: headerReducer,
		field: searchReducer
	},
	middleware
})