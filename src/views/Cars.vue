<template>
	<SidebarLayout>
		<PageHeader>
			<template v-slot:title>Cars</template>
			<template v-slot:action>
				<div v-if="races.length == 0">
					<button @click="sortCars"><SortDesc /> Sort</button>
				</div>
			</template>
		</PageHeader>
		<div class="cars">
			<div v-for="(car, i) in cars" class="car">
				<div class="number">
					<label>Number</label>
					<inline-input
						type="text"
						@blur="updateNumber($event, i)"
						requied
						:value="car.id"
					/>
				</div>
				<div class="driver">
					<label>Driver</label>
					<inline-input
						type="text"
						@blur="updateDriver($event, i)"
						required
						:value="car.driver"
					/>
				</div>
				<div>
					<label>Race Times</label>
					<div class="race-times">
						<div v-for="(race, i) in car.races.sort((a, b) => a.race - b.race)">
							<span v-if="race.time" class="color-dot" :data-color="race.lane"
								>⏺</span
							>
							<span v-else class="color-dot">⏺</span>
							{{ race.time }}
						</div>
					</div>
				</div>

				<div class="delete-action">
					<button
						class="delete"
						v-if="races.length == 0"
						@click="deleteCar($event, i)"
						title="delete"
					>
						<Trash />
					</button>
				</div>
			</div>
		</div>
		<form
			v-if="formVisible"
			name="new-car"
			class="car"
			@submit.prevent="addCar($event)"
		>
			<div class="number">
				<label>Number</label>
				<input name="number" type="text" requied />
			</div>
			<div class="driver">
				<label>Driver</label>
				<input name="driver" type="text" required />
			</div>
			<button
				type="button"
				class="delete"
				@click="
					() => {
						formVisible = !formVisible;
					}
				"
			>
				<Close />
			</button>
			<button class="add"><Add /></button>
		</form>
		<button
			class="new-car-button"
			v-if="!formVisible && races.length == 0"
			@click="showForm"
		>
			+ New Car
		</button>
	</SidebarLayout>
</template>
<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { store } from '@/store.js';
import InlineInput from '@/components/InlineInput.vue';
import SidebarLayout from '@/layouts/SidebarLayout.vue';
import PageHeader from '@/components/PageHeader.vue';
import Trash from '@/icons/Trash.vue';
import Add from '@/icons/Add.vue';
import Close from '@/icons/Close.vue';
import SortDesc from '@/icons/SortDesc.vue';

const cars = ref(store.appState.cars);
const races = ref(store.appState.races);
const formVisible = ref(false);

const colors = ['red', 'yellow', 'green', 'blue'];

const updateDriver = (driver, i) => {
	cars.value[i].driver = driver;
};
const updateNumber = (number, i) => {
	cars.value[i].id = number;
};

const showForm = () => {
	formVisible.value = true;

	nextTick(() => {
		const number = document.querySelector('[name="number"]');
		//number.value = cars.value.length + 1;
		number.focus();
	});
};

const addCar = (e) => {
	const { number, driver } = Object.fromEntries(new FormData(e.target));
	// check for duplicate ids
	if (cars.value.find((c) => c.id == number)) {
		alert("A car's number must be unique.");
	} else {
		formVisible.value = true;
		const newCar = {
			id: number,
			driver: driver,
			races: colors.map((c) => {
				return { lane: c, race: null, time: null };
			}),
		};
		cars.value.push(newCar);
	}
	e.target.reset();
	formVisible.value = false;
};

const deleteCar = (e, i) => {
	cars.value.splice(i, 1);
};

const sortCars = () => {
	cars.value.sort((a, b) => a.id - b.id);
};
</script>
<style scoped lang="scss">
label {
	margin-bottom: 0.25rem;
	color: var(--color-ui-intense);
}
.cars {
	display: flex;
	flex-direction: column;
	gap: var(--border-radius);
}
.car {
	display: flex;
	align-items: flex-end;
	background: var(--color-background-card);
	border-radius: var(--border-radius);
	padding: 0.5rem;
	gap: var(--space-sm);
	.number {
		width: 4rem;
	}
}
.driver {
	flex-grow: 1;
}
form.car {
	input {
		margin: 0;
	}
}
.new-car-button,
form.car {
	padding: 0.5rem;
	width: 100%;
	height: 4.5rem;
	margin-top: var(--space-sm);
	border: var(--border-width) solid var(--color-background-card);
	background: transparent;
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
	width: 16rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	font-size: 0.8rem;
	color: var(--color-ui-intense);
	font-weight: 600;
}
button.delete {
	padding: 0.5rem;
	background: transparent;
	border: transparent;
	opacity: 0.75;
	transition: opacity 150ms;
	&:hover {
		opacity: 1;
	}
}
button.add {
	padding: 0.5rem;
}
</style>
