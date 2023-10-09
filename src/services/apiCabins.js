import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("cabins didnt loaded");
  }
  return data;
}
//

export async function createEditCabin(newCabin, id) {
  //https://hvtjwlwywhxdaezzvcwz.supabase.co/storage/v1/object/public/cabins-images/cabin-002.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  //create image name and path
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  let query = supabase.from("cabins");

  // 1) CREAT
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  // 2) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("cabin could not be  created");
  }
  // to prevent data when duplicate to upload the photo again
  if (hasImagePath) return data;

  // from upload files of javascript in supabase files
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);
  // if there is aproplem with cabin image then the cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("image could not be uploaded and cabin cant be created");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("cabin could not be  deleted");
  }
  return data;
}
