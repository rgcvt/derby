<template>
	<div class="race-display" v-if="currentRace">
		<div class="current-race race">
			<h2 v-if="currentRace">
				Current Race: {{ store.appState.raceCurrentIndex + 1 }} /
				{{ races.length }}
			</h2>
			<template v-if="currentRace">
				<div
					v-for="(lane, i) in currentRace.lanes"
					class="lane"
					:data-color="lane.color"
				>
					<div class="lane-content">
						<div class="driver">{{ driverByCarId(lane.car) }}</div>
						<ul class="meta">
							<li><span class="label">Car:</span> #{{ lane.car }}</li>
							<li>
								<span class="label">Lane:</span>
								<span class="color"> {{ lane.color }}</span>
							</li>
							<li><span class="label">Time:</span> {{ lane.time }}</li>
						</ul>
					</div>
				</div>
			</template>
		</div>
		<div class="next-race race">
			<h2 v-if="nextRace">On Deck</h2>
			<template v-if="nextRace">
				<div
					v-for="(lane, i) in nextRace.lanes"
					class="lane"
					:data-color="lane.color"
				>
					<div class="lane-content">
						<div class="driver">{{ driverByCarId(lane.car) }}</div>
						<ul class="meta">
							<li><span class="label">Car:</span> #{{ lane.car }}</li>
							<li>
								<span class="label">Lane:</span>
								<span class="color"> {{ lane.color }}</span>
							</li>
						</ul>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { store } from '@/store.js';
const races = store.appState.races;
const cars = store.appState.cars;
const currentRace = races[store.appState.raceCurrentIndex];
const nextRace = races[store.appState.raceNextIndex];

onMounted(() => {
	window.addEventListener('storage', () => {
		location.reload();
	});
});

const driverByCarId = (carId) => {
	const car = cars.find((c) => c.id == carId);
	return car.driver;
};
</script>
<style scoped lang="scss">
.race-display {
	font-size: 1vw;
	--padding: 4em;
	padding: var(--padding);
	background: #000;
	color: #fff;
	width: 100%;
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 2em;
}
.race {
	height: calc(100vh - 2 * var(--padding));
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 3em 1fr 1fr 1fr 1fr;
	gap: 1em;
}
h2 {
	font-size: 3em;
	margin: 0;
	font-weight: 600;
	color: var(--color-light-muted);
}

.lane {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.lane-content {
	position: relative;
	z-index: 1;
}
.driver {
	line-height: 1;
}
.current-race {
	.lane {
		border-left: 2.5em solid var(--color-highlight);
		background: var(--color-dark-muted);
	}
	.driver {
		font-size: 4em;
		font-weight: 900;
	}
}
.next-race {
	.lane {
		border-right: 0.5em solid var(--color-highlight);
	}
	.driver {
		font-size: 3em;
		font-weight: 900;
		opacity: 0.7;
	}
}
.lane {
	border-radius: var(--border-radius);
	//border-left: 1.5em solid var(--color-highlight);
	border: var(--border-width) solid var(--color-highlight);
	padding: 0.5em 1.5em;
	position: relative;

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
}
ul.meta {
	display: flex;
	font-size: 2em;
	gap: 1em;
	color: #fff;

	.label {
		color: var(--color-light-muted);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.9em;
	}
	.color {
		color: var(--color-highlight);
		filter: brightness(1.5);
		text-transform: capitalize;
	}
}
</style>
