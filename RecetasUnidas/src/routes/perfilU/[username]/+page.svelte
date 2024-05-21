<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let usuario: string = '';
	let dataRecetas: any[] = [];
	let profilePicture =
		'https://kaonlhtranrfojpknofp.supabase.co/storage/v1/object/sign/Fotos%20de%20Perfil/Captura%20desde%202024-05-01%2013-02-36.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGb3RvcyBkZSBQZXJmaWwvQ2FwdHVyYSBkZXNkZSAyMDI0LTA1LTAxIDEzLTAyLTM2LnBuZyIsImlhdCI6MTcxNDU5MTAwMSwiZXhwIjoyMDI5OTUxMDAxfQ.rLin9wagYkBo0n8twib4ejm7CwrFibSDhw4Fs3y4o-U&t=2024-05-01T19%3A16%3A41.998Z';

    const { params } = $page;
	const username = params.username;
	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		handleSupabaseVariables();

		// Obtén el usuario
		const user = await supabase.from('usuarios').select('*').eq('nombreusuario', username);
        console.log(user);
		// Si el usuario está autenticado, obtén su ID
		// Query para obtener las recetas del usuario
        const { data } = await supabase.from('recetas').select('*').eq('idusuario', user.data?.[0]?.usuario_uuid);

		if (data) {
			dataRecetas = data;
		}
	});

	const handleSupabaseVariables = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();
		usuario = data?.identities[0].identity_data?.first_name;
	};

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			handleSupabaseVariables();
		} else if (event === 'SIGNED_OUT') {
			window.location.href = '/login';
		}
	});

	import Modal from './modal.svelte';

	let isOpen = false;

	function openModal() {
		isOpen = true;
	}

	function closeModal() {
		isOpen = false;
	}
</script>

<Nav />
<body>
	<div class="container">
		<section id="profileSection">
			<h1>{username}</h1>
			<Modal bind:isOpen src={profilePicture} on:close={closeModal} />
			<button id="profilePictureButton" on:click={openModal}>
				<img id="profilePicture" src={profilePicture} alt="Foto de perfil" />
			</button>
		</section>
		<section id="publicacion_section">
			<h2>Publicaciones</h2>
			<div id="publicaciones_container">
				{#each dataRecetas as receta}
					<div id="publicacion">
						<div>
							<h3>{receta.tituloreceta}</h3>
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
		grid-template-columns: 30% 70%;
	}

    h1 {
        font-size: 3rem;
    }

	#publicacion {
		border: 1px solid #363636;
		padding: 0.5rem 1rem;
		width: 100%;
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
		width: 100%;
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
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
	}

	#profileSection {
		padding-top: 2rem;
        padding-left: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
	}

	#profilePictureButton {
		background-color: transparent;
		border: none;
		border-radius: 10rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	#profilePictureButton:hover {
		cursor: pointer;
	}

	#profilePicture {
		border-radius: 50%;
		width: 25rem;
		aspect-ratio: 1;
		border: #000 2px solid;
	}
</style>
