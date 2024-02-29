import React from "react";
import "../styles/WelcomePage.css";
import WelcomePicture from "../chess-pieces/welcome-picture.png";
import axios from 'axios'
import Cookies from "universal-cookie";
import Menu from './Menu'
const cookie = new Cookies()
const url = "http://localhost:3001"

function triggerError(errorMessage){
  //IP - invalid password
  //IM - invalid mail
  let error = document.getElementsByClassName("error")[0]

  if(errorMessage == "IP"){
    error.textContent = "Къса парола"
  }
  if(errorMessage == "IM"){
    error.textContent = "Невалиден и-мейл"
  }
}

function makePannelAppear(panel) {
  let panel1 = document.getElementsByClassName("sign-in-form")[0];
  let panel2 = document.getElementsByClassName("log-in-form")[0];
  
  if(panel == panel1 && panel2.style.display == "block"){
    panel.style.display = "block"
    panel2.style.display = "none"
  } 

  if(panel == panel2 && panel1.style.display == "block"){
    panel.style.display = "block"
    panel1.style.display = "none"
  }
  
  if(panel1.style.display != "block" && panel2.style.display != "block"){
    panel.style.display = "block"
  }
}

function closePanel(){
  let panel1 = document.getElementsByClassName("sign-in-form")[0];
  let panel2 = document.getElementsByClassName("log-in-form")[0];
  panel1.style.display = "none"
  panel2.style.display = "none"
}

function createProfile(){
  const username = document.getElementsByClassName("username")[0].value
  const email = document.getElementsByClassName("email")[0].value
  const password = document.getElementsByClassName("password")[0].value
  const confirmPassword = document.getElementsByClassName("confirm-password")[0].value

  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(regex.test(email)){
    if(password == confirmPassword && password.length >= 8){

      axios.post( url + "/api/register",{
        username:username,
        password:password,
        email:email,
      })

      .then((res)=>{
        //promeni s biskvitka
        localStorage.setItem("refreshToken",res.data.refreshToken)
        localStorage.setItem("accessToken",res.data.accessToken)
        localStorage.setItem("username", "b")
        window.location.href = '/play';
      })
    }
    else if(password.length < 8){
      triggerError("IP")
    }
  }
  else{
    triggerError("IM")
  }
}

function logIn(){
  let identifier = document.getElementsByClassName("LogInIndentifier")[0].value
  let password = document.getElementsByClassName("LogInPassword")[0].value
  axios.post(url+"/api/log-in",{
    identifier:identifier,
    password:password
  }).then((res)=>{
    //promeni s biskvitka
    localStorage.setItem("refreshToken",res.data.refreshToken)
    localStorage.setItem("accessToken",res.data.accessToken)
    localStorage.setItem("username", res.data.username)
    localStorage.setItem("role", res.data.admin)
    window.location.href = '/play';
  })
}
function WelcomePage() {
  return (
    <>
      <div id="container">
      <Menu/>
        <div id="subcontainer">

          <div id="text-container">

            <div id="welcome-message">
              Започнете шахматното си <br />
              пътешествие в Chess+, където
              <br /> всеки ход оформя стила Ви
            </div>

            <div className="basic-button sign-in" onClick={() => {
              let panel = document.getElementsByClassName("sign-in-form")[0];
                makePannelAppear(panel);
              }}
            >
              Регистрирай се
            </div>

            <div
              className="basic-button log-in"
              onClick={() => {
                let panel = document.getElementsByClassName("log-in-form")[0];
                makePannelAppear(panel);
              }}
            >

              Влез
            </div>
          </div>
          <div className = "ImageContainer">
            <img src={WelcomePicture} />
          </div>
          
        </div>
        
        <div className="third item to make the main one in the center"></div>
        
      </div>

      <div className="sign-in-form form">
        <div onClick = {closePanel} className="close">X</div>
        <h2>Искате да се присъедините?</h2>
        <div className="error"></div>
        <div className = "label-container">
          <input className = "username" placeholder="Потребителско име"></input>
        </div>
        <div className = "label-container">
          <input className = "email" placeholder="Имейл"></input>
        </div>
        <div className = "label-container">
          <input type = "password" className = "password" placeholder="Парола"></input>
        </div>
        <div className = "label-container">
          <input type = "password"  className = "confirm-password" placeholder="Повтори парола"></input>
        </div>

        <div className="submit-button">
          <button onClick = {createProfile} type="submit">
            Регистрирай се!
          </button>
        </div>
      </div>

      <div className="log-in-form form">
        <div onClick = {closePanel} className="close">X</div>
        <h2>Влез</h2>
        <div className="error"></div>
        <div className = "label-container">
          <input className = "LogInIndentifier" placeholder="Имейл или потребителско име"></input>
        </div>
        <div className = "label-container">
          <input type = "password" className = "LogInPassword" placeholder="Парола"></input>
        </div>
        <div className="submit-button">
          <button onClick = {logIn} type="submit">
            Влез
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomePage;
