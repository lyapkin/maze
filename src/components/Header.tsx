import React, {useState} from 'react'
import {CellType} from '../interfaces/interfaces'



const Header: React.FC<({
							handleRadio: (value: CellType) => void,
							handleStart: (searchType: string) => () => void,
							handleClean: () => void,
							cellState: CellType
						})> = ({handleRadio, handleStart, handleClean, cellState}) => {

	const [searchType, setSearchType] = useState('dfs')
	
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
	    		<label className={cellState === 'start' ? 'active' : ''}>
	    			Start point
	    			<input type="radio" name="cell" value="start" onChange={event => handleRadio(event.target.value as CellType)} />
	    		</label>
	    		<label className={cellState === 'end' ? 'active' : ''}>
	    			End point
	    			<input type="radio" name="cell" value="end" onChange={event => handleRadio(event.target.value as CellType)} />
	    		</label>
	    		<label className={cellState === 'border' ? 'active' : ''}>
	    			Border
	    			<input type="radio" name="cell" value="border" onChange={event => handleRadio(event.target.value as CellType)} defaultChecked />
	    		</label>
	    	</div>
	    	<div className="button-container">
	    		<button className="button" onClick={handleStart(searchType)} >START</button>
	    		<button className="button" onClick={handleClean} >CLEAN</button>
	    	</div>
		</header>
	)
}

export default Header