import { MovieFilter } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserLog from './UserLog';

import { useDetectClickOutside } from 'react-detect-click-outside';
import { MovieSearchSelector } from '../store/movie';
import SearchResults from './SearchMovie/SearchResults';

const navItems = [
    { text: 'Explore', link: '/explore' },
    { text: 'Pricing', link: '/pricing' },
    { text: 'About', link: '/about' },
];

const Navbar = () => {
    const { showSearch, setShowSearch } = MovieSearchSelector();
    const [search, setSearch] = useState('');
    const ref = useDetectClickOutside({ onTriggered: toggleSearchOff });

    function handleSetSearch({ target }) {
        setSearch(() => target.value);
    }

    function toggleSearchOn() {
        setShowSearch(true);
    }

    function toggleSearchOff() {
        setShowSearch(false);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar>
                <Toolbar>
                    <MovieFilter sx={{ display: 'flex', mr: 1 }} />
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            display: 'block',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                        }}
                    >
                        <Link
                            style={{ color: 'inherit', textDecoration: 'inherit' }}
                            to="/"
                        >
                            NONTON
                        </Link>
                    </Typography>
                    <form className="relative flex w-1/2  ml-5" ref={ref}>
                        <div class="hidden relative md:block">
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg
                                    class="w-5 h-5 text-gray-500"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span class="sr-only">Search icon</span>
                            </div>
                            <input
                                type="text"
                                id="search-navbar"
                                class="block p-2 pl-10 w-full text-neutral-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-neutral-600 bg-transparent"
                                placeholder="Search..."
                                value={search}
                                onChange={handleSetSearch}
                                onMouseDown={toggleSearchOn}
                            />
                        </div>

                        {showSearch && <SearchResults search={search} />}
                    </form>

                    <Box sx={{ display: 'block' }}>
                        {navItems.map((item) => (
                            <NavLink
                                to={item.link}
                                key={item.text}
                                className={({ isActive }) =>
                                    isActive ? 'nav-active' : 'nav-inactive'
                                }
                            >
                                {item.text}
                            </NavLink>
                        ))}
                        <UserLog />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
