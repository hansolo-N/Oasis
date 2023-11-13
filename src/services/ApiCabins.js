import supabase from "./supabaseClient";


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
}

export async function createCabin(newCabin){
    const { data, error } = await supabase
  .from('cabins')
  .insert([newCabin])

  if(error) {
    console.log(error.message)
    throw new Error('cabin could not be created!')
}
return data
}