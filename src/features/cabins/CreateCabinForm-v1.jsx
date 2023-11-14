

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/ApiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm() {

  const {register,handleSubmit,reset,getValues,formState} = useForm()

  const {errors} = formState

  const queryClient = useQueryClient()

  const {isLoading:creatingCabin,mutate} = useMutation({
    mutationFn: (newCabin)=>createCabin(newCabin),
    onSuccess: ()=>{
      toast.success('cabin created successfully')
      queryClient.invalidateQueries({
        queryKey:['cabins']
      })
      reset()
    },
    onError: err=>toast.error(err.message)
  })


  function onSubmit(data){

    mutate({...data,image: data.image[0]})
    }

    function onError(errors){
        // console.log(errors)
      }
  

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="name" error= {errors?.name?.message} >
        <Input type="text" id="name" {...register('name',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='maxCapacity' error= {errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity"  {...register('maxCapacity',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='regular_price' error= {errors?.regular_price?.message}>
        <Input type="number" id="regular_Price" {...register('regular_price',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='discount' error= {errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} {...register('discount',{
          required: "this field is required",
          validate: (value)=> value <= getValues().regular_price||'discount should be less than the regular price'
        })}/>
      </FormRow>

      <FormRow label='description' error= {errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register('description',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput id="image" accept="image/*" type="file" {...register('image',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={creatingCabin}>adding cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
