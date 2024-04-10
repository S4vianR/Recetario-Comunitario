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
				<div>
					<label for="username">Usuario</label>
					<input type="text" name="usuario" id="username" />
				</div>
				<div>
					<label for="password">Contraseña</label>
					<input type="text" name="password" id="password" />
				</div>
				<button type="submit"> Iniciar sesión </button>
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
		gap: 2rem;
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
		width: 45%;
		height: 2.1rem;
		padding: 0.5rem;
		font-size: 1rem;
	}

	.white {
		background-color: #faf9f6;
	}

	.purple {
		background-color: #9196da;
	}
</style>
