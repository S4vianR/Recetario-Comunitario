import { supabase } from "$lib/supabaseClient";

export async function load() {

  const { data: usuario } = await supabase.auth.getUserIdentities();
  const correo = usuario?.identities[0].identity_data?.email;
  const { data } = await supabase.from("recetas").select().order('idreceta', { ascending: true });
  const { data : usuarios } = await supabase.from("usuarios").select().neq('correousuario', correo);
  return {
    recetas: data ?? [],
    usuarios: usuarios ?? [],
  };
}