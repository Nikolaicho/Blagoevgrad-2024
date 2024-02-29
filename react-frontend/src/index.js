import React from 'react';
import ReactDOM from 'react-dom/client';
import WelcomePage from './components/WelcomePage';
import Play from "./components/Play"
import ChessBoard from "./components/ChessBoard"
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Test from "./components/Test"
import Forum from './components/Forum';
import Post from './components/Post';
import notFound from './components/notFound';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>

    <Router>
      <Routes>
        <Route path = "/" element = {<WelcomePage/>} />
        <Route path = "/play" element = {<Play/>} />
        <Route path = "/game" element = {<ChessBoard/>} />
        <Route path = "/test" element = {<Test/>}/>
        <Route path = "/forum" element = {<Forum/>}/>
        <Route path = "/forum/:id" element = {<Post/>} />
        <Route path = "/not-found" element = {<notFound/>}/>
      </Routes>
    </Router>
    </>
);
