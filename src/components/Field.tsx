import React, {useState} from 'react'
import Cell from './Cell'
import CellInfo from '../interfaces/interfaces'



const Field: React.FC<{
						changeColor: (row: number, column: number) => void,
						grid: Array<CellInfo[]>
					  }> = ({changeColor, grid}) => {
					  	
	const [mouseDowned, setMouseDowned] = useState(false)

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