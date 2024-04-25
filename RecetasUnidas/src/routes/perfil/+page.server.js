import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("recetas").select();
  return {
    recetas: data ?? [],
  };
}