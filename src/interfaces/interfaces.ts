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

export interface Field {
	startPoint: Coordinates | null,
	endPoint: Coordinates | null,
	grid: Array<CellInfo[]>
}
export interface State {
	cellType: {value: 'start' | 'end' | 'border'},
	field: Field
}

export default interface CellInfo {
	coordinates: Coordinates;
	state: CellType;
	explored: boolean;
	path: boolean
}