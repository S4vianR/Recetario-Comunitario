<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	let mensaje = '';
	onMount(() => {
		const mensajeCerrarSesion = document.getElementById('mensajeCerrarSesion') as HTMLDivElement;
		setTimeout(() => {
			mensajeCerrarSesion.textContent = 'Cerrando sesión.';
		}, 0);
		setTimeout(() => {
			mensajeCerrarSesion.textContent = 'Cerrando sesión..';
		}, 500);
		setTimeout(() => {
			mensajeCerrarSesion.textContent = 'Cerrando sesión...';
		}, 1000);
		setTimeout(() => {
			mensajeCerrarSesion.textContent = 'Volviendo a la pantalla principal';
		}, 1300);
		setTimeout(() => {
			handleSignOut();
			window.location.href = '/';
		}, 2500);
	});
</script>

<main>
	<div id="mensajeCerrarSesion">
		{mensaje}
	</div>
</main>

<style>
	#mensajeCerrarSesion {
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
