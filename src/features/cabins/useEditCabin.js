import { createEditCabin } from "../../services/ApiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export function useEditCabin(){

    const queryClient = useQueryClient()

    const {isLoading:isEditing,mutate:editCabin} = useMutation({
        mutationFn: ({newCabinData,id})=>createEditCabin(newCabinData,id),
        onSuccess: ()=>{
          toast.success('successfully Edited Cabon details')
          queryClient.invalidateQueries({
            queryKey:['cabins']
          })
        },
        onError: err=>toast.error(err.message)
      })
    

return {isEditing,editCabin}
}