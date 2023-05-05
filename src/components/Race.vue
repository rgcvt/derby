<template>
	<div class="race" :data-status="race.complete ? 'complete' : 'incomplete'">
		<div class="lanes">
			<RaceLane
				v-for="(lane, i) in race.lanes"
				:raceIndex="raceIndex"
				:laneIndex="i"
			/>
		</div>
		<div class="race-footer">
			<div class="race-number">Race {{ race.id }}</div>
			<label class="race-complete">
				Race Complete
				<input
					type="checkbox"
					@input="incrementRace($event)"
					v-model="race.complete"
				/>
			</label>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '@/store.js';
import RaceLane from '@/components/RaceLane.vue';
const props = defineProps({
	raceIndex: Number,
});
const races = ref(store.appState.races);
const appState = ref(store.appState);
const race = races.value[props.raceIndex];
const incrementRace = (e) => {
	setTimeout(() => {
		const unchecked = races.value.filter((r) => r.complete == false);
		if (unchecked.length == 1) {
			appState.value.raceCurrentIndex = unchecked[0].id - 1;
			appState.value.raceNextIndex = null;
		} else if (unchecked.length > 1) {
			console.log(unchecked);
			appState.value.raceCurrentIndex = unchecked[0].id - 1;
			appState.value.raceNextIndex = unchecked[1].id - 1;
		} else {
			appState.value.raceCurrentIndex = null;
			appState.value.raceNextIndex = null;
		}
	}, 10);
};
</script>
<style lang="scss" scoped>
.race {
	border: var(--border-width) solid var(--color-background-card);
	//background: var(--color-background-card);
	border-radius: var(--border-radius);
	&[data-status='complete'] {
		.lane {
			filter: grayscale(1);
			opacity: 0.75;
			//mix-blend-mode: overlay;
			pointer-events: none;
		}
	}
}
.lanes {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.5rem;
	padding: 0.5rem;
}

.race-number {
	width: max-content;
	flex-shrink: 0;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	font-size: 0.8rem;
}
.race-complete {
	width: max-content;
	display: flex;
	align-items: center;
	gap: 0.25rem;
}
.race-footer {
	color: var(--color-ui-intense);
	background: var(--color-background-card);
	display: flex;
	justify-content: space-between;
	padding: 0.5rem;
}
</style>
