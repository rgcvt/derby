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
			</template>
		</PageHeader>
		<div v-if="cars.length == 0">
			<p>You neet to add cars before you can build the races.</p>
			<router-link class="button" to="/cars">Add Cars</router-link>
		</div>

		<RaceList />
	</SidebarLayout>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '@/store.js';
import RaceList from '@/components/RaceList.vue';
import SidebarLayout from '../layouts/SidebarLayout.vue';
import PageHeader from '../components/PageHeader.vue';

const cars = ref(store.appState.cars);
const races = ref(store.appState.races);

const colors = ['red', 'yellow', 'green', 'blue'];

const deleteRaces = () => {
	if (confirm('This will delete all races, do you want to proceed?')) {
		races.value.length = 0;
	}
};

const makeRaces = () => {
	races.value.length = 0;

	cars.value.forEach((car, i) => {
		races.value.push({
			id: i + 1,

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
</script>
<style>
p.small {
	font-size: 0.8rem;
	margin-top: 0.5rem;
}
</style>
