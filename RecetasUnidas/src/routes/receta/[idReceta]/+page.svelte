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

	let isOpen = false;

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
</script>

<Nav />
<body>
	<div class="container">
		<section id="recetaSection">
			<h1>{tituloReceta}</h1>
            <img alt={tituloReceta} id={`imagenReceta-${idreceta}`} />
		</section>
		<section id="descripcion_section">
			<h1>Descripción</h1>
            <p><b>Tiempo de preparación:</b> {tiempopreparacionreceta} minutos</p>
            <p><b>Dificultad:</b> {dificultadreceta}</p>
            <p>{desc}</p>
		</section>
	</div>
</body>

<style>
	.container {
		display: grid;
		grid-template-columns: 40% 60%;
		height: 100%;
	}

	h1 {
		font-size: 3rem;
	}

    img {
        width: 90%;
        height: auto;
        aspect-ratio: 7/5;
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
		white-space: pre-wrap;

    }

	#recetaSection {
		padding: 2rem;
		background-color: #698497;
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
