export interface Coordinates {
	row: number;
	column: number;
}

export interface NodeType {
	state: Coordinates,
	parent: NodeType | null,
	stepsBehind?: number,
	suposedCost?: number
}

export type CellType = 'start' | 'end' | 'border' | null;

export default interface CellInfo {
	coordinates: Coordinates;
	state: CellType;
	explored: boolean;
	path: boolean
}