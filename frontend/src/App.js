import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import { logo } from "./Assets/index";

function App() {
  return (
    <BrowserRouter>
      <header
        className="w-full flex justify-between items-center
      bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] "
      >
        <Link to={"/"}>
          <img className="w-28 object-contain" src={logo} alt="" />
        </Link>
        <Link
          to={"/create-post"}
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md "
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/create-post" exact element={<CreatePost/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
