import { useEffect, useState } from "react";

export const useAuth = (): boolean => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    setIsLoggedIn(() => (token ? true : false));
  }, []);

  return isLoggedIn;
};
