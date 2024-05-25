<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';

	let usuario: string = '';
	let password: string = '';
	let desc = '';
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
		const userD = await supabase.from('usuarios').select('*').eq('usuario_uuid', userID);
		desc = userD.data?.[0]?.descripcion;
		console.log(desc);
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

	const handleEmailFormSubmit = async (event: any) => {
		event.preventDefault();
		const { data, error } = await supabase.auth.updateUser({
			email: mail
		});
		if (error) {
			alert('Error al cambiar datos');
		} else {
			alert('Cambios guardados');
			handleFormReset(event);
		}
	};

	const handlePasswordFormSubmit = async (event: any) => {
		event.preventDefault();
		const { data, error } = await supabase.auth.updateUser({
			password: password
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

	const handleDescriptionSubmit = async () => {
		const user = supabase.auth.getUser();
		const { data, error } = await supabase.from('usuarios').update({ descripcion: desc }).eq('usuario_uuid', (await user).data.user?.id);
		console.log(data);
		if (error) {
			alert('Error al guardar descripción');
		} else {
			alert('Descripción guardada');
		}
	};
</script>

<Nav />
<body>
	<div class="container">
		<section id="profileSection">
			<div class="usernameContainer">
				<h1>{usuario}</h1>
				<a href="/perfil"><img src="/icons/close.svg" alt="Cancelar" /></a>
			</div>
			<img id="profilePicture" src={profilePicture} alt="Foto de perfil" />
			<textarea id="descripcion" bind:value={desc}></textarea>
			<button id="submit" on:click={handleDescriptionSubmit}>Guardar descripcion</button>
		</section>
		<section id="settingsSection">
			<h2>Modificar Datos</h2>
			<form on:submit={handleEmailFormSubmit} method="get">
				<div>
					<label for="email">Correo electrónico:</label>
					<input id="email" type="email" bind:value={mail} />
				</div>
				<button type="submit">Guardar</button>
			</form>
			<form on:submit={handlePasswordFormSubmit} method="get">
				<div>
					<label for="password">Contraseña:</label>
					<input id="password" type="password" bind:value={password} />
				</div>
				<button type="submit">Guardar</button>
			</form>
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
	h2 {
		font-size: 3rem;
		align-self: self-start;
	}

	#descripcion {
		width: 75%;
		height: 25%;
		font-size: 1.5rem;
		resize: none;
		border-radius: 1rem;
		border: none;
		padding: 1rem;
		font-size: large;
	}

	#submit{
		padding: 0.5rem 1rem;
		background-color: #9f76a8;
		color: #fff;
		font-size: 1.1rem;
		font-weight: 500;
		border-radius: 0.5rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;
		width: 15rem;
	}

	#submit:hover {
		background-color: #6f5275;
	}

	#settingsSection {
		width: 100%;
		padding: 1rem;

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

	#profilePicture {
		border-radius: 10rem;
		width: 20rem;
		aspect-ratio: 1;
		background-color: transparent;
		border: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	form button {
		padding: 0.5rem 1rem;
		background-color: #9f76a8;
		color: #fff;
		font-size: 1.1rem;
		font-weight: 500;
		border-radius: 0.5rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s ease-in-out;
		width: 15rem;
	}

	form button:hover {
		background-color: #6f5275;
	}

	form input[type='email'],
	form input[type='password'] {
		width: 100%;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.7rem;
	}

	form input[type='email']:focus,
	form input[type='password']:focus {
		background-color: #e2e6f0;
		color: #000;
	}

	form label,
	form input[type='email'],
	form input[type='password'] {
		font-size: 1.5rem;
	}

	form label {
		font-weight: 600;
	}

	form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		width: 90%;
		justify-content: center;
		align-items: flex-end;
		gap: 1rem;
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
