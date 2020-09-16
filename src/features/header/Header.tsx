import React, {useState} from 'react'
import {CellType, State} from '../../interfaces/interfaces'
import {useDispatch, useSelector} from 'react-redux'
import {setCellType} from './headerSlice'
import {markAsExplored, clean, cleanPrevSearch, drawPath} from '../search/searchSlice'
import {searchPath} from '../../search-logic/main'



const Header: React.FC = () => {

	const [searchType, setSearchType] = useState('dfs')

	const dispatch = useDispatch()

	const grid = useSelector((state: State) => state.field.grid)
	const startPoint = useSelector((state: State) => state.field.startPoint)
	const endPoint = useSelector((state: State) => state.field.endPoint)

	const cellType: 'start' | 'end' | 'border' = useSelector((state: State) => state.cellType.value)

	const dispatchCellType = (value: CellType) => {
		dispatch(setCellType(value))
	}

	const startSearch = async () => {
		if (!(startPoint && endPoint)) throw new Error("There's no start or end point")

		// Clean up the field from the previous search
		dispatch(cleanPrevSearch())

		try {
			// Handle search. The 'searchPath' function locates in 'search-logic/main'
			// The function return a coordinates of a cell that is explored or
			// an array of coordinates with a path in the end
			for await (let value of searchPath(grid, searchType, startPoint, endPoint)) {
				// Draw a path from 'start' to 'end'
				if (Array.isArray(value)) {
					value.reverse()
					dispatch(drawPath(value))
					break
				}
				// Mark a cell as explored painting it out
				dispatch(markAsExplored(value))
			}
		} catch(e) {
			console.log(e)
		}
	}
	
    return (
	    <header className="header">
	    	<div>
	    		<span>Search type:</span>
	    		<label className={searchType === 'dfs' ? 'active' : ''}>
	    			Depth First
	    			<input type="radio" name="serchtype" value="dfs" onChange={event => setSearchType(event.target.value)} />
	    		</label>
	    		<label className={searchType === 'bfs' ? 'active' : ''}>
	    			Breadth First
	    			<input type="radio" name="serchtype" value="bfs" onChange={event => setSearchType(event.target.value)} />
	    		</label>
	    		<label className={searchType === 'ass' ? 'active' : ''}>
	    			A*Search
	    			<input type="radio" name="serchtype" value="ass" onChange={event => setSearchType(event.target.value)} />
	    		</label>
	    	</div>
	    	<div>
	    		<span>Draw:</span>
	    		<label className={cellType === 'start' ? 'active' : ''}>
	    			Start point
	    			<input type="radio" name="cell" value="start" onChange={event => dispatchCellType(event.target.value as CellType)} />
	    		</label>
	    		<label className={cellType === 'end' ? 'active' : ''}>
	    			End point
	    			<input type="radio" name="cell" value="end" onChange={event => dispatchCellType(event.target.value as CellType)} />
	    		</label>
	    		<label className={cellType === 'border' ? 'active' : ''}>
	    			Border
	    			<input type="radio" name="cell" value="border" onChange={event => dispatchCellType(event.target.value as CellType)} defaultChecked />
	    		</label>
	    	</div>
	    	<div className="button-container">
	    		<button className="button" onClick={startSearch} >START</button>
	    		<button className="button" onClick={dispatch.bind( null, clean() )} >CLEAN</button>
	    	</div>
		</header>
	)
}

export default Header