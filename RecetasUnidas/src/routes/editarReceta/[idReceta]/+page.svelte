<script lang="ts">
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient';
	import { afterUpdate, onMount } from 'svelte';
	import Nav from '../../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let desc = '';
	let tituloReceta = '';
	let tiempopreparacionreceta = '';
	let dificultadreceta = '';
	let numeroRaciones = 0;
	let receta: any;
	const { params } = $page;
	const idreceta = params.idReceta;
	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		// Obtén el usuario
		receta = await supabase.from('recetas').select('*').eq('idreceta', idreceta);
		desc = receta.data?.[0]?.descripcionreceta;
		tituloReceta = receta.data?.[0]?.tituloreceta;
		tiempopreparacionreceta = receta.data?.[0]?.tiempopreparacionreceta;
		dificultadreceta = receta.data?.[0]?.dificultadreceta;
		numeroRaciones = receta.data?.[0]?.racionesreceta;

		// Si el usuario está autenticado, obtén su ID
		// Query para obtener las recetas del usuario
		const usuario = await supabase
			.from('usuarios')
			.select('*')
			.eq('idusuario', receta.data?.[0]?.idusuario);
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_OUT') {
			window.location.href = '/login';
		}
	});

	afterUpdate(() => {
		handleImageRecovery(Number(idreceta), tituloReceta);
	});

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

		if (imagen) {
			imagenReceta.src = imagen.publicUrl;
		} else {
			imagenReceta.src = food_stand_day;
		}
	};

	const handleRecipeSave = async () => {
		const { data, error } = await supabase
			.from('recetas')
			.update({
				tiempopreparacionreceta: tiempopreparacionreceta,
				dificultadreceta: dificultadreceta,
				racionesreceta: numeroRaciones,
				descripcionreceta: desc
			})
			.eq('idreceta', idreceta);
		if (error) {
			alert('Error al guardar receta');
		} else {
			alert('Receta guardada');
			window.location.href = '/perfil';
		}
	};
</script>

<body>
	<Nav />

	<div class="container">
		<section id="recetaSection">
			<h1>{tituloReceta}</h1>
			<img class="imagenReceta" alt={tituloReceta} id={`imagenReceta-${idreceta}`} />
		</section>
		<section id="descripcion_section">
			<h1>
				Descripción
				<a href="/perfil"><img src="/icons/close.svg" alt="Cancelar" title="Cancelar" /></a>
				<a id="guardar" on:click={handleRecipeSave}><img src="/icons/save.svg" alt="Guardar" title="Guardar" /></a>
			</h1>
			<p>
				<b>Tiempo de preparación:</b>
				<input
					type="number"
					name="editTiempoPreparación"
					id="editTiempoPreparacion"
					title="El número debe de ser en minutos"
					required
					min="1"
					bind:value={tiempopreparacionreceta}
				/>
			</p>

			<p>
				<b>Dificultad:</b>
				<select name="dificultad" id="dificultad" required bind:value={dificultadreceta}>
					<option value="Facil">Fácil</option>
					<option value="Medio">Medio</option>
					<option value="Dificil">Difícil</option>
				</select>
			</p>

			<p>
				<b>Raciones:</b>
				<input
					type="number"
					name="numeroRaciones"
					id="numeroRaciones"
					required
					placeholder="El número de raciones"
					min="1"
					bind:value={numeroRaciones}
				/>
			</p>
			<p>
				<textarea
					id="descripcionTextArea"
					name="descripcionTextArea"
					rows="40"
					cols="120"
					bind:value={desc}
				/>
			</p>
		</section>
	</div>
</body>

<style>
	.container {
		display: grid;
		grid-template-columns: 40% 60%;
		height: 80%;
	}

	h1 {
		font-size: 3rem;
	}
	
	a:hover {
		cursor: pointer;
	}

	.imagenReceta {
		width: 90%;
		height: auto;
		aspect-ratio: 7/5;
	}

	input {
		width: 5rem;
		font-size: 1.1rem;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.2rem;
	}

	select {
		width: 25rem;
		font-size: 1.1rem;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.2rem;
	}

	textarea {
		resize: none;
		width: 100%;
		font-size: 1.5rem;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.2rem;
	}

	.dynamic-input {
		/* width: fit-content; */
		min-width: 20rem;
		max-width: 30rem;
		padding: 0.5rem;
	}

	#recetaSection button {
		background-color: transparent;
		margin-left: 0.5rem;
		border: none;
		cursor: pointer;
	}

	#recetaSection input[type='text'] {
		font-size: 3rem;
		text-align: center;
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		width: 15rem;
		border-radius: 2rem;
		border: none;
		text-align: center;
	}

	#descripcion_section {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 2rem;
	}

	#descripcion_section p {
		font-size: 1.5rem;
	}

	#recetaSection {
		padding: 2rem;
		background-color: #d0d7e9;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 2rem;
	}

	#recetaSection img {
		border-radius: 0.5rem;
		width: 90%;
		height: auto;
		aspect-ratio: 7/5;
	}
</style>
