import PropTypes from 'prop-types';
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/ApiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";



function CreateCabinForm({cabinToEdit={}}) {

  const {id:editId,...editValues} = cabinToEdit

  const isEditSession = Boolean(editId)

  const {register,handleSubmit,reset,getValues,formState} = useForm(
    {
      defaultValues: isEditSession ? editValues : {}
    }
  )

  const {errors} = formState

  const queryClient = useQueryClient()

  const {isLoading:creatingCabin,mutate:createCabin} = useMutation({
    mutationFn: (newCabin)=>createEditCabin(newCabin),
    onSuccess: ()=>{
      toast.success('cabin created successfully')
      queryClient.invalidateQueries({
        queryKey:['cabins']
      })
      reset()
    },
    onError: err=>toast.error(err.message)
  })



  const {isLoading:isEditing,mutate:editCabin} = useMutation({
    mutationFn: ({newCabinData,id})=>createEditCabin(newCabinData,id),
    onSuccess: ()=>{
      toast.success('successfully Edited Cabon details')
      queryClient.invalidateQueries({
        queryKey:['cabins']
      })
      reset()
    },
    onError: err=>toast.error(err.message)
  })


  const isWorking = isEditing || creatingCabin

  function onSubmit(data){

    const image = typeof data.image === 'string'? data.image :data.image[0]

    if(isEditSession) editCabin({newCabinData:{...data,image},id:editId})

    else createCabin({...data,image: image})
    }

    function onError(errors){
        // console.log(errors)
      }
  

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label=" cabin name" error= {errors?.name?.message} >
        <Input type="text" id="name" disabled={isWorking} {...register('name',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='maximum capacity' error= {errors?.maxCapacity?.message}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='regular price of cabin' error= {errors?.regular_price?.message}>
        <Input type="number" id="regular_Price" disabled={isWorking} {...register('regular_price',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='discount of cabin' error= {errors?.discount?.message} >
        <Input type="number" id="discount" defaultValue={0} disabled={isWorking} 
        {...register('discount',{
          required: "this field is required",
          validate: (value)=> value <= getValues().regular_price||'discount should be less than the regular price'
        })}/>
      </FormRow>

      <FormRow label='description for the website' error= {errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" disabled={isWorking} {...register('description',{
          required: "this field is required"
        })}/>
      </FormRow>

      <FormRow label='Cabin Photo'>
        <FileInput id="image" accept="image/*" type="file" {...register('image',{
          required: isEditSession? false : "this field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        
        <Button disabled={isWorking}>{isEditSession? "Edit Cabin" : "Add Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object
};

export default CreateCabinForm;
