import { useForm } from "react-hook-form";
import { userService } from "../../services/services";
import toast from "react-hot-toast";
import FormInputField from "../../ui/FormInputField";

function UserEditDetailsForm({ username, email }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: { username: username, email: email },
  });
  async function onBlur(data) {
    try {
      if (!isDirty) return;
      await userService.updateUserDetails(data);
      toast.success("User settings updated successefully");
      reset(data);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <form className="space-y-8" onBlur={handleSubmit(onBlur)}>
      <FormInputField
        register={register}
        labelName="email"
        labelColor="black"
      />
      <FormInputField
        register={register}
        labelName="username"
        labelColor="black"
      />
    </form>
  );
}

export default UserEditDetailsForm;
