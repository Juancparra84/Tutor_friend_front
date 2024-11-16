import { NavPriv } from "./NavPriv";
import logo from '../../../assets/img/logo.png';

export const HeaderPriv = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        {/* <a href="#" className="navbar__title" >TUTOR FRIEND</a> */}
        <div className="logo__img" > 
        <img src={ logo } ></img>
        </div>
      </div>
      <NavPriv />
    </header>
  )
}