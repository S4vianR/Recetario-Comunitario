<script lang="ts">
	import { onMount } from 'svelte';

	let mensaje = '';
	onMount(() => {
		const mensajeRegistrado = document.getElementById('mensajeRegistrado') as HTMLDivElement;
		setTimeout(() => {
			mensajeRegistrado.textContent = 'Registrado, yendo a la pantalla de inicio de sesión.';
		}, 0);
		setTimeout(() => {
			mensajeRegistrado.textContent = 'Registrado, yendo a la pantalla de inicio de sesión..';
		}, 500);
		setTimeout(() => {
			mensajeRegistrado.textContent = 'Registrado, yendo a la pantalla de inicio de sesión...';
		}, 1000);
		setTimeout(() => {
			mensajeRegistrado.textContent = 'Volviendo a la pantalla principal';
		}, 1300);
		setTimeout(() => {
			window.location.href = '/';
		}, 2500);
	});
</script>

<main>
	<div id="mensajeRegistrado">
		{mensaje}
	</div>
</main>

<style>
	#mensajeRegistrado {
		width: 100svw;
		height: 100svh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 2.5rem;
		font-weight: 600;
	}
</style>
