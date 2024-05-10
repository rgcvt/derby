<script lang="ts" setup>
import IconCar from '../components/IconCar.vue';
import IconList from '../components/IconList.vue';
import IconScan from '../components/IconScan.vue';
import IconTrophy from '../components/IconTrophy.vue';
import IconDerby from '../components/IconDerby.vue';
import SerialInterface from '../components/SerialInterface.vue';
const props = defineProps<{
	title: string;
}>();
</script>
<template>
	<div class="page-layout">
		<nav class="control-bar">
			<RouterLink class="home-link" to="/" title="home">
				<IconDerby />
			</RouterLink>
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
			<div class="header-actions">
				<SerialInterface />
				<slot name="header-actions"></slot>
			</div>
		</nav>

		<main>
			<div class="container">
				<header class="page-header">
					<h1>{{ props.title }}</h1>
					<div class="actions"><slot name="actions"></slot></div>
				</header>

				<slot name="main"></slot>
			</div>
		</main>
	</div>
</template>
<style lang="scss" scoped>
.home-link {
	display: flex;
	align-items: center;
	width: 3rem;
	height: 3rem;
	background: var(--color-primary);
	padding: 0.5rem;
	color: var(--color-light);
	transition: background-color 150ms;
	border-right: 1px solid var(--color-background-muted);
	&:hover {
		background: var(--color-primary-intense);
	}
}
.control-bar {
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-right: 0.5rem;
	position: sticky;
	top: 0;
	z-index: 1;
	background: var(--color-background);
	border-bottom: var(--border-width) solid var(--color-background-muted);
}
.nav-list {
	display: flex;
	gap: 1em;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	a {
		border-radius: var(--border-radius);
		line-height: 1;
		padding: 0.5em 0.75em;
		display: block;
		&.router-link-active {
			background: var(--color-background-muted);
		}
	}
}

.icon-link {
	font-size: 0.8rem;
	pointer-events: none;
	display: grid;
	grid-template-columns: 1.2em 1fr;
	align-items: center;
	gap: 0.5em;
}
.header-actions {
	margin-left: auto;
}
main {
	grid-area: main;
	padding: 2rem 1rem;
}
.page-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 2rem;
}
.container {
	width: 100%;
	max-width: 72rem;
	margin: 0 auto;
}
</style>
