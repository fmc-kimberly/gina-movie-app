import React, {useEffect, useState} from 'react'
import Link from '@mui/material/Link';
import {collection, getDocs, doc, deleteDoc, updateDoc, where} from "firebase/firestore"
import {db, logout, auth} from '../../firebase-config'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NavBar from '../NavBar'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { getAuth} from "firebase/auth"


const userId =()=>{
let authorization = getAuth();
 let uid = authorization.currentUser.uid
  return uid
}

export default function Dashboard() {
   
    const [movies, setMovies]=useState([])
    const moviesCollectionRef = collection(db, "movies")
    // const uId = userId()
    useEffect(()=>{
        const getDashboardMovies = async ()=>{
            
        // const movies = await db.collection("movies").where("uid", '==', uId).get()
        const movies = await getDocs(moviesCollectionRef)
        setMovies(movies.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }
        getDashboardMovies()
    }, [])
    const deleteMovieFromDashboard = async(movie)=>{
        try{
        await deleteDoc(doc(db, "movies", movie))
        window.location.reload(false)
        } catch(err){
            console.log(err)
        }
       
    }
    const [notes, setNotes] = useState("")
     const updateNotes = async(id, notes)=>{
        const movieDoc = doc(db, "movies", id)
        const newNotes = {"notes": notes}
        try{
        await updateDoc(movieDoc, newNotes)
        window.location.reload(false)
        } catch(err){
            console.log(err)
        }
       
    }
    return(
        <>
        <NavBar />
        {movies? movies.map((movie)=>{
            return    <div key={movie.id}>
                        <h2>{movie.title}</h2>
                        <div>
                            <img
                            width="200"
                            alt={`The movie titled: ${movie.Title}`}
                            src={movie.poster}
                            />
                        </div>
                        <p>{movie.year}</p>
                        <Button onClick = {()=>{deleteMovieFromDashboard(movie.id)}}>Delete Movie</Button>
                        <p>Edit Movie Notes</p>
                         <TextField
                        margin="normal"
                        required
                        fullWidth
                         id="notes"
                        label={movie.notes ?movie.notes:"There are no notes currently"}
                        name="notes"
                        autoComplete="notes"
                        autoFocus
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
            />
                        <Button onClick={()=>{updateNotes(movie.id, notes)}}>Update Movie Notes</Button>
                    </div>
        }):"You have no movies saved!"}
        <Link href="/search" variant="body2">
                  Search Movies
        </Link>
        </>
    )
}

