<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { defaultAppState } from '../store/appState';
import IconDerby from '../components/IconDerby.vue';

const localAppState: AppState = localStorage.derbyAppState ? JSON.parse(localStorage.derbyAppState) : defaultAppState;
const localCars: Car[] = localStorage.derbyCars ? JSON.parse(localStorage.derbyCars) : [];
const localRaces: Race[] = localStorage.derbyRaces ? JSON.parse(localStorage.derbyRaces) : [];

const cars = ref(localCars);
const races = ref(localRaces);
const appState = ref(localAppState);
const isFullscreen = ref(false);

onMounted(() => {
	window.addEventListener('storage', () => {
		cars.value = JSON.parse(localStorage.derbyCars);
		races.value = JSON.parse(localStorage.derbyRaces);
		appState.value = JSON.parse(localStorage.derbyAppState);
	});
});

const currentRace = computed(() => {
	if (appState.value.currentRace !== null) {
		return races.value[appState.value.currentRace];
	} else {
		return null;
	}
});

const nextRace = computed(() => {
	if (appState.value.nextRace !== null) {
		return races.value[appState.value.nextRace];
	} else {
		return null;
	}
});

function upcomingFilter(race: Race) {
	let show = false;
	if (race.complete == false && race.index !== null && appState.value.nextRace !== null) {
		show = race.index > appState.value.nextRace;
	}
	return show;
}
const upcomingRaces = computed(() => {
	return races.value.filter((r) => upcomingFilter(r)).slice(0, 2);
});

const driverByCarId = (carId: number) => {
	const car = cars.value.find((c) => c.id == carId);
	return car ? car.driver : null;
};

const toggleFullscreen = () => {
	const element = document.querySelector('.race-display');
	if (element) {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			isFullscreen.value = true;
		} else {
			element.requestFullscreen();
			isFullscreen.value = false;
		}
	}
};
</script>
<template>
	<div class="race-display" v-if="currentRace">
		<div class="fullscreen-controls">
			<RouterLink class="home-link" to="/" title="home">
				<IconDerby />
			</RouterLink>
			<button @click="toggleFullscreen" title="fullscreen">
				<vue-feather v-if="isFullscreen" type="maximize" stroke-width="2" size="48" />
				<vue-feather v-else type="minimize" stroke-width="2" size="48" />
			</button>
		</div>
		<div class="current-race race">
			<h2 v-if="currentRace">
				Current Race: {{ `${(appState.currentRace as number) + 1}` }} /
				{{ races.length }}
			</h2>
			<template v-if="currentRace">
				<div
					v-for="lane in currentRace.lanes"
					class="lane"
					:data-color="lane.color"
					:key="`race-${currentRace.index}-lane-${lane.color}`"
				>
					<div class="lane-content">
						<div class="driver">{{ driverByCarId(lane.car as number) }}</div>
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
				<div v-for="lane in nextRace.lanes" class="lane" :data-color="lane.color">
					<div class="lane-content">
						<div class="driver">{{ driverByCarId(lane.car as number) }}</div>
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
		<div class="upcoming-races">
			<h2 v-if="nextRace">Upcoming</h2>
			<div>
				<div class="upcoming-race" v-for="race in upcomingRaces">
					<div class="race-title">Race: {{ (race.index as number) + 1 }}</div>
					<div class="upcoming-lanes">
						<div class="upcoming-lane" v-for="lane in race.lanes">
							<div class="color-dot" :data-color="lane.color">⏺</div>
							<div class="driver">{{ driverByCarId(lane.car as number) }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.race-display {
	--border-width: 0.2rem;
	font-family: var(--font-sans);
	font-size: 1vw;
	--padding: 4em;
	padding: var(--padding);
	background: #000;
	color: #fff;
	width: 100%;
	display: grid;
	grid-template-columns: 3fr 2fr 1fr;
	gap: 2em;
}
.race,
.upcoming-races {
	height: calc(100vh - 2 * var(--padding));
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 4em 1fr 1fr 1fr 1fr;
	gap: 1em;
}
.upcoming-races {
	grid-template-rows: 4em 1fr;
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
		font-weight: 800;
	}
}
.next-race {
	.lane {
		border-right: 1em solid var(--color-highlight);
	}
	.driver {
		font-size: 2.5em;
		font-weight: 600;
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
		opacity: 0.75;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.8em;
	}
	.color {
		color: var(--color-highlight);
		filter: brightness(1.5);
		text-transform: capitalize;
	}
}
.color-dot {
	line-height: 1;
	&[data-color='red'] {
		color: var(--color-red);
	}
	&[data-color='yellow'] {
		color: var(--color-yellow);
	}
	&[data-color='green'] {
		color: var(--color-green);
	}
	&[data-color='blue'] {
		color: var(--color-blue);
	}
}
.upcoming-lane {
	display: flex;
	//align-items: center;
	gap: 0.25em;
	font-size: 1.75em;
	font-weight: 600;
}
.upcoming-lanes {
	display: flex;
	flex-direction: column;
	gap: 1em;
	margin-bottom: 2em;
}
.race-title {
	color: var(--color-text-muted);
	font-size: 2em;
	font-weight: 600;
	text-transform: uppercase;
	margin-bottom: 0.25em;
}
.fullscreen-controls {
	position: fixed;
	display: flex;
	align-items: center;
	gap: 2rem;
	bottom: var(--space-md);
	right: var(--space-md);

	button {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;

		transition: transform 150ms;
		&:hover {
			transform: scale(1.1);
		}
	}
}
.home-link {
	color: var(--color-light-intense);
	svg {
		height: 4rem;
		width: 4rem;
	}
}
</style>
