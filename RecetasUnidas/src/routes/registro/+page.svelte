<script lang="ts">
	// Imports
	import { supabase } from '$lib/supabaseClient';
	import logo from '/src/lib/assets/logo-removebg.png';

	// Page title
	const titulo = 'Recetas Unidas';

	let usuario = '';
	let password = '';
	let repeat_password = '';
	let correo = '';
	let datosUsuarios;

	async function signUpNewUser() {
		const { data, error } = await supabase.auth.signUp({
			email: correo,
			password: password,
			options: {
				data: {
					first_name: usuario
				}
			}
		});
		if (error) {
			alert('Error al crear el usuario');
		} else {
			alert('Usuario registrado');
			window.location.href = '/';
		}
	}

	const handleSignUp = (e:any) => {
		e.preventDefault();
		if (password == repeat_password) {
			signUpNewUser();
		} else {
			alert('Las contraseñas no coinciden');
			let passwordInput = (document.getElementById('password') as HTMLInputElement) || null;
			password = '';
			repeat_password = '';
			passwordInput?.focus();
		}
	};
</script>

<main class="white">
	<section>
		<section class="green left_pane">
			<img alt="" src={logo} class="logo" />
		</section>
		<section class="right_pane">
			<h2>Registro de usuario</h2>
			<div id="form">
				<section>
					<div>
						<label for="username">Usuario</label>
						<input
							type="text"
							name="usuario"
							id="username"
							autocomplete="off"
							bind:value={usuario}
							required
							placeholder="Mínimo 8 caracteres"
							minlength="8"
						/>
					</div>
					<div>
						<label for="password">Contraseña</label>
						<input
							type="password"
							name="password"
							id="password"
							autocomplete="off"
							bind:value={password}
							required
							placeholder="Mínimo 6 caracteres"
							minlength="6"
						/>
					</div>
					<div>
						<label for="repeat_password">Repetir contraseña</label>
						<input
							type="password"
							name="repeat_password"
							id="repeat_password"
							autocomplete="off"
							bind:value={repeat_password}
							required
							placeholder="Mínimo 6 caracteres"
							minlength="6"
						/>
					</div>
					<div>
						<label for="email">Correo</label>
						<input
							type="text"
							name="email"
							id="email"
							autocomplete="on"
							bind:value={correo}
							required
							placeholder="Correo electrónico"
						/>
					</div>
					<div class="footer-form">
						<button on:click={handleSignUp}> Registrarte</button>
						<div id="mensaje_registro">
							<p>¿Ya tienes una cuenta?</p>
							<a href="/">¡Ingresa ahora mismo!</a>
						</div>
					</div>
				</section>
			</div>
		</section>
	</section>
</main>

<style>
	main > section:nth-child(1) {
		display: grid;
		grid-template-columns: 40rem auto;
		height: 100svh;
	}


	.left_pane {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}


	.right_pane {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 5rem;
		justify-content: flex-start;
		align-items: center;
		margin-top: 5rem;
	}

	.right_pane > h2 {
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
	}

	.right_pane > #form {
		border: 1px solid #000;
		padding: 2rem;
		width: 55%;
		aspect-ratio: 4/3;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.right_pane > #form > section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: normal;
		gap: 4rem;
		width: fit-content;
	}

	.right_pane > #form div {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		gap: 1rem;
		align-items: center;
	}

	.right_pane > #form label {
		font-size: 1.1rem;
		font-weight: 600;
	}

	.right_pane > #form input[type='text'],
	.right_pane > #form input[type='password'] {
		background-color: #cecece;
		outline: none;
		border: 0.12rem solid #3f3f3f;
		border-radius: 0.5rem;
		width: 55%;
		height: 2.575rem;
		flex-shrink: 0;
		padding: 0.5rem;
		font-size: 1rem;
	}

	.right_pane > #form button {
		border: 1px solid #000;
		border-radius: 0.5rem;
		background-color: #c99669;
		height: 2rem;
		width: fit-content;
		font-size: 1rem;
		font-weight: 500;
		padding: 0 1rem 0 1rem;
		align-self: flex-end;
	}

	.right_pane > #form button:hover {
		background-color: #de775a;
		cursor: pointer;
	}

	.right_pane > form #mensaje_registro {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.3rem;
		font-weight: 600;
	}

	#mensaje_registro > a {
		color: #801c02;
	}

	.right_pane > form .footer-form {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.white {
		background-color: #faf9f6;
	}

	.green {
		background-color: #6e5773;
	}
</style>
