<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '/src/lib/assets/logo-removebg.png';

	onMount(() => {
		const logo = (document.getElementById('logo') as HTMLElement) || null;
		logo.addEventListener('click', () => {
			window.location.href = '/feed';
		});
	});
</script>

<nav>
	<img src={logo} alt="Logo" width="60" height="60" id="logo" />
	<div class="first_div">
		<div id="searchBar">
			<input type="search" name="" id="" />
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="32"
					height="32"
					fill="currentColor"
				>
					<path
						d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
					></path>
				</svg>
			</button>
		</div>
		<ul>
			<li><a href="#">Inicio</a></li>
			<li><a href="#">Perfil</a></li>
		</ul>
	</div>
</nav>
<main>Este es el feed principal</main>

<style>
	nav {
		background-color: #3c8085;
		padding: 0.35rem 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	nav #logo:hover {
		cursor: pointer;
	}

	nav .first_div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 3rem;
	}

	nav #searchBar {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	nav #searchBar > button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	nav #searchBar > input[type='search'] {
		padding: 0.3rem;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #000;
		width: 20rem;
		height: fit-content;
	}

	nav #searchBar > input[type='search']:focus {
		outline: 0.05rem solid #000;
	}

	nav ul {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	nav ul li {
		list-style: none;
	}

	nav ul li a {
		color: white;
		text-decoration: none;
		font-weight: 600;
	}
</style>
