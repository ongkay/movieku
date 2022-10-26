import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { MovieModalSelector, MovieSearchSelector } from '../../store/movie';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w300';

const SearchMovieTile = ({ movie }) => {
    const { setShowSearch } = MovieSearchSelector();
    const { setShowMovie } = MovieModalSelector();
    const { id, title, release_date, poster_path, vote_average, overview, vote_count } =
        movie;

    const imageSource = `${BASE_IMAGE_URL}${poster_path}`;

    const handleClick = () => {
        setShowSearch(false);
        setShowMovie({
            id,
            title,
            release_date,
            poster_path,
            vote_average,
            overview,
            imageSource,
            vote_count,
            type: 'search',
        });
    };

    const year = release_date.split('-');
    // const dispatch = useDispatch();

    const overviews = overview.slice(0, 200);
    const overviewsLength = overview.length > 200;

    return (
        <motion.div
            className="p-1.5 text-neutral-100 hover:bg-neutral-900 cursor-pointer"
            onClick={handleClick}
        >
            <div className="flex h-16">
                <img
                    className="rounded aspect-[2/3]"
                    src={`https://image.tmdb.org/t/p/w400${poster_path}`}
                    alt=""
                />
                <div className="flex-col ml-3">
                    <p>{title}</p>
                    <div className="flex items-center text-yellow-500">
                        <AiFillStar size={12} />
                        <p className="text-xs text-neutral-400 ml-1">{`${vote_average} • ${vote_count.toLocaleString()} votes • ${
                            year[0] || 'N/A'
                        }`}</p>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">
                        {overviews}
                        {overviewsLength ? <>....</> : <></>}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default SearchMovieTile;
