import './Header.css';
import MenuChoice from "./MenuChoice.js";
import { useEffect, useState } from 'react';

function Header({ menuChoices, changePage, onLogoClick, openModal }) {
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    setChoices(menuChoices.filter(choice => choice.text != 'Welcome'))
  }, [])
  
  // TODO wrzucić logo
  return (
    <div id="header">
      <div id="logo-and-name-wrapper" onClick={onLogoClick}>
        <div id="logo-wrapper">
          <img id="logo" src="/ecological.png" alt="logo"></img>
        </div>
        <div id="app-name">Quiz<section id="sec-part">App</section></div>
      </div>
      <div id="navigation">
        <div id="navbar-wrapper">
          <div id="navbar">
            {choices.map((menuChoice, index) => 
            <MenuChoice key={index} menuChoice={menuChoice} changePage={changePage}/>
            )}
            <button id="login" onClick={openModal}>LOGIN</button>
          </div>
        </div>
        <div id="bar-icon-wrapper">
          <img id="bar-icon" src="/menu.png" alt="menu-icon"></img>
        </div>
      </div>
    </div>
  );
}
export default Header;
