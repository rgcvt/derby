<script lang="ts" setup>
import { ref } from 'vue';
import { carStore } from '../store/cars';

import PageLayout from '../layouts/PageLayout.vue';
import RaceTimes from '../components/RaceTimes.vue';

const cars = ref(carStore.cars);

const nth = (n: number) => {
	return ['st', 'nd', 'rd'][((((n + 90) % 100) - 10) % 10) - 1] || 'th';
};
const isFinished = (car: Car): boolean => {
	return car.races.find((r) => r.time == null) ? false : true;
};
const totalTime = (car: Car): number => {
	let time = 0;
	car.races.forEach((race) => {
		const raceTime = race.time ? race.time : 9.999;
		time = time + raceTime;
	});
	return Number(time.toFixed(3));
};
const medals = ['gold', 'silver', 'bronze'];
const findMedal = (i: number) => {
	return medals[i] ? medals[i] : 'none';
};

const sortedCars = [...cars.value].sort((a, b) => totalTime(a) - totalTime(b));
</script>
<template>
	<PageLayout title="Results">
		<template v-slot:main>
			<table>
				<thead>
					<tr>
						<th class="column-medal" scope="col"></th>
						<th class="column-driver" scope="col">Driver</th>
						<th class="column-race-times" scope="col">Race Times</th>
						<th class="column-total" scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(car, i) in sortedCars">
						<td>
							<div class="medal-place" v-if="isFinished(car)">
								<div class="medal" :data-type="findMedal(i)">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path
											d="M12 7.00002C16.4183 7.00002 20 10.5817 20 15C20 19.4183 16.4183 23 12 23C7.58172 23 4 19.4183 4 15C4 10.5817 7.58172 7.00002 12 7.00002ZM12 10.5L10.6775 13.1797L7.72025 13.6094L9.86012 15.6953L9.35497 18.6406L12 17.25L14.645 18.6406L14.1399 15.6953L16.2798 13.6094L13.3225 13.1797L12 10.5ZM13 1.99902L18 2.00002V5.00002L16.6366 6.13758C15.5305 5.55773 14.3025 5.17887 13.0011 5.04951L13 1.99902ZM11 1.99902L10.9997 5.04943C9.6984 5.17866 8.47046 5.55738 7.36441 6.13706L6 5.00002V2.00002L11 1.99902Z"
											fill="currentColor"
										></path>
									</svg>
								</div>
								<div class="place">{{ i + 1 }}{{ nth(i + 1) }}</div>
							</div>
						</td>
						<td>
							<span class="driver">{{ car.driver }}</span> <span class="car-number">(Car #{{ car.id }})</span>
						</td>
						<td>
							<RaceTimes :races="car.races" />
						</td>
						<td>
							<template v-if="isFinished(car)"> {{ totalTime(car).toFixed(3) }}s </template>
						</td>
					</tr>
				</tbody>
			</table>
		</template>
	</PageLayout>
</template>
<style lang="scss" scoped>
.column-medal {
	width: 6rem;
}
.driver {
	font-weight: 800;
	font-size: 1.5rem;
}
.car-number {
	color: var(--color-text-muted);
}
.medal-place {
	font-weight: 800;
	display: grid;
	grid-template-columns: 2rem 4rem;
	align-items: center;
	gap: 0.5rem;
}

.medal {
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
.column-total {
	width: 5rem;
}
.column-race-times {
	width: 22rem;
}
</style>
