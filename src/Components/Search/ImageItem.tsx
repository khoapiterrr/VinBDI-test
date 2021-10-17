import { IGif } from '@giphy/js-types';
import { Gif } from '@giphy/react-components';
import heart from 'assets/img/heart.png';
import heartHover from 'assets/img/heartHover.png';
import React from 'react';
import { toast } from 'react-toastify';

const ImageItem: React.FC<IGif> = (props) => {
  const id = props.id as string;
  const favorites = localStorage.getItem('favorites')?.split(',') ?? [];

  const [isFavorite, setIsFavorite] = React.useState<boolean>(
    favorites.includes(id),
  );

  const handleOnClickFavorite = () => {
    const _favorites = localStorage.getItem('favorites')?.split(',') ?? [];
    setIsFavorite(true);
    if (!_favorites.includes(id)) {
      _favorites.push(id);
      localStorage.setItem('favorites', _favorites.join(','));
      toast.success('Add favorite successfully');
    }
  };

  const handleOnClickRemoveFavorite = () => {
    const _favorites = localStorage.getItem('favorites')?.split(',') ?? [];
    setIsFavorite(false);
    if (_favorites.includes(id)) {
      const tmp = _favorites.filter((x) => x !== id);
      localStorage.setItem('favorites', tmp.join(','));
      toast.success('Remove favorite successfully');
    }
  };

  return (
    <div className='col-md-3 pb-4'>
      <div className='image-item'>
        <Gif className='w-100' gif={props} width={300} height={250} />
        {isFavorite ? (
          <div
            className='overlay dislike'
            onClick={handleOnClickRemoveFavorite}>
            <img src={heart} alt='dislike' />
          </div>
        ) : (
          <div className='overlay like' onClick={handleOnClickFavorite}>
            <img src={heartHover} alt='like' />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageItem;
