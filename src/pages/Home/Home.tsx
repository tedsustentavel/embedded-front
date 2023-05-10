export function Home() {
  return <h1>Bem-vindo {localStorage.getItem("@webserver-user")}</h1>;
}
