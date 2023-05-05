import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/data',
			component: () => import('@/views/Data.vue'),
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
