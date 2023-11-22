import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: {},
  });

  return { isLoading, logout };
}
