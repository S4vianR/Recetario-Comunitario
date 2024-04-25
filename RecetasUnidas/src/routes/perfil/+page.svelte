<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import Nav from '../../components/Nav.svelte';

	let usuario = '';

	const handleMensajeUsuario = async () => {
		const { data, error } = await supabase.auth.getUserIdentities();

		if (error) {
			console.error(error);
		} else {
			usuario = data?.identities[0].identity_data?.first_name;
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

<head>
	<title> Recetas Unidas </title>
</head>

<Nav />