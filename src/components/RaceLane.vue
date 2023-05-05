<template>
	<div class="lane" :data-color="lane.color">
		<div class="driver">{{ driverByCarId(lane.car) }}</div>
		<ul class="meta">
			<li><span class="label">Car:</span> #{{ lane.car }}</li>
			<li>
				<span class="label">Lane:</span>
				<span class="color"> {{ lane.color }}</span>
			</li>
		</ul>
		<form class="time-input" @submit.prevent="updateTime($event)">
			<button type="submit"></button>
			<div class="time-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681ZM12 20C15.866 20 19 16.866 19 13C19 9.13401 15.866 6 12 6C8.13401 6 5 9.13401 5 13C5 16.866 8.13401 20 12 20ZM11 8H13V14H11V8ZM8 1H16V3H8V1Z"
						fill="currentColor"
					></path>
				</svg>
			</div>

			<input
				type="number"
				name="time"
				step=".001"
				max="9.000"
				min="2.000"
				@blur="submitParent"
				@keyup.enter.prevent="submitParent"
				@keyup.tab.prevent="submitParent"
				:value="lane.time"
			/>
			<button type="button" @click="resetTime($event)"><Close /></button>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '@/store.js';
import Close from '@/icons/Close.vue';
const props = defineProps({
	raceIndex: Number,
	laneIndex: Number,
});

const races = ref(store.appState.races);
const cars = ref(store.appState.cars);
const race = races.value[props.raceIndex];
const lane = race.lanes[props.laneIndex];

const driverByCarId = (carId) => {
	const car = cars.value.find((c) => c.id == carId);
	return car.driver;
};
const submitParent = (e) => {
	const form = e.target.closest('form');
	const submit = form.querySelector('[type="submit"]');
	submit.click();
};

const updateTime = (e) => {
	const { time } = Object.fromEntries(new FormData(e.target));
	//const time = e.target.value;
	lane.time = time;
	const carIndex = cars.value.findIndex((c) => c.id == lane.car);
	const car = cars.value[carIndex];
	const carRaceIndex = car.races.findIndex((r) => r.race == race.id);
	cars.value[carIndex].races[carRaceIndex].time = time;
};

const resetTime = (e) => {
	//const time = e.target.value;
	const form = e.target.closest('form');
	form.reset();
	const carIndex = cars.value.findIndex((c) => c.id == lane.car);
	const car = cars.value[carIndex];
	const carRaceIndex = car.races.findIndex((r) => r.race == race.id);
	cars.value[carIndex].races[carRaceIndex].time = null;
};
</script>
<style lang="scss" scoped>
.lane {
	background: var(--color-background);
	//border-radius: var(--border-radius);
	border-top: 0.25rem solid var(--color-highlight);
	//border: var(--border-width) solid var(--color-highlight);
	padding: 0.5rem;
	position: relative;
	display: flex;
	flex-direction: column;

	&[data-color='red'] {
		--color-highlight: var(--color-red);
	}
	&[data-color='yellow'] {
		--color-highlight: var(--color-yellow);
	}
	&[data-color='green'] {
		--color-highlight: var(--color-green);
	}
	&[data-color='blue'] {
		--color-highlight: var(--color-blue);
	}
	/*
	&:before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: var(--color-highlight);
		filter: brightness(0.5) contrast(1.5);
		z-index: 0;
		opacity: 0.2;
	}
  */
}
ul.meta {
	display: flex;
	gap: 1rem;

	font-size: 0.8rem;
	.label {
		color: var(--color-ui-intense);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.7rem;
	}
	.color {
		color: var(--color-highlight);
		text-transform: capitalize;
		font-weight: 800;
	}
}

.driver {
	font-weight: 800;
}
.time-input {
	margin-top: auto;
	padding-top: 0.75rem;
	display: grid;
	grid-template-columns: 1rem 1fr 1rem;
	align-items: center;
	gap: 0.25rem;
	input {
		margin: 0;
	}
	button {
		padding: 0;
		border: none;
		background: none;
	}
}
button[type='submit'] {
	display: none;
}
</style>
