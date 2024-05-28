<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount, beforeUpdate } from 'svelte';
	import Nav from '../../components/Nav.svelte';

	let usuario: string = '';
	let originalUsuario: string = '';
	let userID;
	let password: string = '';
	let desc = '';
	let mail: string;
	let profilePicture: string;
	let fileInput: HTMLInputElement;

	let editing = false;

	let usuarioWidth = 0;

	let previewSelectedImage: HTMLImageElement;

	function updateUsuario(event: any) {
		usuarioWidth = event.target.value.length * 30 + 20;
	}

	function toggleEditing() {
		if (editing) {
			usuario = originalUsuario; // Restablece el nombre de usuario al valor original cuando se cancela la edición
		} else {
			originalUsuario = usuario; // Guarda el valor original del nombre de usuario antes de comenzar la edición
		}
		editing = !editing;
	}

	onMount(async () => {
		const logoElement = (document.getElementById('logo') as HTMLElement) || null;

		logoElement.addEventListener('click', () => {
			window.location.href = '/feed';
		});

		// Obtén el usuario actual
		const user = supabase.auth.getUser();

		// Si el usuario está autenticado, obtén su ID
		userID = (await user).data.user?.id;
		const userD = await supabase.from('usuarios').select('*').eq('usuario_uuid', userID);
		desc = userD.data?.[0]?.descripcion;
		usuario = userD.data?.[0]?.nombreusuario;
	});

	beforeUpdate(() => {
		fetchProfilePicture();
	});

	supabase.auth.onAuthStateChange((event) => {
		if (event === 'SIGNED_OUT') {
			window.location.href = '/login';
		}
	});

	const handleUsernameSubmit = async () => {
		const user = supabase.auth.getUser();
		const { data, error } = await supabase
			.from('usuarios')
			.update({ nombreusuario: usuario })
			.eq('usuario_uuid', (await user).data.user?.id);
		console.log(data);
		if (error) {
			alert('Error al guardar nombre de usuario');
		} else {
			alert('Nombre de usuario guardado');
			window.location.reload();
			toggleEditing();
		}
	};

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
		const { data, error } = await supabase
			.from('usuarios')
			.update({ descripcion: desc })
			.eq('usuario_uuid', (await user).data.user?.id);
		if (error) {
			alert('Error al guardar descripción');
		} else {
			alert('Descripción guardada');
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
		if (imagen) {
			profilePicture = imagen.publicUrl;
		} else {
			profilePicture = await supabase.storage.from('fotosPerfil').getPublicUrl('default.png').data
				.publicUrl;
		}
	};

	const handleProfilePictureUpdate = async (e: any) => {
		e.preventDefault();

		const user = await supabase.auth.getUser();
		const userID = user.data.user?.id;
		const file = fileInput.files?.[0];

		if (!file) {
			alert('Por favor, selecciona un archivo antes de intentar actualizar la foto de perfil.');
			return;
		}

		console.log(file);
		// const { data, error } = await supabase.storage
		// 	.from('fotosPerfil')
		// 	.update(`${userID}.png`, file, {
		// 		cacheControl: '3600',
		// 		upsert: true
		// 	});

		// if (!error) {
		// 	alert('Foto de perfil actualizada');
		// 	window.location.href = '/perfil';
		// } else {
		// 	alert('Error al actualizar foto de perfil');
		// }
	};

	const handlePreviewImage = () => {
		// Preview the selected image
		previewSelectedImage = document.getElementById('previewSelectedImage') as HTMLImageElement;

		const file = fileInput.files?.[0];
		const reader = new FileReader();

		reader.onload = () => {
			previewSelectedImage.src = reader.result as string;
		};

		if (file) {
			reader.readAsDataURL(file);
		}

		previewSelectedImage.classList.remove('hidden');
		previewSelectedImage.classList.add('visible');
	};

	const handleProfileFormReset = (e: any) => {
		e.preventDefault();
		const form = document.querySelector('form') as HTMLFormElement;
		form.reset();
		const previewSelectedImage = document.getElementById(
			'previewSelectedImage'
		) as HTMLImageElement;
		previewSelectedImage.src = '';
		previewSelectedImage.classList.remove('visible');
		previewSelectedImage.classList.add('hidden');
	};

	function triggerFileSelect() {
		fileInput.click();
	}
</script>

