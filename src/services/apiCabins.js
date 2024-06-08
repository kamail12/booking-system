import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error("Cabins can't be deleted");
  }

  return data;
}

export async function addCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // https://tpfrkhrdqkxhglnldrvl.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // 1.Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins can't be added");
  }

  // 2.Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  if (error) {
    console.error(error);
    throw new Error("Image can't be uploaded");
  }

  // 3.Delete Cabin if a was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data[0].id);
    throw new Error("Image can't be uploaded and the cabin was not created");
  }

  return data;
}
