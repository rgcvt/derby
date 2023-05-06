<template>
	<SidebarLayout>
		<PageHeader>
			<template v-slot:title>Races</template>
			<template v-slot:action>
				<div v-if="cars.length > 0">
					<template v-if="races.length == 0">
						<button v-if="races.length == 0" @click="makeRaces">
							Build Races
						</button>
					</template>
					<template v-else>
						<button @click="deleteRaces">Delete Races</button>
					</template>
				</div>
				<div v-else>
					<router-link class="button" to="/cars"><Add /> Add Cars</router-link>
					<p class="small">
						You need to add cars before you can build the races.
					</p>
				</div>
			</template>
		</PageHeader>

		<RaceList />
	</SidebarLayout>
</template>
<script setup>
import { ref } from 'vue';
import { store } from '@/store.js';
import RaceList from '@/components/RaceList.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';
import PageHeader from '@/components/PageHeader.vue';
import Add from '@/icons/Add.vue';

const cars = ref(store.appState.cars);
const races = ref(store.appState.races);
const appState = ref(store.appState);

const colors = ['red', 'blue', 'green', 'yellow'];

const deleteRaces = () => {
	if (confirm('This will delete all races, do you want to proceed?')) {
		races.value.length = 0;
		appState.value.raceCurrentIndex = null;
		appState.value.raceNextIndex = null;
	}
};

const makeRaces = () => {
	races.value.length = 0;

	// sort the cars
	cars.value.sort((a, b) => a.id - b.id);

	cars.value.forEach((car, i) => {
		races.value.push({
			id: i + 1,
			index: null,
			lanes: colors.map((c) => {
				return { color: c, car: null, time: null };
			}),
			complete: false,
		});
	});

	// reset car races
	cars.value.forEach((car, carIndex) => {
		cars.value[carIndex].races = colors.map((c) => {
			return { lane: c, race: null, time: null };
		});
	});
	populate();
	populate();
	shuffleArray(races.value);
	races.value.map((r, i) => (r.index = i));
	appState.value.raceCurrentIndex = 0;
	appState.value.raceNextIndex = 1;
};

const populate = () => {
	cars.value.forEach((car, carIndex) => {
		races.value.forEach((race, raceIndex) => {
			// find the next lane the car needs
			const carRaceIndex = car.races.findIndex((r) => r.race == null);
			const carRace = car.races[carRaceIndex];

			// if the car indeed needs a new race
			if (carRace) {
				// find the next lane the car needs
				const carLane = carRace.lane;

				// check if this car is already in the race
				const alreadyInRace = race.lanes.find((l) => l.car == car.id);

				// check if the color is actually available
				const laneIndex = race.lanes.findIndex(
					(l) => l.color == carLane && l.car == null
				);

				if (!alreadyInRace && laneIndex != -1) {
					// update the race by index
					races.value[raceIndex].lanes[laneIndex].car = car.id;
					// update the car by index
					cars.value[carIndex].races[carRaceIndex].race = raceIndex + 1;
				}
			}
		});
	});
	races.value = races.value;
};
const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
</script>
