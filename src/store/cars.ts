import { reactive, watch } from 'vue';

const localCars: Car[] = localStorage.derbyCars ? JSON.parse(localStorage.derbyCars) : [];

export const carStore = reactive({
	cars: localCars,
	resetStore() {
		this.cars = [];
		localStorage.derbyCars = JSON.stringify([]);
	},
});

watch(
	carStore.cars,
	(currentValue) => {
		localStorage.derbyCars = JSON.stringify([...currentValue]);
	},
	{ deep: true }
);
