import { useState } from 'react';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import PropTypes from 'prop-types';
import initialState from "./initialState"

import styles from './search-form.module.css';

const SearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({...initialState});

  const handlChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handlSubmit = e => {
    e.preventDefault();
    if (state.search.trim() === '') {
      return alert('Search field is empty');
    }
    const { search } = state;
    onSubmit({ search });
    setState({...initialState});
  };

  return (
    <>
      <header className={styles.searchBar}>
        <form onSubmit={handlSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <HiOutlineSearchCircle size="25px" color="blue" />
          </button>

          <input
            value={state.search}
            name="search"
            className={styles.input}
            type="text"
            autoFocus
            placeholder="Search images and photos"
            onChange={handlChange}
          />
        </form>
      </header>
    </>
  );
};


  export default SearchForm;
  
  SearchForm.PropTopse = {
    onSubmit: PropTypes.func.isRequired,
  };

// class SearchForm extends Component {
//   state = {
//     search: '',
//   };

//   handlChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   handlSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     if (this.state.search.trim() === '') {
//       return alert('Search field is empty');
//     }
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({ search: '' });
//   }

//   render() {
//     const { search } = this.state;
//     const { handlChange, handlSubmit } = this;

//     return (
//       <>
//         <header className={styles.searchBar}>
//           <form onSubmit={handlSubmit} className={styles.form}>
//             <button type="submit" className={styles.button}>
//               <HiOutlineSearchCircle size="25px" color="blue" />
//             </button>

//             <input
//               value={search}
//               name="search"
//               className={styles.input}
//               type="text"
//               autoFocus
//               placeholder="Search images and photos"
//               onChange={handlChange}
//             />
//           </form>
//         </header>
//       </>
//     );
//   }
// }

