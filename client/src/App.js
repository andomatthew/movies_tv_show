import { Routes, Route } from 'react-router-dom'

import Home from './containers/Home';
import Movie from './containers/Movie';
import TvShow from './containers/TvShow';
import MyList from './containers/MyList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />Î
        <Route path="/movies" element={<Movie />} />Î
        <Route path="/tv-shows" element={<TvShow />} />Î
        <Route path="/my-list" element={<MyList />} />Î
      </Routes>
    </div>
  );
}

export default App;
