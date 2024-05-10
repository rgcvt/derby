<script lang="ts" setup>
import { ref } from 'vue';
import { carStore } from '../store/cars';
import { raceStore } from '../store/races';
import { appStateStore } from '../store/appState';
import Race from '../components/Race.vue';
import PageLayout from '../layouts/PageLayout.vue';

const cars = ref(carStore.cars);
const races = ref(raceStore.races);
const appState = ref(appStateStore.appState);
const colors: LaneColor[] = ['red', 'blue', 'green', 'yellow'];

const deleteRaces = () => {
	if (confirm('This will delete all races, do you want to proceed?')) {
		races.value.length = 0;
		appState.value.racesCreated = false;
		appState.value.currentRace = null;
		appState.value.nextRace = null;
	}
};

const createRaces = () => {
	races.value.length = 0;

	// sort the cars
	cars.value.sort((a, b) => a.id - b.id);

	for (let i = 0; i < cars.value.length; i++) {
		races.value.push({
			id: i + 1,
			index: null,
			lanes: colors.map((c) => {
				return { color: c, car: null, time: null };
			}),
			complete: false,
		});
	}

	// reset car races
	for (let i = 0; i < cars.value.length; i++) {
		cars.value[i].races = colors.map((c) => {
			return { lane: c, race: null, time: null };
		});
	}
	populate();
	populate();
	shuffleArray(races.value);
	races.value.map((r, i) => (r.index = i));
	appState.value.currentRace = 0;
	appState.value.nextRace = 1;
	appState.value.racesCreated = true;
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
				const laneIndex = race.lanes.findIndex((l) => l.color == carLane && l.car == null);

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

const shuffleArray = (array: Race[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
</script>
<template>
	<PageLayout title="Races">
		<template v-slot:actions>
			<button v-if="!appState.racesCreated" @click="createRaces">Create Races</button>
			<button v-if="appState.racesCreated" @click="deleteRaces">Delete Races</button>
		</template>
		<template v-slot:main>
			<table>
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Red</th>
						<th scope="col">Blue</th>
						<th scope="col">Green</th>
						<th scope="col">Yellow</th>
						<th scope="col">Actions</th>
					</tr>
				</thead>
				<tbody>
					<Race v-for="(race, raceIndex) in races" :raceIndex="raceIndex" :key="`race-${race.id}`" @start="" />
				</tbody>
			</table>
		</template>
	</PageLayout>
</template>
