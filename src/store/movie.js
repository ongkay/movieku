import produce from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { createTrackedSelector } from 'react-tracked';

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
export const MovieModalSelector = createTrackedSelector(useMovieModal);
export const MovieSearchSelector = createTrackedSelector(useSearchMovie);
