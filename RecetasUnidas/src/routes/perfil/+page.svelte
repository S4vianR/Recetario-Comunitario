<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let usuario = '';
	let dataRecetas: any[] = [];

	const handleMensajeUsuario = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();

		if (data) {
			usuario = data?.identities[0].identity_data?.first_name;
		}
	};

	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		handleMensajeUsuario();

		// Obtén el usuario actual
		const user = supabase.auth.getUser();

		// Si el usuario está autenticado, obtén su ID
		const userID = (await user).data.user?.id;

		// Query para obtener las recetas del usuario
		const {data} = await supabase.from('recetas').select('*').eq('idusuario', userID);

		if (data) {
			dataRecetas = data;
		}
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			handleMensajeUsuario();
		} else if (event === 'SIGNED_OUT') {
			window.location.href = '/login';
		}
	});
</script>

<head>
	<title> Recetas Unidas </title>
</head>

<Nav />

<body>
	<div class="container">
		<section id="profileSection">
			<h1>Perfil de {usuario}</h1>
		</section>
		<section id="publicacion_section">
			<div id="publicaciones_container">
				{#each dataRecetas as receta}
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
			</div>
		</section>
	</div>
</body>

<style>
	.container {
		padding: 1rem;
		display: grid;
		grid-template-columns: 40% 60%;
	}

	#publicacion {
		border: 1px solid #363636;
		padding: 0.5rem 1rem;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
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
		grid-template-columns: repeat(1, 1fr);
		gap: 2rem;
		padding: 0 1rem;
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
		align-items: flex-end;
	}

	#publicacion_section {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
	}

	#profileSection h1 {
		padding-top: 1rem;
	}
</style>
