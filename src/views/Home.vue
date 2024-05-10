<script lang="ts" setup>
import IconCar from '../components/IconCar.vue';
import IconDerby from '../components/IconDerby.vue';
import IconList from '../components/IconList.vue';
import IconScan from '../components/IconScan.vue';
import IconTrophy from '../components/IconTrophy.vue';
</script>
<template>
	<main>
		<h1><IconDerby /> Derby</h1>
		<ul class="nav-list">
			<li>
				<RouterLink to="/cars">
					<div class="icon-link">
						<IconCar />
						<div class="title">Cars</div>
					</div>
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/races">
					<div class="icon-link">
						<IconList />
						<div class="title">Races</div>
					</div>
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/results">
					<div class="icon-link">
						<IconTrophy />
						<div class="title">Results</div>
					</div>
				</RouterLink>
			</li>
			<li>
				<RouterLink to="/race-display">
					<div class="icon-link">
						<IconScan />
						<div class="title">Display</div>
					</div>
				</RouterLink>
			</li>
		</ul>
	</main>
</template>
<style lang="scss" scoped>
main {
	min-height: 100vh;
	min-height: 100dvh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
}
h1 {
	font-size: 5rem;
	font-weight: 400;
	svg {
		width: 16rem;
		height: auto;
	}
}
.nav-list {
	margin-top: 4rem;
	display: flex;
	gap: 2rem;
	font-weight: 800;
	svg {
		width: 4rem;
		height: 4rem;
		margin-bottom: 0.5rem;
	}
	li {
		background: var(--color-background);
	}
}
</style>
