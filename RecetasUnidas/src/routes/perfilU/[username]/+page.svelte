<script lang="ts">
    import { page } from '$app/stores';
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
    let usuario = '';
    let dataRecetas = [];

	const { params } = $page;
    const username = params.username;
    onMount(async () => {
        // Obtén el nombre de usuario de la ruta
        const { params } = $page;
        const username = params.username;

        // Query para obtener las recetas del usuario
        const { data } = await supabase.from('recetas').select('*').eq('username', username);

        if (data) {
            dataRecetas = data;
        }
    });

    supabase.auth.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN') {
            handleSupabaseVariables();
        } else if (event === 'SIGNED_OUT') {
            window.location.href = '/login';
        }
    });

    const handleSupabaseVariables = async () => {
        const { data, error } = await supabase.auth.getUserIdentities();
        usuario = data?.identities[0].identity_data?.first_name;
    };
</script>

<body>
    <div class="container">
        <section id="profileSection">
            <h1>Perfil de {username}</h1>
            <!-- Resto del código -->
        </section>
    </div>
</body>