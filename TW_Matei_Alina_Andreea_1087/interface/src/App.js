import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Video } from "./components/Video";
import { FavouriteList } from "./components/FavouriteList";


function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/favouriteList" element={<FavouriteList />}></Route>
          <Route path="/video" element={<Video />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
