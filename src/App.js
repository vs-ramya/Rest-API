import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const[movies,setmovies]=useState([]);
  const[isLoading,setisLoading]=useState(false);
 async function fetchHandler() {
  // we didn't mention any crud method here in default it is GET
   const response=await fetch('https://swapi.dev/api/films/');
   //Simplest way  to convert into json using fetch method inorder to arrange it in json (readable format)
   const data=await response.json();
  //map over the data to view particular datas
      const transformedMovies=data.results.map(movieData => {
        return {
          id:movieData.episode_id,
          title:movieData.title,
          openingText:movieData.opening_crawl,
          releaseDate:movieData.release_date
        }
      })
      setmovies(transformedMovies);
      setisLoading(false);
  


  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading  && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && <h2>CLICK THE BUTTON TO FETCH MOVIES LIST</h2>}
       
        {isLoading && <h2>LOADING ....</h2>}
      </section>
    </React.Fragment>
  );
}

export default App;
