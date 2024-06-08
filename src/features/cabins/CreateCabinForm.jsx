import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm({ onShowForm }) {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success('New cabin succesfuly created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      onShowForm(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  // const onError = (errors) => {
  //   console.log(errors);
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (currentDiscountValue) =>
              currentDiscountValue <= getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="textarea"
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
