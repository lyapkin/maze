import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {markAsStart, markAsEnd, markAsBorder} from './searchSlice'
import CellInfo, {State} from '../../interfaces/interfaces'



const Cell: React.FC<{
				info: CellInfo,
				mouseDowned: boolean,
				handleMouseUp: () => void,
				handleMouseDown: (changeColor: () => void) => void
}> = ({info, mouseDowned, handleMouseUp, handleMouseDown}) => {

	const dispatch = useDispatch()
	const cellType = useSelector((state: State) => state.cellType.value)

	const path: 'path' | null = info.path ? 'path' : null
	const explored: 'explored' | null = info.explored ? 'explored' : null

	// Change cell color drawing 'start', 'end', 'border'
	const changeColor = () => {
		const payload = {
			coordinates: info.coordinates,
			state: cellType
		}
		switch (cellType) {
			case 'start':
				dispatch(markAsStart(payload))
				break
			case 'end':
				dispatch(markAsEnd(payload))
				break
			case 'border':
				dispatch(markAsBorder(payload))
		}
	}

	return (
		<div className={'grid-cell ' + (info.state || path || explored)}
			 onMouseDown={ handleMouseDown.bind(null, changeColor) }
			 onMouseUp={handleMouseUp}
			 onMouseOver={ mouseDowned ? changeColor : () => {} }
		></div>
	)
}

export default Cell