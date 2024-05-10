import { reactive } from 'vue';

export const defaultSerialStore: SerialStore = {
	port: null,
	connected: false,
};

export const serialStore = reactive({
	serial: defaultSerialStore,
});
