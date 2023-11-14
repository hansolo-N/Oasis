import { createEditCabin } from "../../services/ApiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";






export function useCreateCabin(){


    const queryClient = useQueryClient()

    const {isLoading:creatingCabin,mutate:createCabin} = useMutation({
        mutationFn: (newCabin)=>createEditCabin(newCabin),
        onSuccess: ()=>{
          toast.success('cabin created successfully')
          queryClient.invalidateQueries({
            queryKey:['cabins']
          })
        },
        onError: err=>toast.error(err.message)
      })
    
return {creatingCabin,createCabin}
}

