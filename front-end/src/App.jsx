import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar';
import MoviesList from './pages/movies/moviesList';
import AddMovie from './pages/movies/addMovie';
import EditMovie from './pages/movies/editMovie';
import ActorsList from './pages/actors/actorsList';
import AddActor from './pages/actors/addActor';
import EditActor from './pages/actors/editActor';
import GenresList from './pages/genres/genresList';
import AddGenre from './pages/genres/addGenre';
import EditGenre from './pages/genres/editGenre';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path='/app' element={<MoviesList/>}/>
          <Route exact path='/app/movies/add' element={<AddMovie/>}/>
          <Route path='/app/movies/edit/:movieId' element={<EditMovie/>}/>

          <Route exact path='/app/actors' element={<ActorsList/>}/>
          <Route exact path='/app/actors/add' element={<AddActor/>}/>
          <Route path='/app/actors/edit/:actorId' element={<EditActor/>}/>

          <Route exact path='/app/genres' element={<GenresList/>}/>
          <Route exact path='/app/genres/add' element={<AddGenre/>}/>
          <Route path='/app/genres/edit/:genreId' element={<EditGenre/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
