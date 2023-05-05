// store.js
import { reactive, watch } from 'vue';

export const defaultAppState = {
	cars: [],
	races: [],
	raceCurrentIndex: 0,
	raceNextIndex: 1,
};

const localAppState = localStorage.derbyAppState
	? JSON.parse(localStorage.derbyAppState)
	: defaultAppState;

export const store = reactive({
	appState: localAppState,

	deepMerge(source, target) {
		return (
			void Object.keys(target).forEach((key) => {
				source[key] instanceof Object && target[key] instanceof Object
					? source[key] instanceof Array && target[key] instanceof Array
						? void (source[key] = Array.from(
								new Set(source[key].concat(target[key]))
						  ))
						: !(source[key] instanceof Array) && !(target[key] instanceof Array)
						? void this.deepMerge(source[key], target[key])
						: void (source[key] = target[key])
					: void (source[key] = target[key]);
			}) || source
		);
	},
	resetAppState() {
		this.appState = defaultAppState;
		localStorage.derbyAppState = JSON.stringify({ ...defaultAppState });
	},
});

watch(
	store.appState,
	(currentValue, oldValue) => {
		localStorage.derbyAppState = JSON.stringify({ ...currentValue });
	},
	{ deep: true }
);
