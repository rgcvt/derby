<template>
	<table>
		<caption>
			Cars
		</caption>
		<thead>
			<tr>
				<th>Number</th>
				<th>Driver</th>
				<th>Red Time</th>
				<th>Yellow Time</th>
				<th>Green Time</th>
				<th>Blue Time</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(car, i) in cars">
				<td>{{ car.id }}</td>
				<td>{{ car.driver }}</td>
				<td>{{ car.red }}</td>
				<td>{{ car.yellow }}</td>
				<td>{{ car.green }}</td>
				<td>{{ car.blue }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { store } from '@/store.js';

const cars = ref(store.appState.cars);
</script>
