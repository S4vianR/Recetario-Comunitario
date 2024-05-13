import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("recetas").select().order('idreceta', { ascending: true });
  const { data : usuarios } = await supabase.from("usuarios").select();
  return {
    recetas: data ?? [],
    usuarios: usuarios ?? [],
  };
}