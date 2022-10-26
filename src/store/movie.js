import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

import tmdb from '../apis/tmdb';

const urlnya = {
    moviesUpcoming: 'movie/upcoming',
    moviesPopular: 'movie/popular',
    moviesTopRated: 'movie/top_rated',
    moviesTrending: 'trending/movie/day',
};

const useMovieStore = create(
    persist(
        (set) => ({
            moviesUpcoming: [],
            moviesPopular: [],
            moviesTopRated: [],
            moviesTrending: [],

            getMoviesUpcoming: async () => {
                try {
                    const { data } = await tmdb.get(urlnya.moviesUpcoming);

                    set(
                        produce((state) => {
                            state.moviesUpcoming = data.results;
                        }),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            getMoviesPopular: async () => {
                try {
                    const { data } = await tmdb.get(urlnya.moviesPopular);

                    set(
                        produce((state) => {
                            state.moviesPopular = data.results;
                        }),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            getMoviesTopRated: async () => {
                try {
                    const { data } = await tmdb.get(urlnya.moviesTopRated);

                    set(
                        produce((state) => {
                            state.moviesTopRated = data.results;
                        }),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
            getMoviesTranding: async () => {
                try {
                    const { data } = await tmdb.get(urlnya.moviesTrending);

                    set(
                        produce((state) => {
                            state.moviesTrending = data.results;
                        }),
                    );
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        {
            name: 'movie-storage', // nama untuk menyimpan di storage
            getStorage: () => localStorage, // (optional) by default akan 'localStorage', bisa pakai sessionStorage, dll
        },
    ),
);

const useMovieModal = create(
    persist(
        (set) => ({
            showModal: false,
            dataMovie: {},

            hideModal: () => {
                set(
                    produce((state) => {
                        state.showModal = false;
                    }),
                );
            },

            setShowMovie: (payload) => {
                set(
                    produce((state) => {
                        state.showModal = true;
                        state.dataMovie = payload;
                    }),
                );
            },
        }),
        {
            name: 'movie-detail',
            getStorage: () => localStorage,
        },
    ),
);

const useSearchMovie = create((set) => ({
    showSearch: false,
    searching: '',

    setSearching: (payload) => {
        set(
            produce((state) => {
                state.search = payload;
            }),
        );
    },

    setShowSearch: (payload) => {
        set(
            produce((state) => {
                state.showSearch = payload;
            }),
        );
    },
}));

// create selector
export const moviesSelector = createTrackedSelector(useMovieStore);
export const MovieModalSelector = createTrackedSelector(useMovieModal);
export const MovieSearchSelector = createTrackedSelector(useSearchMovie);

export default useMovieStore;
