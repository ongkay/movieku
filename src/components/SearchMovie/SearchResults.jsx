import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import tmdb from '../../apis/tmdb';
import SearchMovieTile from './SearchMovieTile';

const SearchResults = ({ search }) => {
    const [movies, setMovies] = useState([]);
    const [results, setResults] = useState(false);

    useEffect(() => {
        if (search.length === 0) return;
        tmdb.get(`/search/movie?language=en-US&include_adult=false&query=${search}`).then(
            (response) => {
                const res = response.data.results.slice(0, 7);
                setMovies(() => {
                    return res.map((movie) => {
                        if (movie.release_date === undefined) return null;
                        return <SearchMovieTile movie={movie} key={movie.id} />;
                    });
                });
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        if (search.length === 0) {
            setResults(false);
        } else if (!search.isEmpty && movies.length === 0) {
            setResults(false);
        } else {
            setResults(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movies]);

    return (
        <motion.div
            className="absolute top-12 w-3/4"
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
        >
            {results ? (
                <div className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px]">
                    {movies}
                </div>
            ) : (
                <p className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px] text-neutral-100 p-2">
                    Nothing found
                </p>
            )}
        </motion.div>
    );
};

export default SearchResults;
