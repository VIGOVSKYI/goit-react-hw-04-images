import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';

import { getImj } from '../shared/servises/img-api';
import SearchForm from '../SearchForm/SearchForm';
import SearchList from '../SearchList/SearchList';
import Modal from '../Modal/Modal';
import LargeImageForModal from '../largeImageForModal/largeImageForModal';

import styles from './img-search.module.css';

const ImgSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (search) {
      const fetchImj = async () => {
        try {
          setLoading(true);
          const data = await getImj(search, page);
          setItems(items => [...items, ...data.hits]);
          setTotalHits(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchImj();
    }
  }, [search, page, setItems, setTotalHits, setError, setLoading]);

  const searchImg = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  const showlargeImage = ({ largeImageURL }) => {
    setLargeImage(largeImageURL);
    setShowModal(true);
  };

  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage(null);
  };

  let totalPages = Math.ceil(totalHits / items.length) || null;

  return (
    <>
      <SearchForm onSubmit={searchImg} />
      <SearchList items={items} showlargeImage={showlargeImage} />
      {error && <p>{error}</p>}
      {loading && (
        <div className={styles.spiner}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}

      {totalPages > 1 && (
        <button className={styles.button} onClick={LoadMore}>
          Load More
        </button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <LargeImageForModal largeImage={largeImage} />
        </Modal>
      )}
    </>
  );
};

export default ImgSearch;