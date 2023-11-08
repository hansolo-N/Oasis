import supabase from "./supabaseClient";


export async function getCabins(){
    const { data, error } = await supabase.from('cabins').select('*')

    if(error) {
    console.log(error.message)
    throw new Error('cabins could not be loaded')
}
return data
        
}