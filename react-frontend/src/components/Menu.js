import React, { useEffect } from 'react';
import "../styles/Menu.css"
import Logo from "../chess-pieces/logo.png";
import ChessImg from '../chess-pieces/chess.png';
import BG from "../chess-pieces/bulgarian-flag.png";
import UK from "../chess-pieces/uk-flag.png";

function openLanguageMenu(){
  let menu = document.getElementsByClassName("language-menu")[0]
  console.log(menu.style.display == "none" )
  if(menu.style.display == "none" || menu.style.display == ""){
    console.log(menu.style.display)
    menu.style.display = "flex"
    console.log(menu.style.display)
  }
  if(menu.style.display == "flex" || menu.style.display == ""){
    menu.style.display = "none"
  }
}

function Menu() {
  useEffect(()=>{
    document.querySelector('.placeholder').style.height = document.querySelector('#container-menu').offsetHeight + 'px';
  })
  return (
    <>
    <div className = 'placeholder'></div>
    <div id = 'container-menu'>
      <a className='logo-container' href='/'>
        <img className ='logo' src = {Logo}/>
        <img className ='logo' src={ChessImg} />
      </a>

      <a href= "/play">
        <div className='tab'>Играй</div>
      </a>
      
      <a href= "/forum">
        <div className='tab'>Форум</div>
      </a>
      <div className='language-menu' style={{ alignSelf: 'flex-end' }}>
        <div className='tab language'>
          <div>BG</div>
          <img className = "icon bg" src={BG}/>
        </div>
        <div className='tab language'>
          <div>UK</div>
          <img className = "icon bg" src={UK}/>
        </div>
      </div>
      
      
   </div> 
   </>
  );
}

export default Menu;