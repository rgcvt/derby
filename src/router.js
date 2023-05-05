import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@/views/Home.vue'),
		},
		{
			path: '/cars',
			component: () => import('@/views/Cars.vue'),
		},
		{
			path: '/races',
			component: () => import('@/views/Races.vue'),
		},
		{
			path: '/results',
			component: () => import('@/views/Results.vue'),
		},
		{
			path: '/race-display',
			component: () => import('@/views/RaceDisplay.vue'),
		},
	],
});
