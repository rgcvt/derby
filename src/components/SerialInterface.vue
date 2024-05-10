<script lang="ts" setup>
import { ref, watch } from 'vue';
import { appStateStore } from '../store/appState';
import { raceStore } from '../store/races';
const races = ref(raceStore.races);
const appState = ref(appStateStore.appState);

let serialString = '';
let times: LaneTimes = {
	red: null,
	blue: null,
	green: null,
	yellow: null,
};

let port: SerialPort | undefined;
appState.value.serialConnected = port ? true : false;

async function connect(): Promise<void> {
	try {
		port = await navigator.serial.requestPort();
		await port.open({ baudRate: 9600 }); // adjust baudRate as per your requirement
		appState.value.serialConnected = true;
		read();
		console.log('Connected to serial port:', port.getInfo());
	} catch (error) {
		appState.value.serialConnected = false;
		console.error('Failed to connect to serial port:', error);
	}
}

async function read(): Promise<void> {
	try {
		if (!port) throw new Error('Serial port not connected');
		const reader = port.readable?.getReader();
		if (!reader) throw new Error('Reader was not created');
		while (true) {
			const { value, done } = await reader.read();
			if (done) {
				console.log('Read operation complete');
				reader.releaseLock();
				break;
			}
			console.log('Received data:', new TextDecoder().decode(value));
			const string = new TextDecoder().decode(value);
			serialString += string;

			if (serialString.length > 31) {
				times = {
					red: Number(serialString.slice(2, 7)),
					blue: Number(serialString.slice(10, 15)),
					green: Number(serialString.slice(18, 23)),
					yellow: Number(serialString.slice(26, 31)),
				};

				const i = appState.value.currentRace;

				if (i !== null) {
					races.value[i].lanes.forEach((lane) => {
						lane.time = times[lane.color];
					});
					console.log(races.value[i]);
				}

				appState.value.raceOngoing = false;

				serialString = '';
			}
		}
	} catch (error) {
		console.error('Error reading from serial port:', error);
	}
}

async function write(data: string): Promise<void> {
	try {
		if (!port) throw new Error('Serial port not connected');
		const writer = port.writable?.getWriter();
		if (!writer) throw new Error('Writer was not created');
		const dataArrayBuffer = new TextEncoder().encode(data);
		await writer.write(dataArrayBuffer);
		console.log('Data sent:', data);
		writer.releaseLock();
	} catch (error) {
		console.error('Error writing to serial port:', error);
	}
}

watch(
	() => appState.value.raceOngoing,
	(newValue) => {
		if (newValue === true) {
			write('T');
			console.log(`Sending start command`);
		}
	}
);
</script>
<template>
	<div class="serial-status" :data-color="appState.serialConnected ? 'success' : 'danger'">
		<div class="dot"></div>
		<div class="title">
			{{ appState.serialConnected ? 'Serial Connected' : 'Serial Disconnected' }}
		</div>
		<button class="button-ui connect-button" v-if="!appState.serialConnected" @click="connect">
			<vue-feather type="link-2" stroke-width="3" size="14"></vue-feather>&nbsp;Connect
		</button>
	</div>
</template>
<style lang="scss" scoped>
.serial-status {
	position: relative;
	z-index: 1;
	font-size: 0.8rem;
	color: var(--color-highlight);
	gap: 0.5rem;
	line-height: 1;
	display: flex;
	align-items: center;
	padding: 0.25rem 0.25rem 0.25rem 0.5rem;
	border: var(--border-width) solid var(--color-highlight);
	border-radius: 0.4rem;
	overflow: hidden;
	&:before {
		content: '';
		left: 0;
		top: 0;
		position: absolute;
		height: 100%;
		width: 100%;
		background: var(--color-highlight-muted);
		opacity: 0.1;
		z-index: -1;
	}
	//box-shadow: 0 0 0.2rem var(--color-highlight-muted);
	.dot {
		height: 0.5rem;
		width: 0.5rem;
		border-radius: 50%;
		background: var(--color-highlight);
		border: 1px solid var(--color-highlight-intense);
	}
}
.connect-button {
	svg {
		margin-right: 0.5em;
	}
}
</style>
