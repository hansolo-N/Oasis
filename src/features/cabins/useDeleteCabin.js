import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/ApiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteCabin(){
    const queryClient = useQueryClient()

    const {isLoading:isDeleting,mutate: deleteCabin} = useMutation({
        mutationFn: deleteCabinApi,
        onSuccess: ()=>{
        toast.success('cabin delete successfully')
        queryClient.invalidateQueries({
        queryKey:['cabins']
    })
  },
  onError: err=>toast.error(err.message)
})
return {isDeleting,deleteCabin}
}



