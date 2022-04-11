import { addDoc, collection } from "firebase/firestore";
import React from "react"
import {db} from '../../firebase-config'
import { getAuth} from "firebase/auth"

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

let auth = getAuth();
export const getUserId =()=>{
 const uid = auth.currentUser.uid
  return uid
}
const Movie = ({ movie }) => {
const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
const moviesCollectionRef = collection(db, "movies")

 
const addMovieToDashboard = async()=>{
   const id = getUserId()

    await addDoc(moviesCollectionRef, {
        title: movie.Title,
        poster: movie.Poster,
        year: movie.Year,
        notes: '',
        uid: id,
    })
    window.location.replace("/dashboard")
    
}
  return (
    <div className="movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>({movie.Year})</p>
      <button onClick = {addMovieToDashboard} href="/dashboard">Save Movie</button>
    </div>
  );
};


export default Movie;