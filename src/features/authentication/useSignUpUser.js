import { useMutation } from "@tanstack/react-query";
import { SignUpUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useSignUpUser() {
  const navigate = useNavigate();

  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: SignUpUser,
    onSuccess: (user) => {
      toast.success("your account has been successfully created!");
      navigate("/login");
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });
  return { signUp, isLoading };
}
