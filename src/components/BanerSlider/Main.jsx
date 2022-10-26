import React, { useState } from 'react';
import { IoMdPlay } from 'react-icons/io';
import { MovieModalSelector } from '../../store/movie';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const Main = ({ movie, type }) => {
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

    const ReadMore = (text) => {
        const over = JSON.stringify(text);
        const overview = over
            .replace(/[^\w\s]/g, '')
            .replace(/(^\s+|\s+$)/g, '')
            .replace(/\s+/g, ' ')
            .replace('children', '');
        const [isReadMore, setIsReadMore] = useState(true);
        const toggleReadMore = () => {
            setIsReadMore(!isReadMore);
        };

        return (
            <p>
                {isReadMore ? overview.slice(0, 150) : overview}
                {overview.length > 150 && (
                    <span
                        onClick={toggleReadMore}
                        className="text-gray-500 cursor-pointer"
                    >
                        {isReadMore ? '...read more' : ' ...show less'}
                    </span>
                )}
            </p>
        );
    };

    return (
        <div className="w-full h-[50vh] md:h-[400px] text-[#FFFDE3] mt-90">
            <div className="w-full h-full">
                <div className="absolute w-full h-[70vh] md:h-[600px] bg-gradient-to-r from-black">
                    {' '}
                </div>
                <img
                    className="w-full h-[70vh] md:h-full object-cover"
                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                    alt=""
                />
                <div className="absolute w-full top-[20%] p-4 md:p-16 float-left">
                    <h1 className="text-xl md:text-4xl font-bold">{movie?.title} </h1>
                    <div className="my-4">
                        <button
                            onClick={handleClick}
                            className="border text-[#0a0a0a] text-base border-gray-300 py-2 px-5  flex flex-row items-center bg-white hover:bg-cyan-300 hover:border-cyan-300 mb-8 md:mb-0 rounded-full"
                        >
                            <IoMdPlay className="mr-3" />
                            Play Now
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Released: {movie?.release_date}{' '}
                    </p>

                    <p className="w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] text-gray-200 text-sm md:text-base mt-2">
                        <ReadMore>{movie?.overview}</ReadMore>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