<Nav />
<body>
	<div class="container">
		<section id="profileSection">
			<div class="usernameContainer">
				{#if editing}
					<input
						type="text"
						class="dynamic-input"
						bind:value={usuario}
						on:input={updateUsuario}
						style="width: {usuarioWidth}px;"
					/>
					<button type="button" on:click={handleUsernameSubmit}>
						<img src="/icons/confirm.svg" alt="Confirmar" title="Confirmar" />
					</button>
					<button type="button" on:click={toggleEditing}>
						<img src="/icons/cancel.svg" alt="Cancelar" title="Cancelar" />
					</button>
				{:else}
					<h1>{usuario}</h1>
					<button type="button" on:click={toggleEditing}>
						<img src="/icons/pencil.svg" alt="Cambiar nombre" title="Cambiar nombre" />
					</button>
				{/if}
			</div>
			<div id="profilePictureForm">
				<form
					class="profilePictureContainer"
					on:submit={handleProfilePictureUpdate}
					on:reset={handleProfileFormReset}
				>
					<img id="profilePicture" src={profilePicture} alt="Foto de perfil" />
					<div class="editButtons">
						<button id="cancelConfirmButton" type="reset">
							<img src="/icons/close.svg" alt="Subir imágen" width="24" height="24" />
						</button>
						<button id="uploadProfilePictureButton" type="button" on:click={triggerFileSelect}>
							<img src="/icons/upload.svg" alt="Subir imágen" />
						</button>
						<button id="confirmProfilePictureButton" type="submit">
							<img src="/icons/check.svg" alt="Subir imágen" width="24" height="24" />
						</button>
						<input
							type="file"
							name="photoFile"
							id="photoFile"
							bind:this={fileInput}
							accept="image/png"
							style="display: none; visibility: collapse;"
							on:change={handlePreviewImage}
						/>
					</div>
				</form>
				<img id="previewSelectedImage" alt="No hay foto de perfil seleccionada" class="hidden" />
			</div>
			<textarea id="descripcion" bind:value={desc}></textarea>
			<button id="submit" on:click={handleDescriptionSubmit}>Guardar descripcion</button>
		</section>
		<section id="settingsSection">
			<div id="title">
				<h2>
					Modificar Datos <a href="/perfil"
						><img src="/icons/close.svg" alt="Cancelar" title="Cancelar" /></a
					>
				</h2>
			</div>
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
	.hidden {
		display: none;
		visibility: collapse;
	}

	.visible {
		display: block;
		visibility: visible;
	}

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

	.usernameContainer button {
		background-color: transparent;
		margin-left: 0.5rem;
		border: none;
		cursor: pointer;
	}

	.usernameContainer input[type='text'] {
		font-size: 3rem;
		text-align: center;
		padding-top: 0.4rem;
		padding-bottom: 0.4rem;
		width: 15rem;
		border-radius: 2rem;
		border: none;
		text-align: center;
	}

	.dynamic-input {
		/* width: fit-content; */
		min-width: 20rem;
		max-width: 30rem;
		padding: 0.5rem;
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
		text-align: center;
	}

	#submit {
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

	#title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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

	.profilePictureContainer {
		border-radius: 10rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.editButtons {
		border-radius: 10%;
		background-color: rgba(54, 69, 79, 0.6);
		width: 99%;
		aspect-ratio: 9/15;
		position: absolute;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.editButtons button {
		background-color: #c1c1c1;
		border-radius: 30rem;
		border: none;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.2875rem;
	}

	.editButtons button:hover {
		background-color: #a1a1a1;
	}

	#profilePicture,
	#previewSelectedImage {
		position: relative;
		border-radius: 10rem;
		background-color: transparent;
		border: none;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 10%;
		height: 18rem;
		/* width: 17rem; */
		aspect-ratio: 9/15;
		border: #000 2px solid;
	}

	#profilePictureForm {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	#settingsSection > form button {
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

	#settingsSection > form button:hover {
		background-color: #6f5275;
	}

	#settingsSection > form input[type='email'],
	#settingsSection > form input[type='password'] {
		width: 100%;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.7rem;
	}

	#settingsSection > form input[type='email']:focus,
	#settingsSection > form input[type='password']:focus {
		background-color: #e2e6f0;
		color: #000;
	}

	#settingsSection > form label,
	#settingsSection > form input[type='email'],
	#settingsSection > form input[type='password'] {
		font-size: 1.5rem;
	}

	#settingsSection > form label {
		font-weight: 600;
	}

	#settingsSection > form {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		width: 90%;
		justify-content: center;
		align-items: flex-end;
		gap: 1rem;
	}

	#settingsSection > form div {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 0.5rem;
	}
</style>
