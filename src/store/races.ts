import { reactive, watch } from 'vue';

const localRaces: Race[] = localStorage.derbyRaces ? JSON.parse(localStorage.derbyRaces) : [];

export const raceStore = reactive({
	races: localRaces,
	resetStore() {
		this.races = [];
		localStorage.derbyRaces = JSON.stringify([]);
	},
});

watch(
	raceStore.races,
	(currentValue) => {
		localStorage.derbyRaces = JSON.stringify([...currentValue]);
	},
	{ deep: true }
);
