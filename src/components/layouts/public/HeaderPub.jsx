import { NavPub } from "./NavPub";
import logo from '../../../assets/img/logo.png';

export const HeaderPub = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        {/* <a href="#" className="navbar__title" >TUTOR FRIEND</a> */}
        <div className="logo__img" > 
          <img src={ logo } ></img>
        </div>
      </div>
      <NavPub />
    </header>
  )
}