<script lang="ts">
	import Nav from '../../components/Nav.svelte';
	import { supabase } from '$lib/supabaseClient';

	// Variables
	let nombrePlatillo: string;
	let descripcionPlatilloValue = '';
	let imagenReceta: string;
	let tiempoPreparacion: number;
	let dificultad: string;
	let numeroRacionesValue: number;
	let userId = undefined;

	// Funciones
	const handleFocusDesctiption = () => {
		const descripcion = document.getElementById('descripcion') as HTMLDivElement;
		const descripcionTextArea = document.getElementById(
			'descripcionTextArea'
		) as HTMLTextAreaElement;
		descripcion.classList.remove('hidden');
		descripcion.classList.add('visible');
		const descripcionPlatillo = document.getElementById(
			'descripcionPlatillo'
		) as HTMLTextAreaElement;

		descripcionPlatillo.disabled = true;
		descripcionTextArea.focus();
	};

	const handleConfirmDescription = () => {
		const descripcion = document.getElementById('descripcion') as HTMLDivElement;
		const descripcionPlatillo = document.getElementById(
			'descripcionPlatillo'
		) as HTMLTextAreaElement;
		const descripcionTextArea = document.getElementById(
			'descripcionTextArea'
		) as HTMLTextAreaElement;

		if (descripcionTextArea.value === '') {
			descripcionPlatillo.value = '';
		} else {
			descripcionPlatillo.value = descripcionTextArea.value;
		}

		descripcion.classList.remove('visible');
		descripcion.classList.add('hidden');

		descripcionPlatillo.disabled = false;
	};

	const handleEraseDescription = () => {
		const descripcionPlatillo = document.getElementById(
			'descripcionPlatillo'
		) as HTMLTextAreaElement;
		const descripcionTextArea = document.getElementById(
			'descripcionTextArea'
		) as HTMLTextAreaElement;

		descripcionTextArea.value = '';
		descripcionPlatillo.disabled = false;
	};

	const handleFormReset = (event: any) => {
		event.preventDefault();
		const form = document.querySelector('form') as HTMLFormElement;
		form.reset();
	};

	const handleFormSubmit = async (event: any) => {
		const { data } = await supabase.auth.getUserIdentities();
		userId = data?.identities[0].user_id;
		event.preventDefault();
		// Assuming userId is a valid UUID, proceed with the insertion
		let { data: recetas, error } = await supabase.from('recetas').insert([
			{
				tituloreceta: nombrePlatillo,
				descripcionreceta: descripcionPlatilloValue,
				tiempopreparacionreceta: tiempoPreparacion,
				dificultadreceta: dificultad,
				racionesreceta: numeroRacionesValue,
				idusuario: userId
			}
		]);

		if (error) {
			alert('Error al enviar el formulario');
			console.error(error);
		} else {
			alert('Formulario enviado');
			handleFormReset(event);
			window.location.href = '/feed';
		}
	};

	const handleImageUploadBucket = async () => {
		// Upload the images upload to the bucket
		const { data, error } = await supabase.storage
			.from('avatars')
			.createSignedUrl('folder/avatar1.png', 60);
	};
</script>

