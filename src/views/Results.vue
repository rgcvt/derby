<template>
	<SidebarLayout>
		<h2>Results</h2>
		<hr />
		<div class="cars">
			<template v-for="(car, i) in sortedCars">
				<div class="car" v-if="!car.races.find((r) => r.time == null)">
					<div class="medal" :data-type="findMedal(i)">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12 7.00002C16.4183 7.00002 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 7.00002 12 7.00002ZM12 10.5L10.6775 13.1797L7.72025 13.6094L9.86012 15.6953L9.35497 18.6406L12 17.25L14.645 18.6406L14.1399 15.6953L16.2798 13.6094L13.3225 13.1797L12 10.5ZM13 1.99902L18 2.00002V5.00002L16.6366 6.13758C15.5305 5.55773 14.3025 5.17887 13.0011 5.04951L13 1.99902ZM11 1.99902L10.9997 5.04943C9.6984 5.17866 8.47046 5.55738 7.36441 6.13706L6 5.00002V2.00002L11 1.99902Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					<div class="place">{{ i + 1 }}.</div>
					<div class="name">
						<div class="car-driver">
							<strong>{{ car.driver }}</strong> - Car # {{ car.id }}
						</div>
						<div class="race-times">
							<div
								v-for="(race, i) in car.races.sort((a, b) => a.race - b.race)"
							>
								<span class="color-dot" :data-color="race.lane">⏺</span>
								{{ race.time }}s
							</div>
						</div>
					</div>

					<div class="total-time">{{ car.total }}s</div>
				</div>
			</template>
		</div>
	</SidebarLayout>
</template>
<script setup>
import SidebarLayout from '../layouts/SidebarLayout.vue';
import { ref, watch, onMounted } from 'vue';
import { store } from '@/store.js';
const cars = JSON.parse(JSON.stringify(store.appState.cars));
const addTime = (car) => {
	let time = 0;
	car.races.forEach((race) => {
		time = time + parseFloat(race.time);
	});
	return Number(time.toFixed(3));
};
cars.map((car) => {
	car.total = addTime(car);
});
const sortedCars = cars.sort((a, b) => a.total - b.total);

const medals = ['gold', 'silver', 'bronze'];
const findMedal = (i) => {
	return medals[i] ? medals[i] : 'none';
};
console.log(sortedCars);
</script>
<style scoped lang="scss">
.cars {
	display: flex;
	flex-direction: column;
	gap: var(--border-width);
}
.car {
	display: grid;
	grid-template-columns: 3rem 3ch 1fr 5rem;
	background: var(--color-background-card);
	align-items: center;
	gap: 0.5rem;
	border-radius: var(--border-radius);
	padding: 0.5rem;
}
.medal {
	svg {
		margin: 0.5rem;
		width: 2rem;
		height: 2rem;
		object-fit: contain;
	}
	&[data-type='none'] {
		svg {
			display: none;
		}
	}
	&[data-type='gold'] {
		color: #ffb300;
	}
	&[data-type='silver'] {
		color: #90a4ae;
	}
	&[data-type='bronze'] {
		color: #8e5300;
	}
}
.place {
	font-size: 1.75rem;
	font-weight: 600;
}
.car-driver {
	font-size: 1.25rem;
}
.color-dot {
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
.race-times {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	font-size: 0.8rem;
	color: var(--color-ui-intense);
	font-weight: 600;
}
</style>
