import { useEffect, useState } from "react";
import VideoList from "./VideoList";
import  FavouriteLists  from "./FavouriteLists";
import { useNavigate } from "react-router-dom";

export const FavouriteList = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };
  const [favouriteList, setFavouriteLists] = useState([]);
  const [list, setFavouriteList] = useState({
    description: "",
  });
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getFavouriteLists();
  }, []);

  const getFavouriteLists = () => {
    const req = `http://localhost:8080/favouritelists`;
    fetch(req).then((response) => {
        console.log(response);
      if (response.status === 200) {
        response.json().then((json) => {
          setFavouriteLists(json);
        });
      } else {
        setFavouriteLists([]);
      }
    });
  };

  const createFavouriteList = (e) => {
    e.preventDefault();

    const description = e.target.description.value;

    if (description.length > 0) {
      const req = `http://localhost:8080/favouritelists`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          description: description,
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("list was inserted");
          getFavouriteLists();
        } else if (response.status === 500) {
          console.log("list was not inserted");
        }
      });
    }
  };

  const deleteFavouriteList = (id) => {
    const req = `http://localhost:8080/favouritelists/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (response.status === 200) {
        getFavouriteLists();
        console.log("list was deleted");
      } else if (response.status === 500) {
        console.log("list was not deleted");
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/favouritelists/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setFavouriteList(json);
          setDescription(json.description);
        });
      }
    });
  };

  const editFavouriteList = (e) => {
    const description2 = e.target.modifyDescription.value;

    const req = `http://localhost:8080/favouritelists/${list.id}/`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        description: description2,
      }),
    }).then((response) => {
      if (response.status === 201) {
        console.log("list was modified");
        getFavouriteLists();
      } else if (response.status === 500) {
        console.log("list was not modified");
      }
    });
  };

  const handleView = (id) => {
      console.log(id);
    const req = `http://localhost:8080/videos/list/${id}`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setVideos(json);
        });
      }
    });
  };

  return (
    <div className="content">
      <div className="left">
        <button className="button" onClick={backHome}>
          Back Home
        </button>
        <form className="form" onSubmit={createFavouriteList}>
          <label className="description">Description of the list</label>
          <input type="text" name="description" placeholder="Description" />
          <button className="button">Create Favourite List</button>
        </form>

        <form className="form" onSubmit={editFavouriteList}>
          <label className="description">
            Modify the description of the list
          </label>
          <input
            type="text"
            name="modifyDescription"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="button">Modify Favourite List</button>
        </form>
      </div>

      <div className="right">
        <FavouriteLists
          favouriteLists={favouriteList}
          handleDelete={deleteFavouriteList}
          editFavouriteList={fetchData}
          viewVideos={handleView}
        />
        <VideoList
          videos={videos}
          
        />
      </div>
    </div>
  );
};