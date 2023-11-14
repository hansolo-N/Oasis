
import supabase, { supabaseUrl } from "./supabaseClient";


export async function getCabins(){
    const { data, error } = await supabase.from('cabins').select('*')

    if(error) {
    console.log(error.message)
    throw new Error('cabins could not be loaded')
}
return data
        
}

export async function deleteCabin(id){
    
const { data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)

if(error) {
    console.log(error.message)
    throw new Error('cabin could not be deleted!')
}

return data 
}

export async function createEditCabin(newCabin,id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)

    const  imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/","")

    const imagePath = hasImagePath? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

    //create or edit cabin
    let query = supabase.from('cabins')

    //create cabin
    if(!id)
    query = query.insert([ {...newCabin,image:imagePath}])

    //edit cabin
    if(id)
    query = query.update( {...newCabin,image:imagePath})
    .eq('id', id)
    .select()
    const {data,error} = await query.select().single()

  if(error) {
    console.log(error.message)
    throw new Error('cabin could not be created!')

}

// upload image

if(hasImagePath) return data
const avatarFile = newCabin.image
const {error:storageError} =await supabase.storage.from('cabin-images').upload(imageName, avatarFile)

//   delete cabin if error uploading image/storage error
  if(storageError)
  { 
  await supabase.from('cabins').delete().eq('id',id)
  console.log(storageError)
  throw new Error('cabin image could not be uploaded, cabin was not created!')
    }
return data
}
