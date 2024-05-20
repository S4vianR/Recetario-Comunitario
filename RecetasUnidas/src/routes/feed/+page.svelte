<script lang="ts">
	export let data;
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';

	let respuesta: boolean;
	let profilePicture =
		'https://kaonlhtranrfojpknofp.supabase.co/storage/v1/object/sign/Fotos%20de%20Perfil/Captura%20desde%202024-05-01%2013-02-36.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJGb3RvcyBkZSBQZXJmaWwvQ2FwdHVyYSBkZXNkZSAyMDI0LTA1LTAxIDEzLTAyLTM2LnBuZyIsImlhdCI6MTcxNDU5MTAwMSwiZXhwIjoyMDI5OTUxMDAxfQ.rLin9wagYkBo0n8twib4ejm7CwrFibSDhw4Fs3y4o-U&t=2024-05-01T19%3A16%3A41.998Z';
	let usuarios = data.usuarios;
		
	const handleCrearRecetaButton = () => {
		window.location.href = '/crearReceta';
	};

	onMount(async () => {
		const { data: usuario } = await supabase.auth.getUserIdentities();
		const userID = usuario?.identities[0].user_id;
		const userFirstName = usuario?.identities[0].identity_data?.first_name;
		const correo = usuario?.identities[0].identity_data?.email;

		usuarios = usuarios.filter((usuario: any) => usuario.correousuario !== correo);
		// Cuando la url tiene un parámetro get, significa que el usuario está buscando algo
		const urlParams = new URLSearchParams(window.location.search);
		const searchQuery = urlParams.get('search');

		// Si el usuario está buscando algo, filtra las recetas
		if (searchQuery) {
			data.recetas = data.recetas.filter((receta: any) => {
				return receta.tituloreceta.toLowerCase().includes(searchQuery.toLowerCase());
			});

			// Si no se encontraron recetas, establece respuesta en un mensaje de error
			if (data.recetas.length === 0) {
				respuesta = false;
			}
		}
		// Obtiene el id de la receta
		for (let receta of data.recetas) {
			const recetaID = receta.idreceta;
			handleUserLiked(recetaID);
		}

		const { data: existingUser } = await supabase
			.from('usuarios')
			.select()
			.eq('correousuario', correo);
		// If user does not exist, insert new user
		if (!existingUser || existingUser.length === 0) {
			const { error: insertError } = await supabase.from('usuarios').insert([
				{
					usuario_uuid: userID,
					nombreusuario: userFirstName,
					correousuario: correo,
					usuario_admin: false
				}
			]);

			if (insertError) {
				console.error('Error inserting user:', insertError);
			}
		}
	});

	const handleUserLiked = async (recetaID: number) => {
		const userID = (await supabase.auth.getSession()).data.session?.user?.id;
		const buttonLike = document.getElementById(`buttonLike-${recetaID}`) as HTMLButtonElement;
		const buttonLikeImg = document.getElementById(`buttonLikeImg-${recetaID}`) as HTMLImageElement;

		const { data, error } = await supabase
			.from('likes')
			.select('idreceta')
			.eq('idreceta', recetaID)
			.eq('idusuario', userID);

		// Si el data no está vacío, significa que el usuario ya le dio like a la receta
		if ((data?.length ?? 0) > 0) {
			buttonLike.style.backgroundColor = '#f0f0f0';
			buttonLikeImg.src = '/icons/thumb-up-checked.svg';
		}
	};

	const handleLike = async (idreceta: number, numlikes: number) => {
		// Obtiene el id del usuario
		const userID = (await supabase.auth.getSession()).data.session?.user?.id;
		// Obtiene el botón de like y la imagen del botón
		const buttonLikeImg = document.getElementById(`buttonLikeImg-${idreceta}`) as HTMLImageElement;
		// Obtiene el contador de likes
		const likeCounter = document.getElementById('likeCounter') as HTMLSpanElement;

		// Check if the user already liked the recipe
		const { data } = await supabase
			.from('likes')
			.select('idreceta')
			.eq('idreceta', idreceta)
			.eq('idusuario', userID);

		// Si el data no está vacío, significa que el usuario ya le dio like a la receta
		if ((data?.length ?? 0) > 0) {
			// Inserta el like en la base de datos
			const { error } = await supabase
				.from('likes')
				.delete()
				.eq('idreceta', idreceta)
				.eq('idusuario', userID);

			if (error) {
				alert('Error al quitar el like');
			} else {
				// Quitar el like de la receta
				const { data, error } = await supabase
					.from('likes')
					.delete()
					.eq('idreceta', idreceta)
					.eq('idusuario', userID);
				// Cambia la imagen del botón
				buttonLikeImg.src = '/icons/thumb-up-unchecked.svg';
			}
		} else {
			// Si el usuario no le ha dado like a la receta, le da like
			// Inserta el like en la base de datos
			const { data, error } = await supabase.from('likes').insert([
				{
					idreceta,
					idusuario: userID
				}
			]);

			if (error) {
				alert('Error al dar like');
			} else {
				// Cambia la imagen del botón
				buttonLikeImg.src = '/icons/thumb-up-checked.svg';
			}
		}

		likeCounter.innerHTML = numlikes.toString();
	};

	const handleButtonRefresh = () => {
		window.location.href = '/feed';
	};
</script>

<Nav />
<main>
	<section>
		<button id="crearRecetaButton" on:click={handleCrearRecetaButton}> Crear receta </button>
		<div id="profile">
			{#each usuarios as usuario}
				<div id="user">
					<img src={profilePicture} width="80" height="80" alt="Profile"/>
					<div>
						<h4>{usuario.nombreusuario}</h4>
						<a href="/perfilU/{usuario.nombreusuario}">Ver perfil</a>
					</div>	
				</div>
			{/each}
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
						<div id="likeContainer">
							<button
								id={`buttonLike-${receta.idreceta}`}
								on:click={() => handleLike(receta.idreceta, receta.numlikes)}
							>
								<img
									src="/icons/thumb-up-unchecked.svg"
									alt="icono like"
									id={`buttonLikeImg-${receta.idreceta}`}
								/>
							</button>
							<p><span id="likeCounter">{receta.numlikes}</span>likes</p>
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
		grid-template-columns: 13% 87%;
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

	#publicacion div:nth-child(1) p {
		text-transform: capitalize;
	}

	#publicacion div:nth-child(1) p > span {
		font-weight: 600;
	}

	#publicacion img {
		border-radius: 0.5rem;
		width: 320px;
		height: 220px;
	}

	#publicacion > #likeContainer {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 0.5rem;
	}

	#publicacion #likeContainer > button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		background-color: #fff;
		border: 1px solid #000;
		transition: background-color 0.1s ease-in-out;
	}

	#publicacion #likeContainer > button:hover {
		cursor: pointer;
		background-color: #f0f0f0;
	}

	#publicacion #likeContainer > button:active {
		background-color: #cecece;
	}

	#publicacion #likeContainer > button img {
		width: 1.2rem;
		aspect-ratio: 1;
	}

	#publicacion #likeContainer p {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: 0.2rem;
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
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		justify-content: center;
		align-items: center;
	}

	#profile #user {
		padding: 0.5rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.875rem;
		border: 1px solid #000;
		width: 100%;
	}

	#profile #user > div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.5rem;
	}

	#profile h4 {
		font-size: 1rem;
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

	a {
		color: black;
		text-decoration: none;
		font-weight: 600;
	}
</style>
