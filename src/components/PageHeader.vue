<template>
	<header class="page-header">
		<div class="header-layout">
			<h1><slot name="title"></slot></h1>
			<div class="action">
				<slot name="action"></slot>
			</div>
		</div>
		<hr />
	</header>
</template>
<style scoped>
.page-header {
	margin-bottom: 3rem;
}
.header-layout {
	display: flex;
}
.action {
	text-align: right;
	margin-left: auto;
}
</style>
