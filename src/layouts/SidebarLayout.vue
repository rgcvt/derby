<template>
	<div class="sidebar-layout">
		<div class="nav-wrapper">
			<nav>
				<img class="logo" src="/RGC_Logo.svg" alt="rgc-logo" />
				<router-link to="/cars">
					<div class="link-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M22 13.5V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V13.5L0.757464 13.1894C0.312297 13.0781 0 12.6781 0 12.2192V11.5C0 11.2239 0.223858 11 0.5 11H2.375L4.51334 5.29775C4.80607 4.51715 5.55231 4 6.386 4H17.614C18.4477 4 19.1939 4.51715 19.4867 5.29775L21.625 11H23.5C23.7761 11 24 11.2239 24 11.5V12.2192C24 12.6781 23.6877 13.0781 23.2425 13.1894L22 13.5ZM4 15V17C4 17.5523 4.44772 18 5 18H8.24496C8.3272 18 8.40818 17.9797 8.4807 17.9409C8.72418 17.8107 8.81602 17.5078 8.68582 17.2643L8.68588 17.2643C7.87868 15.7548 6.31672 15 4 15ZM20 15C17.6833 15 16.1213 15.7548 15.3141 17.2643L15.3142 17.2643C15.184 17.5078 15.2758 17.8107 15.5193 17.9409C15.5918 17.9797 15.6728 18 15.755 18H19C19.5523 18 20 17.5523 20 17V15ZM6 6L4.43874 10.6838C4.40475 10.7857 4.38743 10.8925 4.38743 11C4.38743 11.5523 4.83514 12 5.38743 12H18.6126C18.7201 12 18.8268 11.9827 18.9288 11.9487C19.4527 11.774 19.7359 11.2077 19.5613 10.6838L18 6H6Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					<div class="link-title">Cars</div>
				</router-link>
				<router-link to="/races">
					<div class="link-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M8 4H21V6H8V4ZM5 3V6H6V7H3V6H4V4H3V3H5ZM3 14V11.5H5V11H3V10H6V12.5H4V13H6V14H3ZM5 19.5H3V18.5H5V18H3V17H6V21H3V20H5V19.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					<div class="link-title">Races</div>
				</router-link>
				<router-link to="/results">
					<div class="link-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M13.0049 16.941V19.0029H18.0049V21.0029H6.00488V19.0029H11.0049V16.941C7.05857 16.4489 4.00488 13.0825 4.00488 9.00293V3.00293H20.0049V9.00293C20.0049 13.0825 16.9512 16.4489 13.0049 16.941ZM1.00488 5.00293H3.00488V9.00293H1.00488V5.00293ZM21.0049 5.00293H23.0049V9.00293H21.0049V5.00293Z"
								fill="currentColor"
							></path>
						</svg>
					</div>
					<div class="link-title">Results</div>
				</router-link>
				<router-link to="/race-display">
					<div class="link-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"
								fill="currentColor"
							></path>
						</svg>
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
