import { GiphyFetch } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import React from 'react';
import ImageItem from './ImageItem';
const apikey = process.env.REACT_APP_API_KEY as string;
const giphyFetch = new GiphyFetch(apikey);

const Search = () => {
  const [images, setImages] = React.useState<IGif[]>([]);
  const [keyword, setKeyword] = React.useState<string>('');
  const [offset, setOffset] = React.useState<number>(0);

  const typingTimeoutRef = React.useRef<any>(null);

  const fetchImages = async (pKeyword: string, pOffset = 0) => {
    if (!pKeyword) return;
    setKeyword(pKeyword);
    const { data, meta, pagination } = await giphyFetch.search(pKeyword, {
      offset: pOffset * 8,
      limit: 8,
    });
    console.log(pagination);
    if (meta.status === 200) {
      setImages(images.concat(data));
    }
  };

  const fetchMoreImages = async () => {
    setOffset(offset + 1);
    fetchImages(keyword, offset + 1);
  };
  const handleOnChangeInput = (event: any) => {
    const value = event.target.value;
    console.log(value);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      // reset data to search
      setOffset(0);
      setImages(() => []);
      setKeyword(value);
    }, 500);
  };

  React.useEffect(() => {
    if (keyword) {
      fetchImages(keyword);
      console.log('fetch');
    }
  }, [keyword]);
  return (
    <div className='searchTab'>
      <div className='input-search'>
        <input type='text' id='q' required onChange={handleOnChangeInput} />
        <label htmlFor='q'>Start searching for images</label>
      </div>
      <div className='row'>
        {images?.map((item) => (
          <ImageItem key={item.id} {...item} />
        ))}
        <div className='col-12 text-center'>
          {images?.length >= 8 && (
            <button
              className='btn rounded-pill btn-info'
              onClick={fetchMoreImages}>
              Fetch More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Search.propTypes = {};

export default Search;
