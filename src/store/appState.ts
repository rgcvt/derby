import { reactive, watch } from 'vue';

export const defaultAppState: AppState = {
	racesCreated: false,
	currentRace: 0,
	nextRace: 1,
	serialConnected: false,
	raceOngoing: false,
};

const localAppState: AppState = localStorage.derbyAppState ? JSON.parse(localStorage.derbyAppState) : defaultAppState;

export const appStateStore = reactive({
	appState: localAppState,
	resetStore() {
		this.appState = defaultAppState;
		localStorage.derbyAppState = JSON.stringify(defaultAppState);
	},
});

watch(
	appStateStore.appState,
	(currentValue) => {
		localStorage.derbyAppState = JSON.stringify({ ...currentValue });
	},
	{ deep: true }
);
