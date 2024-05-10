<script lang="ts" setup>
import { ref } from 'vue';
import { carStore } from '../store/cars';
import { appStateStore } from '../store/appState';
import PageLayout from '../layouts/PageLayout.vue';
import RaceTimes from '../components/RaceTimes.vue';

const colors: LaneColor[] = ['red', 'blue', 'green', 'yellow'];
const cars = ref(carStore.cars);
const appState = ref(appStateStore.appState);
const canAddNewCar = ref(true);

const createCar = () => {
	canAddNewCar.value = false;
	let nextId = 1;
	if (cars.value.length > 0) {
		const ids = cars.value
			.map((c) => c.id)
			.sort((a, b) => a - b)
			.reverse();

		nextId = Number(ids[0]) + 1;
	}

	cars.value.push({
		id: nextId,
		driver: '',
		races: colors.map((c) => {
			return { lane: c, race: null, time: null };
		}),
	});
	moveFocus(`index-${cars.value.length - 1}-driver`);
};
const deleteCar = (i: number) => {
	cars.value.splice(i, 1);
	if (cars.value.length) {
		canAddNewCar.value = true;
	}
};

const checkCarId = (e: Event) => {
	const { target } = e;
	const t = target as HTMLInputElement;
	if (t.validity.patternMismatch) {
		canAddNewCar.value = false;
		t.setCustomValidity('Car numbers must be unique');
	} else {
		canAddNewCar.value = true;
		t.setCustomValidity('');
	}
	t.reportValidity();
};

const checkDriver = (e: Event) => {
	const { target } = e;
	const t = target as HTMLInputElement;
	if (t.validity.valueMissing) {
		canAddNewCar.value = false;
		t.setCustomValidity('Car must have a driver');
	} else {
		canAddNewCar.value = true;
		t.setCustomValidity('');
	}
	t.reportValidity();
};

const clearValidity = (e: Event) => {
	const { target } = e;
	const t = target as HTMLInputElement;
	canAddNewCar.value = true;
	t.setCustomValidity('');
};
const moveFocus = (id: string) => {
	setTimeout(() => {
		const el = document.getElementById(id);
		if (el) {
			el.focus();
		}
	}, 10);
};
const buildPattern = (i: number) => {
	const otherCars = [...cars.value];
	otherCars.splice(i, 1);
	return `^(?!(${otherCars.map((c) => c.id).join('|')})$).*$`;
};
</script>
<template>
	<PageLayout title="Cars">
		<template v-slot:title> Cars </template>
		<template v-slot:actions> </template>
		<template v-slot:main>
			<table>
				<thead>
					<tr>
						<th class="column-number" scope="col">Car</th>
						<th class="column-driver" scope="col">Driver</th>
						<th class="column-race-times" scope="col">Race Times</th>
						<th class="column-actions" scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(car, i) in cars">
						<td>
							<label class="input-group">
								<span class="hidden">Car Number</span>
								<vue-feather class="prepend" type="hash" stroke-width="3" size="14" />
								<input
									v-model="car.id"
									:pattern="buildPattern(i)"
									placeholder="X"
									name="number"
									:readonly="appState.racesCreated"
									required
									@blur="checkCarId($event)"
									@input="clearValidity($event)"
									type="number"
									min="1"
									max="1000"
									step="1"
								/>
							</label>
						</td>
						<td>
							<label class="input-group">
								<span class="hidden">Driver</span>
								<vue-feather class="prepend" type="user" stroke-width="3" size="14" />
								<input
									:id="'index-' + i + '-driver'"
									v-model="car.driver"
									type="text"
									placeholder="Add the driver's name"
									required
									@input="clearValidity($event)"
									@blur="checkDriver($event)"
									@keyup.enter="moveFocus('new-car')"
								/>
							</label>
						</td>
						<td>
							<RaceTimes :races="car.races" />
						</td>
						<td class="cell-actions-parent">
							<div class="cell-actions">
								<button
									v-if="!appState.racesCreated"
									class="button-ui danger"
									@click="deleteCar(i)"
									aria-label="delete car"
								>
									<vue-feather type="x" size="14" stroke-width="3" />
								</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="car-table-actions">
				<button v-if="!appState.racesCreated" :disabled="!canAddNewCar" @click="createCar" id="new-car">
					+ New Car
				</button>

				<template v-else>
					<p class="small">Races have been built, you'll need to delete the races to add more cars.</p>
					<p class="small">View the <RouterLink to="/races">races</RouterLink>.</p>
				</template>
			</div>
		</template>
	</PageLayout>
</template>
<style lang="scss" scoped>
.column-number {
	width: 5rem;
}
.column-race-times {
	width: 20rem;
}
input[name='number'] {
	max-width: 3.5rem;
}
.car-table-actions {
	margin-top: 1rem;
}
</style>
