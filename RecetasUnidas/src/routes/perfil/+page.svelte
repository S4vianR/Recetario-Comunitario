<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let usuario: string = '';
	let desc = '';
	let dataRecetas: any[] = [];
	let profilePicture: string;

	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		const user = supabase.auth.getUser();
		const userID = (await user).data.user?.id;

		const userD = await supabase.from('usuarios').select('*').eq('usuario_uuid', userID);
		desc = userD.data?.[0]?.descripcion;
		usuario = userD.data?.[0]?.nombreusuario;

		// Query para obtener las recetas del usuario
		const { data } = await supabase.from('recetas').select('*').eq('idusuario', userID);

		if (data) {
			dataRecetas = data;
		}
	});

	afterUpdate(() => {
		for (let receta of dataRecetas) {
			handleImageRecovery(receta.idreceta, receta.tituloreceta);
		}
	});

	beforeUpdate(() => {
		fetchProfilePicture();
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_OUT') {
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

	const handleImageRecovery = async (idReceta: number, nombreReceta: string) => {
		// console.log("Receta ID: ", idReceta, "Receta Name: ", nombreReceta);
		let imagenReceta =
			(document.getElementById(`imagenReceta-${idReceta}`) as HTMLImageElement) || null;
		// console.log(imagenReceta.alt);
		// const { data } = supabase.storage.from('public-bucket').getPublicUrl('/avatar1.png');
		// Following the example above, you can get the public URL of the image and set it to the imageRecetaURL variable, the name of the image is the same as the name of the recipe but in lowercase and spaced with hyphens

		//const nombreImagen = data.recetas[0].tituloreceta.toLowerCase().replace(/ /g, '-');
		// For each recipe, get the image

		let nombreImagen: any;
		nombreImagen = nombreReceta.toLowerCase().replace(/ /g, '-');
		// console.log(nombreImagen);

		// The file format can be anything, like .png, .jpg, .jpeg, etc.
		const { data: imagen } = await supabase.storage
			.from('fotosRecetas')
			.getPublicUrl(`${nombreImagen}.png`);

		// console.log(imagen.publicUrl);

		for (let receta of dataRecetas) {
			if (receta.idreceta === idReceta) {
				if (imagen) {
					imagenReceta.src = imagen.publicUrl;
				} else {
					imagenReceta.src = food_stand_day;
				}
			}
		}
	};

	const fetchProfilePicture = async () => {
		// const { data: imagen } = supabase.storage.from('fotosPerfil').getPublicUrl('default.png');
		// First, get the user's ID
		const user = supabase.auth.getUser();
		const userID = (await user).data.user?.id;

		// Then, get the user's profile picture
		const { data: imagen } = await supabase.storage
			.from('fotosPerfil')
			.getPublicUrl(`${userID}.png`);

		// console.log(imagen.publicUrl);
		if (imagen){
			profilePicture = imagen.publicUrl;
		} else {
			profilePicture = await supabase.storage.from('fotosPerfil').getPublicUrl('default.png').data.publicUrl;
		}
	};
</script>

<Nav />
<body>
	<div class="container">
		<section id="profileSection">
			<div class="usernameContainer">
				<h1>{usuario}</h1>
				<a id="settings" href="/ajustes" title="Ajustes"
					><img src="/icons/settings.svg" alt="Settings" /></a
				>
			</div>
			<Modal bind:isOpen src={profilePicture} on:close={closeModal} />
			<button id="profilePictureButton" on:click={openModal}>
				<img id="profilePicture" src={profilePicture} alt="Foto de perfil" />
			</button>
			{#if desc}
				<p id="descripcion">{desc}</p>
			{/if}
		</section>
		<section id="publicacion_section">
			<h2>Publicaciones</h2>
			<div id="publicaciones_container">
				{#each dataRecetas as receta}
					<div id="publicacion">
						<div>
							<h3>
								{receta.tituloreceta}<button
									id="editarReceta"
									on:click={() => (window.location.href = `/editarReceta/${receta.idreceta}`)}
									title="Editar receta"
									><img src="/icons/pencil.svg" alt="Editar receta" />
							</button>
							</h3>
							<span>{receta.descripcionreceta}</span>
							<p><span>Tiempo de preparación: </span> {receta.tiempopreparacionreceta} minutos</p>
							<p><span>Dificultad:</span> {receta.dificultadreceta}</p>
						</div>
						<div>
							<img alt={receta.tituloreceta} id={`imagenReceta-${receta.idreceta}`} />
						</div>
						<button
							id="recipeButton"
							on:click={() => (window.location.href = `/receta/${receta.idreceta}`)}
							>Ver Receta
					</button>
					</div>
				{/each}
			</div>
		</section>
	</div>
</body>

<style>
	.container {
		display: grid;
		grid-template-columns: 40% 60%;
		height: 100%;
	}

	.usernameContainer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.275rem;
	}

	h1 {
		font-size: 3rem;
	}

	#settings {
		padding-left: 1rem;
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

	#publicacion div:nth-child(2) img {
		border-radius: 0.5rem;
		width: 25rem;
		aspect-ratio: 7/5;
	}

	#recipeButton {
		border: none;
		width: fit-content;
		height: fit-content;
		padding: 0.5rem;
		border-radius: 2rem;
		background: #8B0000;
		color: #fff;
		text-align: center;
		font-weight: 700;
		transition: background-color 0.2s ease-in-out;
		margin-left: 26rem;
		margin-top: -2.5rem;
	}
	#recipeButton:hover {
		cursor: pointer;
		background: #A52A2A;
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
		padding: 2rem;
		background-color: #698497;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
	}

	#profileSection p {
		font-size: 2.5rem;
		font-weight: 450;
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
		border-radius: 10rem;
		height: 18rem;
		width: 18rem;
		aspect-ratio: 9/15;
		border: #000 2px solid;
	}

	#editarReceta {
		margin-left: 0.7rem;
		background-color: transparent;
		border: none;
		cursor: pointer;
	}
</style>
