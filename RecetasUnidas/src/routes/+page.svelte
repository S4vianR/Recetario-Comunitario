<script lang="ts">
	// Image imports
	//import vegetable_recipe_book from '/src/lib/assets/vegetable-recipe-book.png';
	import logo from '/src/lib/assets/logo-removebg.png';

	// Page title
	const titulo = 'Recetas Unidas';
</script>

<head>
	<title>
		{titulo}
	</title>
</head>
<main>
	<section>
		<section class="purple left_pane">
			<img alt="" src={logo} class="logo" />
		</section>
		<section class="white right_pane">
			<h2>Inicio de sesión</h2>
			<form action="#" method="post">
				<section>
					<div>
						<label for="username">Usuario</label>
						<input type="text" name="usuario" id="username" />
					</div>
					<div>
						<label for="password">Contraseña</label>
						<input type="text" name="password" id="password" />
					</div>
					<button type="submit"> Iniciar sesión</button>
					<div id="mensaje_registro">
						<p>¿No tienes una cuenta?</p>
						<a href="/registro">¡Crea una ahora mismo!</a>
					</div>
				</section>
			</form>
		</section>
	</section>
</main>

<style>
	main > section:nth-child(1) {
		display: grid;
		grid-template-columns: 30% 70%;
		height: 100svh;
	}

	.left_pane {
		padding: 1rem;
	}

	.left_pane > img {
		height: 100px;
		aspect-ratio: 1.01;
	}

	.right_pane {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 5rem;
		justify-content: flex-start;
		align-items: center;
	}

	.right_pane > h2 {
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
	}

	.right_pane > form {
		border: 1px solid #000;
		padding: 2rem;
		width: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.right_pane > form > section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: normal;
		gap: 4rem;
		width: fit-content;
	}

	.right_pane > form div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.right_pane > form label {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.right_pane > form input[type='text'] {
		background-color: #cecece;
		outline: none;
		border: 0.12rem solid #3f3f3f;
		border-radius: 0.5rem;
		width: 25rem;
		height: 2.575rem;
		flex-shrink: 0;
		padding: 0.5rem;
		font-size: 1rem;
	}

	.right_pane > form button[type='submit'] {
		border: 1px solid #000;
		border-radius: 0.5rem;
		background-color: #c99669;
		height: 2rem;
		width: fit-content;
		font-size: 1rem;
		padding: 0 1rem 0 1rem;
		align-self: flex-end;
	}

	.right_pane > form #mensaje_registro {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-weight: 600;
	}

	.white {
		background-color: #faf9f6;
	}

	.purple {
		background-color: #9196da;
	}
</style>
