/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { IoMdClose, IoMdPlay } from 'react-icons/io';
import { FiBookmark } from 'react-icons/fi';
import { GiShare } from 'react-icons/gi';
import { motion } from 'framer-motion';
import Youtube from 'react-youtube';
import { MovieModalSelector } from '../store/movie';
import { useNavigate } from 'react-router-dom';
import tmdb from '../apis/tmdb';

const MovieModal = () => {
    const navigate = useNavigate();
    const { hideModal, dataMovie, setShowMovie } = MovieModalSelector();
    const [ytplay, setYtplay] = useState(false);

    useEffect(() => {
        const getMoviesDetail = async () => {
            const response = await Promise.all([
                tmdb.get(`/movie/${dataMovie.id}`),
                tmdb.get(`/movie/${dataMovie.id}/videos`),
            ]);

            const trailerKey = response[1].data.results[0].key;

            const { backdrop_path, original_title, genres, runtime } = response[0].data;

            setShowMovie({
                ...dataMovie,
                backdrop_path,
                original_title,
                genres,
                runtime,
                trailerKey,
            });
            console.log('dataMovie');
            console.log(genres);
        };
        getMoviesDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = () => {
        hideModal();
        navigate(`/${dataMovie.type}/${dataMovie.id}/${dataMovie.trailerKey}`);
    };

    return (
        <>
            <motion.div
                className="absolute bg-neutral-800 rounded-xl text-neutral-100 w-[700px] flex drop-shadow-2xl"
                transition={{ duration: 0.2 }}
                initial={{ scale: 0.95, opacity: 40 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <IoMdClose
                    className="absolute top-3 right-3 cursor-pointer"
                    size={25}
                    onClick={() => hideModal()}
                />
                <img className=" w-64 rounded-l-xl" src={dataMovie.imageSource} />
                <div className="p-5">
                    <p className="text-xl md:text-2xl mb-3 mt-2 md:mt-0">
                        {dataMovie.title}
                    </p>

                    <div className="flex flex-row items-center ">
                        <div className="flex flex-row justify-center items-center mr-5 pb-2">
                            <AiFillStar className="text-3xl mr-2" color="#EAB308" />
                            <p className="text-3xl ">
                                {dataMovie.vote_average?.toFixed(1)}{' '}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className="grid grid-flow-col auto-cols-max gap-4 ">
                                <p className="text-cyan-600 text-sm md:text-base">
                                    Released: {dataMovie.release_date}{' '}
                                </p>
                                <p className="text-cyan-600 text-sm md:text-base">
                                    {dataMovie.runtime} min
                                </p>
                            </div>

                            <div className="grid grid-flow-col auto-cols-max gap-4 mb-3">
                                {dataMovie.genres &&
                                    dataMovie.genres.slice(0, 5).map((genre, i) => (
                                        <span key={i} className="text-sm">
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 mb-4">
                        <h4 className="text-sm text-neutral-300 line-clamp-6 ">
                            <strong>Overview: </strong>
                            {dataMovie.overview}
                        </h4>
                    </div>
                    <div className="flex flex-row items-center">
                        <button
                            // onClick={() => setYtplay(true)}
                            onClick={handleClick}
                            className="border text-[#0a0a0a] text-base border-gray-300 py-2 px-5  flex flex-row items-center bg-white hover:bg-cyan-300 hover:border-cyan-300 mb-8 md:mb-0"
                        >
                            <IoMdPlay className="mr-3" />
                            Play Now
                        </button>

                        {dataMovie.trailerKey ? (
                            <button
                                onClick={() => setYtplay(true)}
                                className="border text-[#FFFDE3] border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-cyan-600 hover:border-cyan-600 mb-8 md:mb-0 ml-4"
                            >
                                <IoMdPlay className="mr-3" />
                                Watch Trailer
                            </button>
                        ) : (
                            <></>
                        )}

                        <p>
                            <GiShare className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
                        </p>
                        <p>
                            <FiBookmark className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
                        </p>
                    </div>
                </div>
            </motion.div>

            {ytplay ? (
                <motion.div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50"
                    transition={{ duration: 0.2 }}
                    initial={{ scale: 0.95, opacity: 40 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="relative ">
                        <div className="flex items-start justify-between border-b p-2 ">
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-white opacity-100 float-right"
                                onClick={() => setYtplay(false)}
                            >
                                <div className="">
                                    <IoMdClose size={25} />
                                </div>
                            </button>
                        </div>

                        <Youtube
                            videoId={dataMovie.trailerKey}
                            className="w-[70vh] h-[70vh] md:w-[100vh] md:h-[60vh]"
                            opts={{
                                width: '100%',
                                height: '100%',
                                playerVars: {
                                    autoplay: 1,
                                },
                            }}
                        />
                    </div>
                </motion.div>
            ) : (
                ''
            )}
        </>
    );
};

export default MovieModal;
