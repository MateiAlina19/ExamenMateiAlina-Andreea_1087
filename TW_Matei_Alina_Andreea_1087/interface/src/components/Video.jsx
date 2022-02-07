import { useEffect, useState } from "react";
import VideoList from "./VideoList";
import { useNavigate } from "react-router-dom";

export const Video = () => {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState({
    title: "",
    description: "",
    url: "",
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [favouriteList, setFavouriteLists] = useState([]);

  useEffect(() => {
    getVideos();
    getFavouriteLists();
  }, []);

  const getFavouriteLists = () => {
    const req = `http://localhost:8080/favouritelists`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setFavouriteLists(json);
        });
      } else {
        setFavouriteLists([]);
      }
    });
  };

  const getVideos = () => {
    const req = `http://localhost:8080/videos`;
    fetch(req).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setVideos(json);
        });
      } else {
        setVideos([]);
      }
    });
  };

  const createVideo = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const url = e.target.url.value;
    const list = e.target.FavouriteList.value;

    console.log(list);

    if (title.length > 0) {
      const req = `http://localhost:8080/videos`;
      fetch(req, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          url: url,
          ListId: list,
        }),
      }).then((response) => {
        if (response.status === 200) {
          console.log("Video was inserted");
          getVideos();
        } else if (response.status === 500) {
          console.log("Video was not inserted");
        }
      });
    }
  };

  const deleteFavouriteList = (id) => {
    const req = `http://localhost:8080/videos/${id}/`;
    fetch(req, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        getVideos();
        console.log("Video was deleted");
      } else if (response.status === 500) {
        console.log("Video was not deleted");
      }
    });
  };

  const fetchData = (id) => {
    const req = `http://localhost:8080/videos/${id}`;
    fetch(req).then((response) => {

      if (response.status === 200) {
        response.json().then((json) => {
          setVideo(json);
          setTitle(json.title);
          setDescription(json.description);
          setUrl(json.url);
        });
      }
    });
  };

  const editFavouriteList = (e) => {
    const title2 = title;
    const description2 = description;
    const url2 = url;

    console.log(title2);
    console.log(description2);
    console.log(url2);
    console.log(video.id);

    const req = `http://localhost:8080/videos/${video.id}`;
    fetch(req, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: title2,
        description: description2,
        url: url2,
      }),
    }).then((response) => {
        console.log(response);
      if (response.status === 200) {
        console.log("Video was modified");
        getVideos();
      } else if (response.status === 500) {
        console.log("Video was not modified");
      }
    });
  };

  return (
    <div className="content">
      <div className="left">
        <button className="button" onClick={backHome}>
          Back Home
        </button>
        <form className="form" onSubmit={createVideo}>
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="description" placeholder="description" />
          <input type="url" name="url" placeholder="url" />
          <select id="FavouriteList" name="FavouriteList">
            {favouriteList.map((list) => (
              <option value={list.id} key={list.id}>
                {list.description}
              </option>
            ))}
          </select>
          <button className="button">Create video</button>
        </form>

        <form className="form" onSubmit={editFavouriteList}>
          <input
            type="text"
            title="modifyTitle"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="modifyDescription"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="url"
            name="modifyUrl"
            placeholder="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button">Modify video</button>
        </form>
      </div>

      <div className="right">
        <VideoList
          videos={videos}
          handleDelete={deleteFavouriteList}
          editVideos={fetchData}
          all={false}
        />
      </div>
    </div>
  );
};
