const VideoList = ({ videos, handleDelete, editVideos, all }) => {
    return (
      <div className="video-list">
          <h1>Videos</h1>
        {videos.map((video) => (
          <div className="preview-favouritelist" key={video.id}>
            <div className="textHolder">
              <p>Title: {video.title}</p>
              <p>Description: {video.description}</p>
              <p>Url: {video.url}</p>
              <p>FavouriteList: {video.ListId}</p>
            </div>
            {!all && (
              <div className="buttonHolder">
                <button
                  className="button"
                  onClick={() => handleDelete(video.id)}
                >
                  Delete video
                </button>
                <button
                  className="button"
                  onClick={() => editVideos(video.id)}
                >
                  Modify video
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default VideoList;
  