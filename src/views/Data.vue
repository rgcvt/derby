<template>
	<table>
		<caption>
			Cars
		</caption>
		<thead>
			<tr>
				<th>Number</th>
				<th>Driver</th>
				<th>Red Time</th>
				<th>Yellow Time</th>
				<th>Green Time</th>
				<th>Blue Time</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(car, i) in cars">
				<td class="number">
					<inline-input
						type="text"
						placeholder="1"
						@blur="updateNumber($event, i)"
						:value="car.id"
					/>
				</td>
				<td>
					<inline-input
						type="text"
						placeholder="Firstname McLastnamerson"
						@blur="updateDriver($event, i)"
						:value="car.driver"
					/>
				</td>
				<td>{{ car.races[0].time }}</td>
				<td>{{ car.races[1].time }}</td>
				<td>{{ car.races[2].time }}</td>
				<td>{{ car.races[3].time }}</td>
			</tr>
		</tbody>
	</table>

	<form name="new-car" @submit.prevent="addCar">
		<label
			>Car Number
			<input name="id" type="number" :value="cars.length + 1" required />
		</label>
		<label
			>Car Driver
			<input
				name="driver"
				type="text"
				placeholder="Firstname McLastnamerson"
				required
			/>
		</label>
		<button>Save Car</button>
	</form>
	<button>New Car</button>
	<button @click="makeRaces">Make Races</button>
	<RaceList />
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '@/store.js';
import InlineInput from '@/components/InlineInput.vue';
import RaceList from '@/components/RaceList.vue';

const cars = ref(store.appState.cars);
const races = ref(store.appState.races);

const updateDriver = (driver, i) => {
	cars.value[i].driver = driver;
};
const updateNumber = (number, i) => {
	cars.value[i].id = number;
};

const addCar = (e) => {
	const { id, driver } = Object.fromEntries(new FormData(e.target));
	const newCar = {
		id: id,
		driver: driver,
		races: colors.map((c) => {
			return { lane: c, race: null, time: null };
		}),
	};
	cars.value.push(newCar);
	document.forms['new-car'].reset();
};

const colors = ['red', 'yellow', 'green', 'blue'];

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

	console.log(races);
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
