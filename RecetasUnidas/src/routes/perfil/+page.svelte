<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';
	export let data;

	let usuario = '';

	const handleMensajeUsuario = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();

		if (error) {
			console.error(error);
		} else {
			usuario = data?.identities[0].identity_data?.first_name;
		}
	};

	onMount(() => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		handleMensajeUsuario();
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			handleMensajeUsuario();
		} else if (event === 'SIGNED_OUT') {
			window.location.href = '/login';
		}
	});

	const handleCrearRecetaButton = () => {
		window.location.href = '/crearReceta';
	};
</script>

<head>
	<title> Recetas Unidas </title>
</head>

<Nav />

<body>
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1>Perfil de {usuario}</h1>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
			</div>
		</div>
		<div class="row">
			<div class="col-12">

			</div>
		</div>
		<section id="publicacion_section">
			<h2 >Publicaciones</h2>
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
					</div>
				{/each}
			</div>
		</section>
	</div>
</body>

<style>
	.container {
		margin-top: 50px;
		display: flex;
	}
	.col-12 {
		text-align: left;
		padding-left: 50px;
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
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
		width: auto;
		
	}

	#publicacion_section {
		padding: 1rem;
		display: flex;
		width: 50%;
		flex-direction: column;
		margin-left: auto;
		margin-right: 5%;
		margin-top: 2%;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
	}
</style>