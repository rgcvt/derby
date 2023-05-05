<template>
	<div class="races">
		<Race v-for="(race, i) in races" :raceIndex="i" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { store } from '@/store.js';
import Race from '@/components/Race.vue';

const races = ref(store.appState.races);
</script>
<style scoped lang="scss">
.races {
	display: flex;
	flex-direction: column;
	gap: var(--space-md);
}
</style>
