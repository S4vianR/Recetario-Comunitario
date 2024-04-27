<script lang="ts">
	export let data;
	import food_stand_day from '/src/lib/assets/food-stand-day.png';
	import Nav from '../../components/Nav.svelte';
	import { onMount } from 'svelte';

	let respuesta: boolean;

	const handleCrearRecetaButton = () => {
		window.location.href = '/crearReceta';
	};

	// onMount(() => {
	// 	// When the url has a get parameter, it means that the user is searching for something
	// 	const urlParams = new URLSearchParams(window.location.search);
	// 	const searchQuery = urlParams.get('search');

	// 	// If the user is searching for something, filter the recetas
	// 	if (searchQuery) {
	// 		data.recetas = data.recetas.filter((receta) => {
	// 			return receta.tituloreceta.toLowerCase().includes(searchQuery.toLowerCase());
	// 		});
	// 	}
	// });

	onMount(() => {
		// Cuando la url tiene un parámetro get, significa que el usuario está buscando algo
		const urlParams = new URLSearchParams(window.location.search);
		const searchQuery = urlParams.get('search');

		// Si el usuario está buscando algo, filtra las recetas
		if (searchQuery) {
			data.recetas = data.recetas.filter((receta) => {
				return receta.tituloreceta.toLowerCase().includes(searchQuery.toLowerCase());
			});

			// Si no se encontraron recetas, establece respuesta en un mensaje de error
			if (data.recetas.length === 0) {
				respuesta = false;
			}
		}
	});

	const handleButtonRefresh = () => {
		window.location.href = '/feed';
	};
</script>

<Nav />
<main>
	<section>
		<button id="crearRecetaButton" on:click={handleCrearRecetaButton}> Crear receta </button>
		<div id="profile">
			<img src={food_stand_day} alt="food_stand_day" width="80" height="80" />
			<div>
				<h4>Lalito Pamez</h4>
				<button>Ver perfil</button>
			</div>
		</div>
	</section>
	<section>
		<h2>Publicaciones</h2>
		<div id="publicaciones_container">
			{#if respuesta == false}
				<div id="mensajeContainer">
					<h3 id="mensajeNoEncontrado">No se encontraron recetas con ese nombre o similares</h3>
					<button on:click={handleButtonRefresh}> Refrescar </button>
				</div>
			{:else}
				{#each data.recetas as receta}
					<div id="publicacion">
						<div>
							<h3>{receta.tituloreceta}</h3>
							{#if receta.valoracionreceta == null || receta.valoracionreceta === 0}
								<p><span>Valoración:</span> Sin valoración</p>
							{:else}
								<p><span>Valoración:</span> {receta.valoracionreceta}</p>
							{/if}
							<span>{receta.descripcionreceta}</span>
							<p><span>Tiempo de preparación:</span> {receta.tiempopreparacionreceta} minutos</p>
							<p><span>Dificultad:</span> {receta.dificultadreceta}</p>
						</div>
						<div>
							{#if receta.imagenreceta}
								<img src={receta.imagenreceta} alt={receta.tituloreceta} />
							{:else}
								<img src={food_stand_day} alt="food_stand_day" />
							{/if}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>
</main>

<style>
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
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;
	}

	main > section:nth-child(2) > h2 {
		padding-top: 0.5rem;
		padding-left: 1rem;
		justify-self: center;
		align-self: flex-start;
	}

	#publicacion {
		border: 1px solid #363636;
		padding: 0.5rem 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		min-height: 20rem;
	}

	#publicacion > div:nth-child(1) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
	}

	#publicacion > div:nth-child(2) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#publicacion p {
		text-transform: capitalize;
	}

	#publicacion p > span {
		font-weight: 600;
	}

	#publicacion img {
		border-radius: 0.5rem;
		width: 230px;
		aspect-ratio: 1;
	}

	#publicaciones_container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		align-items: center;
		padding: 0 1rem;
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

	#mensajeContainer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
		padding: 1rem;
	}

	#mensajeNoEncontrado {
		text-align: center;
		font-size: 1.2rem;
		color: #d2042d;
	}

	#mensajeContainer button {
		width: 7.6875rem;
		height: 1.8625rem;
		border-radius: 3.125rem;
		border: 1px solid #000;
		background: #9d3726;
		color: #fff;
		text-align: center;
		font-size: 0.775rem;
		font-weight: 700;
		transition: background-color 0.2s ease-in-out;
	}

	#mensajeContainer button:hover {
		cursor: pointer;
		background: #7e2719;
	}
</style>
