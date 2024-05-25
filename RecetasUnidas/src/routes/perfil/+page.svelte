<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount, afterUpdate } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let usuario: string = '';
	let desc = '';
	let dataRecetas: any[] = [];
	let profilePicture =
		'https://kaonlhtranrfojpknofp.supabase.co/storage/v1/object/sign/Fotos%20de%20Perfil/Captura%20desde%202024-05-01%2013-02-36.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGb3RvcyBkZSBQZXJmaWwvQ2FwdHVyYSBkZXNkZSAyMDI0LTA1LTAxIDEzLTAyLTM2LnBuZyIsImlhdCI6MTcxNDU5MTAwMSwiZXhwIjoyMDI5OTUxMDAxfQ.rLin9wagYkBo0n8twib4ejm7CwrFibSDhw4Fs3y4o-U&t=2024-05-01T19%3A16%3A41.998Z';

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
		let imagenReceta = document.getElementById(`imagenReceta-${idReceta}`) as HTMLImageElement || null;
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
							<h3>{receta.tituloreceta}</h3>
							<span>{receta.descripcionreceta}</span>
							<p><span>Tiempo de preparación:</span> {receta.tiempopreparacionreceta} minutos</p>
							<p><span>Dificultad:</span> {receta.dificultadreceta}</p>
						</div>
						<div>
							<img alt={receta.tituloreceta} id={`imagenReceta-${receta.idreceta}`} />
						</div>
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
		width: 20rem;
		aspect-ratio: 7/5;
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
		background-color: #d0d7e9;
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
		width: 100%;
		aspect-ratio: 1;
		border: #000 2px solid;
	}
</style>
