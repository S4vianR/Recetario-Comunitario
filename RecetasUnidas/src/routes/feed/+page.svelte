<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '/src/lib/assets/logo-removebg.png';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	onMount(() => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});
	});
</script>

<nav>
	<img src={logo} alt="Logo" width="60" height="60" id="logo" />
	<div class="first_div">
		<div id="searchBarContainer">
			<input type="search" name="searchBar" id="searchBar" />
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
			<li><a href="/feed">Inicio</a></li>
			<li><a href="#">Perfil</a></li>
			<li><a href="/cerrarSesion">Cerrar sesión</a></li>
		</ul>
	</div>
</nav>
<main>
	<section>
		<button id="crearRecetaButton"> Crear receta </button>
		<div id="profile">
			<img src={food_stand_day} alt="food_stand_day" width="80" height="80" />
			<div>
				<h4>Lalito Pamez</h4>
				<button>Ver perfil</button>
			</div>
		</div>
	</section>
	<section>b</section>
</main>

<style>
	nav {
		background-color: #3c8085;
		padding: 0.35rem 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 7svh;
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

	nav #searchBarContainer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	nav #searchBarContainer > button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	nav #searchBarContainer > input[type='search'] {
		padding: 0.3rem;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #000;
		width: 20rem;
		height: fit-content;
	}

	nav #searchBarContainer > input[type='search']:focus {
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

	main {
		display: grid;
		grid-template-columns: 15% 85%;
		height: 93svh;
	}

	main > section:nth-child(1),
	main > section:nth-child(2) {
		padding: 0.875rem 1rem;
	}

	main > section:nth-child(1) {
		background-color: #fdf5e4;
		width: 100%;
		border-right: 1px solid #a99f89;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
	}

	main > section:nth-child(2) {
		background-color: #fff;
		width: 100%;
	}

	#crearRecetaButton {
		width: 9.6875rem;
		height: 2.5625rem;
		border-radius: 3.125rem;
		border: 1px solid #000;
		background: #9d3726;
		color: #fff;
		text-align: center;
		font-size: 0.775rem;
		font-weight: 700;
		transition: background-color 0.2s ease-in-out;
	}

	#crearRecetaButton:hover {
		cursor: pointer;
		background: #7e2719;
	}

	#profile {
		padding: 0.5rem;
		border: 1px solid #000;
		display: flex;
		flex-direction: row;
		gap: 0.875rem;
		justify-content: center;
		align-items: center;
	}

	#profile div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 0.875rem;
	}

	#profile h4 {
		font-size: 1rem;
	}

	#profile button {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 1.875rem;
		width: 6rem;
		font-size: 0.875rem;
		background-color: #236569;
		color: #fff;
		font-weight: 600;
		padding: 0.5rem;
		border-radius: 2rem;
		border: 1px solid #000;
		transition: background-color 0.3s ease-in-out;
	}

	#profile button:hover {
		background-color: #2d7e83;
		cursor: pointer;
	}
</style>
