<template>
	<div class="input-wrapper">
		<input
			v-if="editing && (isText || isNumber)"
			class="inline-input"
			:type="type"
			:value="value"
			:placeholder="placeholder"
			ref="inputEl"
			v-on:keyup.enter="handleEnter"
			@input="handleInput"
			@blur="handleBlur"
		/>

		<textarea
			v-else-if="editing && isTextArea"
			class="inline-input"
			:value="value"
			:placeholder="placeholder"
			ref="inputEl"
			:rows="rows"
			:cols="cols"
			@input="handleInput"
			@blur="handleBlur"
		></textarea>

		<select
			v-else-if="editing && isSelect"
			class="inline-input"
			:value="value"
			ref="inputEl"
			@change="handleChange"
			@blur="handleBlur"
		>
			<option v-if="placeholder" disabled value>{{ placeholder }}</option>
			<option :key="i" v-for="(o, i) in options" :value="o.value">
				{{ o.label }}
			</option>
		</select>
		<button v-if="editing" class="save">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path
					d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
					fill="currentColor"
				></path>
			</svg>
		</button>

		<span v-else class="inline-label" @click="toggle()">
			<span v-if="placeholder && !value" class="placeholder">{{ label }}</span>
			<span v-else-if="isCurrency">${{ label.toFixed(2) }}</span>
			<span v-else>{{ label }}</span>
			<button class="edit-icon" v-if="isText || isNumber">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path
						d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"
						fill="currentColor"
					></path>
				</svg>
			</button>
		</span>
	</div>
</template>
<script>
export default {
	name: 'InlineInput',
	props: {
		value: {
			type: [Number, String],
			default: () => '',
		},
		type: {
			type: String,
			default: () => 'text',
		},
		placeholder: {
			type: String,
			default: () => '',
		},
		labelClasses: {
			type: String,
			default: () => '',
		},
		inputClasses: {
			type: String,
			default: () => '',
		},
		rows: {
			type: Number,
			default: () => 2,
		},
		cols: {
			type: Number,
			default: () => 20,
		},
		options: {
			type: Array,
			default: () => [],
		},
		isCurrency: {
			type: Boolean,
			default: () => false,
		},
	},
	data() {
		return {
			editing: false,
			selectedIndex: this.options.findIndex((o) => o.value === this.value),
		};
	},
	computed: {
		isText() {
			return this.type === 'text';
		},
		isNumber() {
			return this.type === 'number';
		},
		isTextArea() {
			return this.type === 'textarea';
		},
		isSelect() {
			return this.type === 'select';
		},
		label() {
			if (this.isNumber)
				return this.value === '' ? this.placeholder : this.value;
			if (this.isText || this.isTextArea)
				return this.value ? this.value : this.placeholder;
			// Select
			return this.selectedIndex === -1
				? this.placeholder
				: this.options[this.selectedIndex].label;
		},
	},
	methods: {
		toggle() {
			this.editing = !this.editing;

			if (this.editing) {
				this.$nextTick(() => {
					this.$refs.inputEl.focus();
				});
			}
		},
		handleEnter() {
			this.$refs.inputEl.blur();
		},
		handleBlur() {
			this.toggle();
			this.emitValue();
			this.$emit('blur', this.getValue());
		},
		handleInput() {
			this.emitValue();
		},
		handleChange(e) {
			this.selectedIndex = this.placeholder
				? e.target.selectedIndex - 1
				: e.target.selectedIndex;
			this.emitValue();
		},
		emitValue() {
			this.$emit('input', this.getValue());
		},
		getValue() {
			return this.isNumber
				? +this.$refs.inputEl.value
				: this.$refs.inputEl.value;
		},
	},
};
</script>

<style lang="scss" scoped>
.input-wrapper {
	position: relative;
	cursor: text;
	//width: max-content;
}
.inline-label,
.inline-input {
	line-height: 1;
	display: block;
	font-size: 0.8rem;
	height: 2rem;
	padding: 0.5rem 1rem 0.5rem 0.5rem;
	margin: 0;
}
.inline-label {
	border: var(--border-width) solid var(--color-ui-muted);
	border-radius: var(--border-radius);
}
button.save,
button.edit-icon {
	all: unset;
	box-sizing: border-box;
	cursor: pointer;
	display: block;
	height: 2rem;
	width: 1rem;
	padding: 0.5rem 0;
	position: absolute;
	right: 0.25rem;
	top: 0;
	svg {
		color: var(--color-ui-muted);
	}
	&:hover {
		svg {
			color: var(--color-text-intense);
		}
	}
}
button.edit-icon {
	svg {
		margin-right: 0.5rem;
		width: 0.75rem;
		height: 0.75rem;
		object-fit: contain;
	}
}
button.save svg {
	width: 1rem;
	height: 1rem;
	object-fit: contain;
}
</style>
