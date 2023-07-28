import { TokenName } from "./BaseURL";

export function useLogOut() {
  const logOut = () => {
    localStorage.removeItem(TokenName);
    location.replace("/");
  };

  return { logOut };
}
