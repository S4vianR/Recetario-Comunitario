<script lang="ts">
	import { onMount } from 'svelte';
	import logo from '/src/lib/assets/logo-removebg.png';
	import food_stand_day from '/src/lib/assets/food-stand-day.png';
	import { supabase } from '$lib/supabaseClient';
	import Nav from '../../components/Nav.svelte';

	let mensajeUsuario = '';

	const handleMensajeUsuario = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();

		if (error) {
			console.error(error);
		} else {
			let usuario = data?.identities[0].identity_data?.first_name;
			mensajeUsuario = `Hola, ${usuario}`;
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
			<div id="publicacion">
				<h4>Huevos a la mexicana</h4>
				<div>
					<p>
						Los huevos a la mexicana son una receta muy sencilla y rápida de preparar, además de ser
						muy sabrosa. Se pueden acompañar con arroz, frijoles, tortillas, pan o lo que más te
						guste.
					</p>
				</div>
				<img
					src="https://cocinamia.com.mx/wp-content/uploads/2021/01/huevos-a-la-mexicana-1-1100x500.jpg"
					alt="Huevos a la mexicana"
					height="200"
				/>
			</div>
			<div id="publicacion">
				<h4>Mole poblano</h4>
				<div>
					<p>
						El mole poblano es uno de los platillos más representativos de la gastronomía mexicana.
						Es un platillo muy sabroso y con un sabor muy característico. Se puede acompañar con
						arroz, tortillas, pollo o lo que más te guste.
					</p>
				</div>
				<img
					src="https://laroussecocina.mx/wp-content/uploads/2017/12/mole-poblano-001-larousse-cocina_0-e1671586546996.jpg"
					alt="Mole poblano"
					height="200"
				/>
			</div>
		</div>
	</section>
</main>

<style>
	nav {
		background-color: #3c8085;
		padding: 0.35rem 1rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 7svh;
	}

	nav #logo:hover {
		cursor: pointer;
	}

	nav .first_div {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}

	nav .first_div > p {
		font-size: 1rem;
		font-weight: 600;
		color: #fff;

		transition: all 0.5s ease-in-out;
	}

	nav .first_div > p:hover {
		transform: translateY(-2px);
	}

	nav .second_div {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		gap: 3rem;
	}

	nav #searchBarContainer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	nav #searchBarContainer > button {
		background-color: transparent;
		border: none;
		cursor: pointer;
	}

	nav #searchBarContainer > input[type='search'] {
		padding: 0.3rem;
		font-size: 0.875rem;
		border-radius: 0.5rem;
		border: 1px solid #000;
		width: 20rem;
		height: fit-content;
	}

	nav #searchBarContainer > input[type='search']:focus {
		outline: 0.05rem solid #000;
	}

	nav ul {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	nav ul li {
		list-style: none;
	}

	nav ul li a {
		color: white;
		text-decoration: none;
		font-weight: 600;
	}

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
