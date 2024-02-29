import axios from "axios"
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Menu from './Menu'
import "../styles/Post.css"
const url = "http://localhost:3000"

function Post(){
    const {id} = useParams();
    const [title,setTitle] = useState()
    const [content,setContent] = useState()
    const [comments,setComments] = useState([])
    const [author,setAuthor] = useState()

    function createComment(){
        let comment = document.getElementsByClassName("comment-bar")[0].value
        axios.post(url +"/api/create-comment",{
            id:id,
            comment:comment,
            token:localStorage.getItem("accessToken")
        })
    }

    function deleteComment(commentID){
        axios.post(url +"/api/delete-comment",{
            commentID:commentID,
            forumID:id,
            token:localStorage.getItem("accessToken")
        })
    }
    function deleteThread(id){
        axios.post("/api/delete-thread",{
            id:id,
            token:localStorage.getItem("accessToken")
        })
        window.location.href = "/forum"
    }

    useEffect(()=>{
        async function FetchData(){
            let res = await axios.post(url +"/api/post-info",{id:id})
            if(res == "404"){
                console.log("qsha")
            }

            else{
                setTitle(res.data.title)
                setContent(res.data.content)
                setComments(res.data.comments)
                setAuthor(res.data.author)
            }
        }
        
        FetchData();
      
    },[])
return (
    <>
    <div className = "post-container">
        <Menu/>
        <div className = "content-container">
            <h1 className = "title">{title}</h1>
            {(author === localStorage.getItem("username") || localStorage.getItem("role") == "true") && (
                <button onClick = {()=>{deleteThread(id)}}>Изтрий темата</button>
            )}
            
            <h4>Написано от:{author}</h4>
            <div className = "content">{content}</div>
            <h4>{comments.length} коментара</h4>
            <textarea className = "comment-bar" placeholder="напиши коментар"></textarea>
            <button onClick={createComment}>създай</button>
            {comments.map(comment => (
                <div>
                <div>{comment.content}</div>
                <div>{comment.author}</div>
                {(comment.author === localStorage.getItem("username") || localStorage.getItem("role") == "true") && (
                    <button onClick = {()=>{deleteComment(comment.id,id)}}>изтрий</button>
                )}
                </div>
            ))}
        </div>
    </div>
    </>
  )    
}
export default Post;