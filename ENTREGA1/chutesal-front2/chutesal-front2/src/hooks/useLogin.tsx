import React, { createContext, useContext, useState } from "react";

interface IHookProps {}

interface ILoginContextProps {
  logado: boolean;
  setLogado: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginContext = createContext<ILoginContextProps>(
  {} as ILoginContextProps
);

export const LoginProvider = ({ children }: { children: JSX.Element }) => {
  const [logado, setLogado] = useState<boolean>(false);

  return (
    <LoginContext.Provider
      value={{
        logado,
        setLogado,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
