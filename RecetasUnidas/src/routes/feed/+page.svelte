<script lang="ts">
	export let data;
	import food_stand_day from '/src/lib/assets/food-stand-day.png';
	import Nav from '../../components/Nav.svelte';
	import { onMount } from 'svelte';

	const handleCrearRecetaButton = () => {
		window.location.href = '/crearReceta';
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
			{#each data.recetas as receta}
				<div id="publicacion">
					<h4>{receta.tituloreceta}</h4>
					{#if receta.valoracionreceta == null || receta.valoracionreceta == 0}
						<p><span>Valoración:</span> Sin valoración</p>
					{:else}
						<p><span>Valoración:</span> {receta.valoracionreceta}</p>
					{/if}
					{#if receta.tiempopreparacionreceta == 1}
						<p><span>Tiempo de preparación:</span> {receta.tiempopreparacionreceta} minuto</p>
					{:else}
						<p><span>Tiempo de preparación:</span> {receta.tiempopreparacionreceta} minutos</p>
					{/if}
					<span>{receta.descripcionreceta}</span>
					{#if receta.imagenreceta}
						<img src={receta.imagenreceta} alt={receta.tituloreceta} width="200" height="200" />
					{:else}
						<img src={food_stand_day} alt="food_stand_day" height="200" />
					{/if}
					<p><span>Tiempo de preparación:</span> {receta.tiempopreparacionreceta} minutos</p>
					<p><span>Dificultad:</span> {receta.dificultadreceta}</p>
				</div>
			{/each}
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
		justify-self: center;
		align-self: flex-start;
	}

	#publicacion {
		border: 1px solid #363636;
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 1rem;
	}

	#publicacion p {
		text-transform: capitalize;
	}

	#publicacion p > span {
		font-weight: 600;
	}

	#publicaciones_container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
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
