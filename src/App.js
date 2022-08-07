import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [photo, setPhoto] = useState([]);
  const params = {
    method: "flickr.photos.search",
    api_key: "636e1481b4f3c446d26b8eb6ebfe7127",
    tags: `fly`,
    per_page: 24,
    format: "json",
    nojsoncallback: 1,
    page: 1,
  };
  function pageHandler(value) {
    params.page = value;
    FetchPhoto();
  }

  async function FetchPhoto() {
    const { data } = await axios.get("https://api.flickr.com/services/rest/", {
      params,
    });

    setPhoto(
      data.photos.photo.map((photo) => {
        const { id, farm, server, secret } = photo;
        return {
          url: `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`,
        };
      })
    );
  }
  useEffect(() => {
    FetchPhoto();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1 className="font-extrabold font-serif text-7xl py-12">SnapShot</h1>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className=" p-2 px-4 my-8 w-[250px] border-solid border-black rounded-xl border-2"
            id="input-search"
            onChange={(e) => {
              params.tags = e.target.value;
            }}
          />
          <button
            className="bg-slate-800 text-white p-[10px] mx-2 rounded"
            onClick={() => {
              let input = document.getElementById("input-search");
              if (input.value !== "") {
                FetchPhoto();
              }
            }}
          >
            Search
          </button>
        </div>
        <div className="flex ">
          <div
            onClick={(e) => {
              params.tags = e.target.innerText;
              FetchPhoto();
            }}
          >
            <span className="font-mono font-medium px-4 py-2 bg-gray-800 text-white mx-4 rounded-xl">
              Mountain
            </span>
          </div>
          <div
            onClick={(e) => {
              params.tags = e.target.innerText;
              FetchPhoto();
            }}
          >
            <span className="font-mono font-medium px-4 py-2 bg-gray-800 text-white mx-4 rounded-xl">
              Beach
            </span>
          </div>
          <div
            onClick={(e) => {
              params.tags = e.target.innerText;
              FetchPhoto();
            }}
          >
            <span className="font-mono font-medium px-4 py-2 bg-gray-800 text-white mx-4 rounded-xl">
              Car
            </span>
          </div>
          <div
            onClick={(e) => {
              params.tags = e.target.innerText;
              FetchPhoto();
            }}
          >
            <span className="font-mono font-medium px-4 py-2 bg-gray-800 text-white mx-4 rounded-xl">
              Flower
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 ">
          {photo.map((photo, index) => {
            return (
              <a href={photo.url} key={index}>
                <img
                  key={index}
                  className="m-8 h-64 w-64 rounded-2xl border-solid border-[1px] border-gray-300"
                  src={photo.url}
                  alt="#"
                />
              </a>
            );
          })}
        </div>
        <Pagination
          total={144}
          params={params}
          pageSize={24}
          onPage={pageHandler}
        />

        <span className="m-8 font-mono font-medium bg-gray-300 p-4 rounded-xl">Created By Murad :)</span>
      </div>
    </>
  );
}
export default App;
