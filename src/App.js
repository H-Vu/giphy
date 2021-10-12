import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Wall from "./Components/Wall";
import logo from "./giphy_logo.png";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({ dataArray: [] });
  const [page, setPage] = useState(0);

  const inputHandle = (e) => {
    setInput(e.target.value);
  };

  const searchHandle = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "eAbDgbVtx8KsjTMCbcjdYolMBVhUAaxz",
          q: input,
          limit: 20,
          offset: 0,
        },
      })
      .then((res) => {
        setData({
          dataArray: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err.status);
      });
    // console.log("App");
    // console.log(data.dataArray);
    setPage(0);
  };

  return (
    <div className="App">
      <img src={logo} />
      <div className="searchBar">
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            type="text"
            onChange={(e) => inputHandle(e)}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search" onClick={searchHandle} />
          </span>
        </div>
      </div>

      <Wall
        data={data}
        setData={setData}
        page={page}
        setPage={setPage}
        input={input}
      />
    </div>
  );
}

export default App;
