import React from 'react';
import { getHomeMovies } from '../apis';
import MovieSlider from '../components/MovieSlider';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BanerSlider from '../components/BanerSlider/Index';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/explore`);
    };

    const {
        data: dataMovie,
        isLoading,
        isError,
        error,
    } = useQuery(['home-movies'], getHomeMovies);

    if (isError) return <p>ERROR: {error.message}</p>;

    return (
        <>
            <div className="mt-16">
                <BanerSlider
                    type="hot"
                    dataMovie={dataMovie?.hot}
                    isLoading={isLoading}
                />

                <div className="mt-7" />

                <MovieSlider
                    title="Movies Top Popular"
                    type="popular"
                    dataMovie={dataMovie?.popular}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />
                <MovieSlider
                    title="Movies Top Rated"
                    type="top_rated"
                    dataMovie={dataMovie?.top_tated}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />
                <MovieSlider
                    title="Movies Trending"
                    type="popular"
                    dataMovie={dataMovie?.trending}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />

                <MovieSlider
                    title="Coming Soon"
                    type="upcoming"
                    dataMovie={dataMovie?.upcoming}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                />

                <div className="flex items-center justify-center my-8">
                    <button
                        className="bg-cyan-600 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-xl "
                        onClick={handleClick}
                    >
                        Load More To Explore...
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
