import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Upload file using standard upload
export async function uploadFile(file: File): Promise<string | null> {
  const filePath = `${Date.now()}-${file.name}`; // Nombre único usando timestamp
  const { data, error } = await supabase.storage
    .from("hacksnack")
    .upload(filePath, file);
  if (error) {
    console.error(error);
    return null;
  } else {
    // Obtener la URL pública
    const { data: publicUrlData } = supabase.storage
      .from("hacksnack")
      .getPublicUrl(filePath);
    return publicUrlData?.publicUrl ?? null;
  }
}
