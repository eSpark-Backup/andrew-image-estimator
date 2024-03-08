import React from 'react'
import { searchbarIcon } from '../../assets'

const SearchBar = ({ search, setSearch }) => {
    return (
        <div className='search-bar-box'>
            <div>
                <img className='rounded' width={50} src={searchbarIcon} alt='search' />
            </div>

            <div className='search-bar-input-box' >
                <input onChange={(e) => setSearch(e.target.value)} value={search} type='search' placeholder='Search by name' className='search-bar-input' />
            </div>
        </div>
    )
}

export default SearchBar
