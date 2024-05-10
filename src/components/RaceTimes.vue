<script setup lang="ts">
const props = defineProps<{
	races: CarRace[];
}>();
</script>
<template>
	<ul class="race-times">
		<li class="race-time" v-for="race in props.races">
			<div class="color-dot" :style="`--color-dot:var(--color-${race.time ? race.lane : 'ui'})`"></div>
			<time>{{ race.time ? race.time.toFixed(3) : '0.000' }}</time>
		</li>
	</ul>
</template>
<style lang="scss" scoped>
.race-times {
	margin: 0.25rem 0;
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: repeat(4, 3.75rem);
	gap: 1rem;
}
.race-time {
	display: grid;
	grid-template-columns: 1ch 1fr;
	gap: 0.25rem;
	align-items: center;
}
.color-dot {
	width: 1ch;
	height: 1ch;
	border-radius: 50%;
	background: var(--color-dot);
}
</style>
