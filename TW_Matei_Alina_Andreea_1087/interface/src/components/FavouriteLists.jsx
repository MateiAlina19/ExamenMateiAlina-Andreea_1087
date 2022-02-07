const FavouriteLists = ({
    favouriteLists,
    handleDelete,
    editFavouriteList,
    viewVideos,
  }) => {
    return (
      <div className="lists">
          <h1>Favourite Lists</h1>
        {favouriteLists.map((favouriteList) => (
          <div className="preview-list" key={favouriteList.id}>
            <div className="textHolder">
              <p>List Id: {favouriteList.id}</p>
              <p>Description: {favouriteList.description}</p>
              <p>Data crearii: {favouriteList.createdAt}</p>
            </div>
            <div className="buttonHolder">
              <button
                className="button"
                onClick={() => handleDelete(favouriteList.id)}
              >
                Delete Favourite List
              </button>
              <button
                className="button"
                onClick={() => editFavouriteList(favouriteList.id)}
              >
                Modify Favourite List
              </button>
              <button
                className="button"
                onClick={() => viewVideos(favouriteList.id)}
              >
                View Videos
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default FavouriteLists;
  