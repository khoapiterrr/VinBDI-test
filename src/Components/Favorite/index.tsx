import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import ImageItem from 'Components/Search/ImageItem';
import React from 'react';
const apikey = process.env.REACT_APP_API_KEY as string;
const giphyFetch = new GiphyFetch(apikey);
const Favorite = () => {
  const [images, setImages] = React.useState<IGif[]>([]);
  React.useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = localStorage.getItem('favorites')?.split(',') ?? [];
      const { data } = await giphyFetch.gifs(favorites);
      setImages(data);
    };

    fetchFavorites();
  }, []);
  return (
    <div className='favoriteTab'>
      <div className='row'>
        {images?.map((item) => (
          <ImageItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

Favorite.propTypes = {};

export default Favorite;
