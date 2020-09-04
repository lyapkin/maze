import {Coordinates, NodeType} from '../interfaces/interfaces'

interface Creator {
	create(type: string): FrontierType
}

interface FrontierType {
	add(node: NodeType): void
	remove(): NodeType
	isEmpty(): boolean
	contains(state: Coordinates): boolean
}

class Frontier{
	create(type: string, target: Coordinates) {
		switch (type) {
			case ('bfs'):
				return new BFSFrontier()
			case ('dfs'):
				return new DFSFrontier()
			case ('ass'):
				ASSFrontier.target = target
				return new ASSFrontier()
			default:
				throw new Error('something wrong')
		}
	}
}

class BFSFrontier{
	frontier: NodeType[]

	constructor() {
		this.frontier = []
	}

	isEmpty() {
		return this.frontier.length === 0
	}

	contains(state: Coordinates) {
		for (let item of this.frontier) {
			if (JSON.stringify(item.state) === JSON.stringify(state)) {
				return true
			}
		}
		return false
	}

	add(node: NodeType) {
		this.frontier.push(node)
	}

	remove() {
		if (this.isEmpty()) {
			throw new Error('Frontier is empty')
		} else {
			const node = this.frontier.splice(0, 1)[0]
			return node
		}
	}
}

class DFSFrontier extends BFSFrontier {
	remove() {
		if (this.isEmpty()) {
			throw new Error('Frontier is empty')
		} else {
			const node = this.frontier.splice(-1, 1)[0]
			return node
		}
	}
}

class ASSFrontier extends BFSFrontier {
	static target: Coordinates

	add(node: NodeType) {
		node.stepsBehind = node.parent ? node.parent.stepsBehind as number + 1 : 0
		const distanceToTarget = Math.abs(node.state.row - ASSFrontier.target.row) +
								 Math.abs(node.state.column - ASSFrontier.target.column)
		node.suposedCost = node.stepsBehind + distanceToTarget
		this.frontier.push(node)
	}

	remove() {
		if (this.isEmpty()) {
			throw new Error('Frontier is empty')
		} else {
			let indexToRemove: number = this.frontier.length - 1
			this.frontier.forEach((item, index) => {
				if ((item.suposedCost as number) < (this.frontier[indexToRemove].suposedCost as number)) {
					indexToRemove = index
				}
			})
			const node = this.frontier.splice(indexToRemove, 1)[0]
			console.log(node.suposedCost)
			return node
		}
	}
}

export const frontierCreator = new Frontier()