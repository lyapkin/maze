import {frontierCreator} from './frontier-classes'
import CellInfo, {Coordinates, NodeType} from '../interfaces/interfaces'
import {ROWS_AMOUNT, COLUMNS_AMOUNT} from '../parameters'


export async function* searchPath(field: Array<CellInfo[]>, searchType: string, start: Coordinates, target: Coordinates): AsyncGenerator<Coordinates | Coordinates[]> {
	const frontier = frontierCreator.create(searchType, target)
	frontier.add({state: start, parent: null})
	const exploredStates: Coordinates[] = []

	while (true) {
		if (frontier.isEmpty()) {
			throw new Error("There's no way")
		}
		
		const node: NodeType = frontier.remove()
		await new Promise(resolve => setTimeout(resolve, 1))
		yield node.state
		
		if (node.state.row === target.row && node.state.column === target.column) {
			const path: Coordinates[] = [node.state]
			let parent: NodeType | null = node.parent
			while (parent) {
				path.push(parent.state)
				parent = parent.parent
			}
			yield path
			return
		}

		exploredStates.push(node.state)

		const newNodes: NodeType[] = getNewNodes(node, field)
		
		for (let i = 0; i < newNodes.length; i++) {
			const newNode: NodeType = newNodes[i]
			if (
				!(
					frontier.contains(newNode.state) ||
					exploredStates.map( explored => JSON.stringify(explored) )
				   				  .includes( JSON.stringify(newNode.state) )
				 ) 
			) {
				frontier.add(newNode)
			}
		}
	}
}

function getNewNodes(oldNode: NodeType, field: Array<CellInfo[]>): NodeType[] {
	const newNodes: NodeType[] = []
	const nodeRow = oldNode.state.row
	const nodeColumn = oldNode.state.column
	
	if (isWithinHeightBorder(nodeRow + 1) && field[nodeRow + 1][nodeColumn].state !== 'border') {
		newNodes.push({
			state: {row: nodeRow + 1, column: nodeColumn},
			parent: oldNode
		})
	}
	if (isWithinHeightBorder(nodeRow - 1) && field[nodeRow - 1][nodeColumn].state !== 'border') {
		newNodes.push({
			state: {row: nodeRow - 1, column: nodeColumn},
			parent: oldNode
		})
	}
	if (isWithinWidthBorder(nodeColumn + 1) && field[nodeRow][nodeColumn + 1].state !== 'border') {
		newNodes.push({
			state: {row: nodeRow, column: nodeColumn + 1},
			parent: oldNode
		})
	}
	if (isWithinWidthBorder(nodeColumn - 1) && field[nodeRow][nodeColumn - 1].state !== 'border') {
		newNodes.push({
			state: {row: nodeRow, column: nodeColumn - 1},
			parent: oldNode
		})
	}
	
	return newNodes
}

function isWithinHeightBorder(nodeNumber: number): boolean {
	const result: boolean = (nodeNumber >= 0 && nodeNumber < ROWS_AMOUNT)
	return result
}

function isWithinWidthBorder(nodeNumber: number): boolean {
	const result: boolean = (nodeNumber >= 0 && nodeNumber < COLUMNS_AMOUNT)
	return result
}