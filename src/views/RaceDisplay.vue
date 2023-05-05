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
		<div class="upcoming-races">
			<h2 v-if="nextRace">Upcoming</h2>
			<div>
				<div class="upcoming-race" v-for="race in upcomingRaces">
					<div class="race-title">Race: {{ race.index + 1 }}</div>
					<div class="upcoming-lanes">
						<div class="upcoming-lane" v-for="lane in race.lanes">
							<div class="color-dot" :data-color="lane.color">⏺</div>
							<div class="driver">{{ driverByCarId(lane.car) }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fullscreen-controls">
			<button
				v-if="!isFullscreen"
				@click="enterFullScreen"
				title="enter fullscreen"
			>
				<FullscreenEnter />
			</button>
			<button
				v-if="isFullscreen"
				@click="exitFullScreen"
				title="exit fullscreen"
			>
				<FullscreenExit />
			</button>
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { store } from '@/store.js';
import FullscreenEnter from '@/icons/FullscreenEnter.vue';
import FullscreenExit from '@/icons/FullscreenExit.vue';
const races = store.appState.races;
const cars = store.appState.cars;
const currentRace = races[store.appState.raceCurrentIndex];
const nextRace = races[store.appState.raceNextIndex];
const isFullscreen = ref(false);

const upcomingRaces = races
	.filter((r) => r.index > store.appState.raceNextIndex && r.complete == false)
	.slice(0, 2);

onMounted(() => {
	window.addEventListener('storage', () => {
		location.reload();
	});
});

const driverByCarId = (carId) => {
	const car = cars.find((c) => c.id == carId);
	return car.driver;
};

function enterFullScreen() {
	const element = document.querySelector('.race-display');
	if (element.requestFullscreen) {
		element.requestFullscreen();
	} else if (element.mozRequestFullScreen) {
		element.mozRequestFullScreen(); // Firefox
	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen(); // Safari
	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen(); // IE/Edge
	}
	isFullscreen.value = true;
}

function exitFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
	isFullscreen.value = false;
}
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
		border-right: 0.5em solid var(--color-highlight);
	}
	.driver {
		font-size: 3em;
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
	color: var(--color-ui-intense);
	font-size: 2em;
	font-weight: 600;
	text-transform: uppercase;
	margin-bottom: 0.25em;
}
.fullscreen-controls {
	position: fixed;
	bottom: var(--space-md);
	right: var(--space-md);
	button {
		padding: 0;
		background: transparent;
		border: transparent;
		transition: transform 150ms;
		&:hover {
			transform: scale(1.1);
		}
		svg {
			width: 3em;
			height: 3em;
		}
	}
}
</style>
