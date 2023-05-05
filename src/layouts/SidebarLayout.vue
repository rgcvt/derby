<template>
	<div class="sidebar-layout">
		<div class="nav-wrapper">
			<nav>
				<router-link to="/">
					<Derby />
				</router-link>
				<router-link to="/cars">
					<div class="link-icon">
						<Car />
					</div>
					<div class="link-title">Cars</div>
				</router-link>
				<router-link to="/races">
					<div class="link-icon">
						<OrderedList />
					</div>
					<div class="link-title">Races</div>
				</router-link>
				<router-link to="/results">
					<div class="link-icon">
						<Trophy />
					</div>
					<div class="link-title">Results</div>
				</router-link>
				<router-link to="/race-display">
					<div class="link-icon">
						<Display />
					</div>
					<div class="link-title">Display</div>
				</router-link>
			</nav>
		</div>
		<main class="content-wrapper">
			<slot></slot>
		</main>
	</div>
</template>
<script setup>
import Derby from '@/icons/Derby.vue';
import Car from '@/icons/Car.vue';
import OrderedList from '@/icons/OrderedList.vue';
import Trophy from '@/icons/Trophy.vue';
import Display from '@/icons/Display.vue';
</script>
<style scoped lang="scss">
.sidebar-layout {
	display: grid;
	grid-template-columns: 5rem 1fr;
}
.logo {
	display: block;
	width: 4rem;
	height: 4rem;
	object-fit: contain;
	padding: 0.5rem;
}
.nav-wrapper {
	min-height: 100vh;
	//	background: var(--color-background-intense);
	position: relative;
	nav {
		position: sticky;
		top: 0;
		padding: 0.5rem;
	}
	a {
		margin: 0.5rem 0;
		font-size: 0.8rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.25rem;
		width: 4rem;
		height: 4rem;
		border-radius: var(--border-radius);
		text-align: center;
		&:hover {
			background: var(--color-background-card);
		}
		* {
			pointer-events: none;
		}
		&.router-link-active {
			background: var(--color-background-card);
		}
	}
	.link-icon {
		width: 1.25rem;
		height: 1.25rem;
		object-fit: contain;
	}
}
.content-wrapper {
	padding: var(--space-lg);
	max-width: 1400px;
	width: 100%;
	margin: 0 auto;
}
</style>