<Nav />
<main>
	<a href="/feed">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
			><path
				d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM12 11H16V13H12V16L8 12L12 8V11Z"
			></path></svg
		>
		Volver atrás
	</a>
	<div class="formWrapper">
		<form on:submit={handleImageUploadBucket} method="get">
			<h2>Creación de platillo</h2>
			<div>
				<label for="nombrePlatillo">Nombre platillo:</label>
				<input
					type="text"
					name="nombrePlatillo"
					id="nombrePlatillo"
					placeholder="Nombre del platillo"
					required
					bind:value={nombrePlatillo}
				/>
			</div>
			<div>
				<label for="descripcionPlatillo">Descripción:</label>
				<textarea
					name="descripcionPlatillo"
					id="descripcionPlatillo"
					placeholder="Descripción del platillo"
					on:focus={handleFocusDesctiption}
					required
				></textarea>
			</div>
			<div>
				<label for="imagenReceta">Imagén de la receta:</label>
				<input
					type="file"
					name="imagenReceta"
					id="imagenReceta"
					accept="image/*"
					bind:value={imagenReceta}
				/>
			</div>
			<div>
				<label for="tiempoPreparacion">Tiempo de preparación:</label>
				<input
					type="number"
					name="tiempoPreparación"
					id="tiempoPreparacion"
					placeholder="El número debe de ser en minutos"
					title="El número debe de ser en minutos"
					required
					bind:value={tiempoPreparacion}
				/>
			</div>
			<div>
				<label for="dificultad">Dificultad:</label>
				<select name="dificultad" id="dificultad" required bind:value={dificultad}>
					<option value="facil">Fácil</option>
					<option value="medio">Medio</option>
					<option value="dificil">Difícil</option>
				</select>
			</div>
			<div>
				<label for="numeroRaciones">Número de raciones:</label>
				<input
					type="number"
					name="numeroRaciones"
					id="numeroRaciones"
					required
					placeholder="El número de raciones"
					bind:value={numeroRacionesValue}
				/>
			</div>
			<div>
				<button type="submit">Agregar Receta</button>
				<button type="reset">Reiniciar Receta</button>
			</div>
		</form>
		<div id="descripcion" class="hidden">
			<textarea
				id="descripcionTextArea"
				name="descripcionTextArea"
				rows="40"
				cols="120"
				bind:value={descripcionPlatilloValue}
			/>
			<div class="descriptionButtonWrapper">
				<button on:click={handleConfirmDescription}>Confirmar</button>
				<button on:click={handleEraseDescription}>Borrar descripción</button>
			</div>
		</div>
	</div>
</main>

<style>
	.hidden {
		display: none;
		visibility: collapse;
	}

	main {
		height: 91svh;
		padding: 1rem;
	}

	main > a {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		color: #000;
		font-weight: 600;
		font-size: 1.1rem;
		border-bottom: 2px solid #000;
		width: 9rem;
		transition:
			color 0.5s ease-in-out,
			fill 0.5s ease-in-out,
			border-color 0.5s ease-in-out;
	}

	main > a:hover {
		color: #3c8085;
		fill: #3c8085;
		border-color: #3c8085;
	}

	form {
		margin-top: 2rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 1rem;
		height: 100%;
	}

	form label {
		font-size: 1.1rem;
	}

	form input,
	form textarea,
	form select {
		width: 25rem;
		font-size: 1.1rem;
		border-radius: 0.3875rem;
		border: 1px solid #000;
		padding: 0.2rem;
	}

	form textarea {
		resize: none;
	}

	form *:disabled {
		background-color: #f1f1f1;
	}

	form div {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
		width: 40rem;
	}

	form button {
		padding: 0.5rem 1rem;
		background-color: #3c8085;
		color: #fff;
		font-size: 1.1rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition:
			background-color 0.5s ease-in-out,
			opacity 0.5s ease-in-out;
		align-self: flex-end;
	}

	form button:hover {
		background-color: #3c8085;
		opacity: 0.5;
	}

	.formWrapper {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	#descripcion {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		gap: 1.875rem;
	}

	#descripcion textarea {
		padding: 0.5rem;
		resize: none;
		border-radius: 0.3875rem;
	}

	#descripcion textarea:focus {
		border: none;
		outline: 3px solid #3c8085;
	}

	#descripcion button {
		padding: 0.5rem 1rem;
		background-color: #3c8085;
		color: #fff;
		font-size: 1.1rem;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		transition:
			background-color 0.5s ease-in-out,
			opacity 0.5s ease-in-out;
	}

	#descripcion button:hover {
		background-color: #3c8085;
		opacity: 0.5;
	}

	/* #descripcion .buttonWrapper {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	} */
</style>
