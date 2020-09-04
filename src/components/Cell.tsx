import React from 'react'
import CellInfo from '../interfaces/interfaces'

const Cell: React.FC<{
				info: CellInfo,
				mouseDowned: boolean,
				handleClick: (row: number, column: number) => void,
				handleMouseUp: () => void,
				handleMouseDown: (row: number, column: number) => void
}> = ({info, mouseDowned, handleClick, handleMouseUp, handleMouseDown}) => {
	const path: 'path' | null = info.path ? 'path' : null
	const explored: 'explored' | null = info.explored ? 'explored' : null

	return (
		<div className={'grid-cell ' + (info.state || path || explored)}
			 onMouseDown={ handleMouseDown.bind(null, 
			 							info.coordinates.row,
			 							info.coordinates.column) }
			 onMouseUp={handleMouseUp}
			 onMouseOver={ mouseDowned ? handleClick.bind(null, 
			 							info.coordinates.row,
			 							info.coordinates.column) : () => {} }
		></div>
	)
}

export default Cell