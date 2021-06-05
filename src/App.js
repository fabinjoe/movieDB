import logo from './logo.svg';
import './App.css';
import React, {useEffect, useeffect, useState} from "react";
import Movie from "./components/Movie";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b534d0b78b24367c9051942673e142bc&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=b534d0b78b24367c9051942673e142bc&query=";

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect( () => {
    fetch(FEATURED_API)
      .then( res => res.json() )
      .then(
        data => {
          setMovies(data.results);
        }
    );
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      // Once search is clicked we reset the movies
      fetch(SEARCH_API+searchTerm)
        .then( res => res.json() )
        .then(
          data => {
            setMovies(data.results);
          }
      );
      // Clear the input results
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (<>
      <header>
          <form onSubmit={handleOnSubmit}>
            <input className="search" type="text" placeholder="Search..." value={searchTerm} onChange={handleOnChange}/>
          </form>
      </header>
      <div className="App">  
        { movies.length > 0 && movies.map( movie => (
          <Movie key={movie.id} {...movie}/>
        ))}
      </div>
      </>
  ); 
}

export default App;
