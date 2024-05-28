<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import logo from '/src/lib/assets/logo-removebg.png';

	let usuario = '';
	let userD;
	const handleMensajeUsuario = async () => {
		const { data, error } = await supabase.auth.getUser();

		if (error) {
			console.error(error);
		} else {
			const userID = data.user?.id;
			userD = await supabase.from('usuarios').select('*').eq('usuario_uuid', userID);
			usuario = userD.data?.[0]?.nombreusuario;
		}
	};

	onMount(() => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;
		const feedElement = (document.getElementById('feed') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		const nombreUsuario = (document.getElementById('nombreUsuario') as HTMLElement) || null;

		nombreUsuario?.addEventListener('click', () => {
			window.location.href = '/perfil';
		});

		handleMensajeUsuario();

		const navEl = document.querySelector('nav') as HTMLElement;
		window.addEventListener('scroll', () => {
			if (window.scrollY > 10) {
				navEl.style.borderBottomLeftRadius = '0.8rem';
				navEl.style.borderBottomRightRadius = '0.8rem';
			} else {
				navEl.style.borderRadius = '0';
			}
		});
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_IN') {
			handleMensajeUsuario();
		} else if (event === 'SIGNED_OUT') {
			window.location.href = '/';
		}
	});

	// HandleSearch
	const handleSearch = (event: any) => {
		event.preventDefault();
		const searchBar = (document.getElementById('searchBar') as HTMLInputElement).value;

		if (searchBar) {
			window.location.href = `/feed?search=${searchBar}`;
		} else {
			// Reload the feed page with the search query
			window.location.href = '/feed';
		}
	};

	const handleSearchEnter = (event: any) => {
		if (event.key === 'Enter') {
			handleSearch(event);
		}
	};
</script>

<nav>
	<div class="first_div">
		<img src={logo} alt="Logo" id="logo" title="Página de inicio" />
		<a id="nombreUsuario" href="/perfil" title="Ir a tu página de usuario">{usuario}</a>
	</div>
	<div class="second_div">
		<div id="searchBarContainer">
			<input
				on:keydown={handleSearchEnter}
				type="search"
				name="searchBar"
				id="searchBar"
				placeholder="Buscar receta"
			/>
			<button on:click={handleSearch}>
				<img src="/icons/search.svg" alt="Icono de búsqueda">
			</button>
		</div>
		<ul>
			<li>
				<a href="/feed" title="Página de inicio">
					<img src="/icons/home.svg" alt="homeIcon" />
				</a>
			</li>
			<li>
				<a href="/perfil" title="Perfil">
					<img src="/icons/user.svg" alt="Perfil" />
				</a>
			</li>
			<li>
				<a href="/cerrarSesion" title="Cerrar sesión">
					<img src="/icons/logout.svg" alt="Cerrar sesión" />
				</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	nav {
		background-color: #6e5773;
		padding: 0.35rem 1rem;
		display: flex;
		flex-direction: row;
		vertical-align: center;
		align-items: center;
		justify-content: space-between;
		height: fit-content;
		position: sticky;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		transition: border-radius 0.1s ease-in-out;
	}

	nav #logo {
		width: 3.5rem;
		height: 3.5rem;
	}

	nav #logo:hover {
		cursor: pointer;
	}

	nav .first_div {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		gap: 0.375rem;
	}

	nav .first_div > a {
		font-size: 1.2rem;
		font-weight: 600;
		color: #fff;
		text-decoration: underline;
		text-decoration-thickness: 0.1rem;
		text-decoration-color: transparent;

		border: 1px solid transparent;
		transition: transform 0.5s ease-in-out, text-decoration-color 0.5s ease-in-out;
	}

	nav .first_div > a:hover {
		transform: translateY(-2px);
		text-decoration-color: #fff;
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

	nav #nombreUsuario:hover {
		cursor: pointer;
	}

	nav ul {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	nav ul li {
		list-style: none;
		transition: transform 0.3s ease-in-out;
	}

	nav ul li:hover {
		transform: translateY(-2px);
	}

	nav ul li a {
		color: white;
		text-decoration: none;
		font-weight: 600;
		display: flex;
		align-items: center;
	}

	img {
		width: 2rem;
		aspect-ratio: 1;
	}
</style>
