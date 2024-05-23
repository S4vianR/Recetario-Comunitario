import { supabase } from "$lib/supabaseClient";

export async function load() {

  const { data: usuario } = await supabase.auth.getUserIdentities();
  const nombreusuario = usuario?.identities[0].identity_data?.first_name;
  const { data } = await supabase.from("recetas").select().order('idreceta', { ascending: true });
  const { data : usuarios } = await supabase.from("usuarios").select().neq('nombreusuario', nombreusuario);
  return {
    recetas: data ?? [],
    usuarios: usuarios ?? [],
  };
}