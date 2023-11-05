import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../assets/Icons/Logo/Logo";
import { Exit } from "../../assets/Icons/Exit/Exit";
import { Text } from "../Text/Text";
import { useLogin } from "../../hooks/useLogin";
import { LoginIcon } from "../../assets/Icons/Login/Login";

export function Menu() {
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const { logado, setLogado } = useLogin();

  const routes = [
    {
      label: "Campeonatos",
      to: "/campeonatos",
    },
    logado
      ? {
          label: "Unidades",
          to: "/unidades",
        }
      : {
          label: "Jogos",
          to: "/jogos",
        },
  ];

  return (
    <nav
      className={
        "flex bg-gray-700 w-full h-14 items-center justify-between px-5"
      }
    >
      <NavLink to={"/"}>
        <Logo className={"hover:stroke-green-500"} />
      </NavLink>
      <ul className={"flex h-full"}>
        {routes.map((route, index) => (
          <li
            key={index}
            className={"flex flex-col h-full items-center justify-between"}
          >
            <div></div>
            <NavLink to={route.to}>
              <Text className={"text-gray-200 px-3 hover:text-white"}>
                {route.label}
              </Text>
            </NavLink>
            {pathName === route.to ? (
              <hr className={"w-12 border-y-1 border-green-700 bg-green-700"} />
            ) : (
              <div></div>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          setLogado((logado) => {
            navigate("/");
            return !logado;
          })
        }
        className={"flex items-center w-[5%]"}
      >
        {logado ? <Exit /> : <LoginIcon />}
        <Text className={"text-gray-200 px-2 hover:text-white"}>
          {logado ? "Logout" : "Login"}
        </Text>
      </button>
    </nav>
  );
}
