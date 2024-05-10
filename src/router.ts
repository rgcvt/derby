import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Cars from './views/Cars.vue';
import Races from './views/Races.vue';
import Results from './views/Results.vue';
import RaceDisplay from './views/RaceDisplay.vue';
import Settings from './views/Settings.vue';

export default createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
		},
		{
			path: '/cars',
			component: Cars,
		},
		{
			path: '/races',
			component: Races,
		},
		{
			path: '/results',
			component: Results,
		},
		{
			path: '/race-display',
			component: RaceDisplay,
		},
		{
			path: '/settings',
			component: Settings,
		},
	],
});
