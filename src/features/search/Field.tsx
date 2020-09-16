import React, {useState} from 'react'
import Cell from './Cell'
import {useSelector} from 'react-redux'
import {State} from '../../interfaces/interfaces'



const Field: React.FC = () => {
					  	
	const [mouseDowned, setMouseDowned] = useState(false)

	const grid = useSelector((state: State) => state.field.grid)

	const handleMouseDown = (changeColor: () => void): void => {
		setMouseDowned(true)
		changeColor()
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