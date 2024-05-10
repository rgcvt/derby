type LaneColor = 'red' | 'blue' | 'green' | 'yellow';

type Car = {
	id: number;
	driver: string;
	races: CarRace[];
};
type CarRace = {
	lane: LaneColor;
	race: number | null;
	time: number | null;
};
type RaceLane = {
	color: LaneColor;
	car: number | null;
	time: number | null;
};
type Race = {
	id: number;
	complete: boolean;
	index: number | null;
	lanes: RaceLane[];
};
type AppState = {
	racesCreated: boolean;
	currentRace: number | null;
	nextRace: number | null;
	raceOngoing: boolean;
};
type SerialStore = {
	port: SerialPort | null;
	connected: boolean;
};
type LaneTimes = {
	red: number | null;
	blue: number | null;
	green: number | null;
	yellow: number | null;
};
