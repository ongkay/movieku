/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { motion } from 'framer-motion';
import { AiFillStar } from 'react-icons/ai';
import { MovieModalSelector } from '../store/movie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w342';

const MovieCard = ({ movie, type }) => {
    const { setShowMovie } = MovieModalSelector();
    const { id, title, release_date, poster_path, vote_average, overview } = movie;

    const imageSource = `${BASE_IMAGE_URL}${poster_path}`;

    const handleClick = () => {
        setShowMovie({
            id,
            title,
            release_date,
            poster_path,
            vote_average,
            overview,
            imageSource,
            type,
        });
    };

    return (
        <motion.div
            className="rounded-lg overflow-hidden cursor-pointer relative bg-dark-lighten"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <>
                <LazyLoadImage
                    alt="Poster film"
                    src={imageSource}
                    effect="blur"
                    className="object-cover rounded-lg"
                />

                {/* <img
                    alt="Poster film"
                    src={imageSource}
                    effect="blur"
                    className="object-cover rounded-lg"
                /> */}

                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/40 opacity-0 hover:opacity-100 hover:rounded-lg">
                    <div className="flex flex-row justify-center items-center absolute top-4 right-6 text-gray-300">
                        <AiFillStar />
                        <p className="text-xs md:text-base font-bold">
                            {vote_average.toFixed(1)}{' '}
                        </p>
                    </div>

                    <div className="absolute bottom-4 px-4">
                        <p className="text-neutral-100 text-sm line-clamp-1">
                            {`${title}`}
                        </p>
                        <p className=" text-gray-300 text-xs">
                            {`${movie.vote_count.toLocaleString()} votes  •  ${release_date}`}
                        </p>
                    </div>
                </div>
            </>
        </motion.div>
    );
};

export default MovieCard;
