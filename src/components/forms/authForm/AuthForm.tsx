import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { loginUser, registerUser } from "../../../services/authServices";
import { AuthFormProps, AuthFormInputs } from "./authFormTypes";

const AuthForm = ({ mode }: AuthFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthFormInputs>();

  const onFormSubmit: SubmitHandler<AuthFormInputs> = (data) => {
    if (mode === "register") {
      dispatch(registerUser(data));
    } else {
      dispatch(loginUser(data));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="bg-white p-6 rounded-xl shadow-lg space-y-4"
    >
      {mode === "register" && (
        <div className="flex flex-col">
          <label htmlFor="username" className="font-medium text-gray-700">
            Username:
          </label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required" })}
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
      )}
      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="font-medium text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      {mode === "register" && (
        <div className="flex flex-col">
          <label
            htmlFor="confirmPassword"
            className="font-medium text-gray-700"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition duration-300"
      >
        {mode === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
