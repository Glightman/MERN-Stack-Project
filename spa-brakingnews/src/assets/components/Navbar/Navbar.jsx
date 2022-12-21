import logo from "../../images/logo-google-512.png";
import "./Navbar.css"

export function Navbar() {
  return (
    <>
      <nav>
        <div className="input-search-space">
          <i class="bi bi-search"></i>
          <input type="text" placeholder="pesquise por um título"/>
        </div>

        <img src={logo} alt="logo breaking news" />

        <button>Entrar</button>
      </nav>
    </>
  );
}
