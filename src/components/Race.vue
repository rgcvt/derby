<script setup lang="ts">
import { ref } from 'vue';
import { raceStore } from '../store/races';
import { carStore } from '../store/cars';
import { appStateStore } from '../store/appState';
import { serialStore } from '../store/serial';

const races = ref(raceStore.races);
const cars = ref(carStore.cars);
const appState = ref(appStateStore.appState);
const serial = ref(serialStore.serial);

const props = defineProps<{
	raceIndex: number;
}>();
appState.value.raceOngoing = false;
const startRace = () => {
	appState.value.raceOngoing = true;
};

const incrementRace = () => {
	appState.value.raceOngoing = false;
	// update the car times
	const race = races.value[props.raceIndex];
	race.lanes.forEach((lane) => {
		const car = cars.value.find((c) => c.id == lane.car);
		const carLane = car?.races.find((r) => r.race == race.id);
		if (carLane) {
			carLane.time = lane.time;
		}
	});
	const incomplete = races.value.filter((r) => r.complete == false);
	if (incomplete.length == 1) {
		appState.value.currentRace = incomplete[0].index;
		appState.value.nextRace = null;
	} else if (incomplete.length > 1) {
		appState.value.currentRace = incomplete[0].index;
		appState.value.nextRace = incomplete[1].index;
	} else {
		appState.value.currentRace = null;
		appState.value.nextRace = null;
	}
	// for some reason nextTick() did not work here.
};
</script>
<template>
	<tr class="race" :data-current="appState.currentRace == raceIndex ? 'true' : 'false'">
		<td>{{ raceIndex + 1 }}</td>

		<td
			v-for="lane in races[props.raceIndex].lanes"
			:key="`race-${raceIndex}-lane-${lane.color}`"
			:data-color="lane.color"
		>
			<div class="car-driver">
				<span class="car">#{{ lane.car }}</span>
				<span class="driver">{{ cars.find((c) => c.id == lane.car)?.driver }}</span>
			</div>
			<label class="input-group">
				<span class="hidden">Time</span>
				<vue-feather class="prepend" type="clock" stroke-width="3" size="14"></vue-feather>
				<input v-model="lane.time" type="number" name="time" step=".001" max="9.999" min="0.000" />
			</label>
		</td>
		<td class="cell-actions-parent">
			<div class="cell-actions race-actions">
				<button
					class="button-ui start-button"
					v-if="appState.currentRace == raceIndex && serial.connected"
					@click="startRace"
				>
					<vue-feather
						v-if="appState.raceOngoing"
						type="rotate-cw"
						size="14"
						animation="spin"
						animation-speed="fast"
					></vue-feather>
					<vue-feather v-else type="play" stroke-width="3" size="14"></vue-feather>&nbsp;Start
				</button>
				<div class="button button-ui">
					<label>
						<input v-model="races[props.raceIndex].complete" type="checkbox" @change="incrementRace" />
						Complete
					</label>
				</div>
			</div>
		</td>
	</tr>
</template>
<style lang="scss" scoped>
tr.race td {
	padding-top: 0.6rem;
	padding-bottom: 0.4rem;
}
tr[data-current='true'] {
	position: relative;
	&:after {
		pointer-events: none;
		content: '';
		position: absolute;
		width: calc(100% + 1rem);
		height: 100%;
		border: var(--border-width) solid var(--color-link-default);
		border-radius: var(--border-radius);
		left: -0.5rem;
	}
}
tr[data-current='false'] {
	td:not(.cell-actions-parent) {
		filter: saturate(0);
		opacity: 0.75;
	}
}
.car-driver {
	display: flex;
	gap: 0.5rem;
	font-weight: 800;
	//font-size: 0.8rem;
}
.car {
	color: var(--color-highlight);
}
.driver {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
.race-actions {
	flex-direction: column;
	align-items: center;
	justify-content: center;
	> * {
		width: 100%;
	}
}
.start-button {
	justify-content: flex-start;
}
</style>
