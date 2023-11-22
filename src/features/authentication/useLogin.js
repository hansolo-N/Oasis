import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginSupabase } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => LoginSupabase({ email, password }),
    mutationKey: ["login"],
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoading };
}
