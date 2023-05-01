import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/submitButton";
import Input from "@/components/input";

interface IsignUpForm {
  email: string;
  username: string;
  password: string;
  cPassword: string;
  phone: string;
  birth: string;
  extraError?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IsignUpForm>();

  const submitForm: SubmitHandler<IsignUpForm> = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form className="mt-40 flex flex-col" onSubmit={handleSubmit(submitForm)}>
        <Input
          name="username"
          label="이름"
          type="username"
          kind="text"
          register={register("username", {
            required: "Username is required",
            pattern: {
              value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
              message: "Username regex",
            },
          })}
          placeholder="이름"
          error={errors?.username?.message}
        />

        <div className="mb-5" />

        <SubmitButton type="submit" text="회원가입" />
      </form>
    </div>
  );
}

export default SignUp;
