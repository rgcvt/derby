<template>
	<SidebarLayout>
		<div class="home-layout">
			<Derby />
			<h1>Derby</h1>
			<p>A webapp for creating and tracking pinecar races.</p>
			<router-link class="button" to="/cars">Get Started</router-link>
		</div>
	</SidebarLayout>
</template>
<script setup>
import Derby from '../icons/Derby.vue';
import SidebarLayout from '../layouts/SidebarLayout.vue';
</script>
<style scoped lang="scss">
.home-layout {
	max-width: 36ch;
	margin: auto;
	text-align: center;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	h1 {
		font-size: 3rem;
	}
	.logo {
		width: 50%;
		margin: 0 auto var(--space-sm) auto;
	}
}
</style>
