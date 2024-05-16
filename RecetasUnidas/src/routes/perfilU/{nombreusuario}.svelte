<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let usuario: string = '';
	let password: string = '';
	let name: string = '';
	let mail: string;
	let dataRecetas: any[] = [];
	let profilePicture =
		'https://kaonlhtranrfojpknofp.supabase.co/storage/v1/object/sign/Fotos%20de%20Perfil/Captura%20desde%202024-05-01%2013-02-36.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGb3RvcyBkZSBQZXJmaWwvQ2FwdHVyYSBkZXNkZSAyMDI0LTA1LTAxIDEzLTAyLTM2LnBuZyIsImlhdCI6MTcxNDU5MTAwMSwiZXhwIjoyMDI5OTUxMDAxfQ.rLin9wagYkBo0n8twib4ejm7CwrFibSDhw4Fs3y4o-U&t=2024-05-01T19%3A16%3A41.998Z';

	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		handleSupabaseVariables();

		// Obtén el usuario actual
		const user = supabase.auth.getUser();

		// Si el usuario está autenticado, obtén su ID
		const userID = (await user).data.user?.id;

		// Query para obtener las recetas del usuario
		const { data } = await supabase.from('recetas').select('*').eq('idusuario', userID);

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

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		const { data, error } = await supabase.auth.updateUser({
			// Update user's email and first_name metadata
			email: mail
		});
		if (error) {
			alert('Error al cambiar datos');
		} else {
			alert('Cambios guardados');
			handleFormReset(event);
		}
	};

	const handleFormReset = (event: any) => {
		event.preventDefault();
		const form = document.querySelector('form') as HTMLFormElement;
		form.reset();
	};

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
			<h1>Perfil de {usuario}</h1>
			<button id="profilePictureButton">
				<img id="profilePicture" src={profilePicture} alt="Foto de perfil" />
			</button>
			<div id="profile">
				<form on:submit={handleFormSubmit} method="get">
					<h3>Modificar Datos</h3>
					<div>
						<label for="email">Correo electrónico:</label>
						<input id="email" type="email" bind:value={mail} />
					</div>
					<div>
						<label for="password">Contraseña:</label>
						<input id="password" type="password" bind:value={password} />
					</div>
					<button type="submit">Guardar Cambios</button>
				</form>
			</div>
		</section>
		<section id="publicacion_section">
			<h2>Publicaciones</h2>
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
		padding-top: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 1rem;
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
		width: 200px;
		aspect-ratio: 1;
		border: #000 2px solid;
	}

	form button {
		padding: 0.5rem 1rem;
		background-color: #3c8085;
		color: #fff;
		font-size: 1.1rem;
		border: 1px solid rgba(0, 0, 0, 0.5);
		border-radius: 0.5rem;
		cursor: pointer;
		transition: background-color 0.5s ease-in-out;
		width: 15rem;
	}

	form button:hover {
		background-color: #4a9ca2;
	}

	form input[type='email'],
	form input[type='password'] {
		width: 100%;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.7rem;
	}

	form label,
	form input[type='email'],
	form input[type='password'] {
		font-size: 1rem;
	}

	form label {
		font-weight: 600;
	}

	form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		width: 25rem;
		justify-content: center;
		align-items: flex-end;
		gap: 1rem;
	}

	form h3 {
		align-self: flex-start;
	}

	form div {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
