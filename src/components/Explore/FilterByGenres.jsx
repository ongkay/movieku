import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useCurrentParams } from './useCurrentParams';
import { getRecommendGenres } from '../../apis';

const FilterByGenres = () => {
    const [genres] = useAutoAnimate();
    const { isLoading, data, isError, error } = useQuery(['genres'], getRecommendGenres);

    const [searchParam, setSearchParam] = useSearchParams();

    const [currentSearchParams] = useCurrentParams();
    console.log('currentSearchParams Filter by genres');
    console.log(currentSearchParams);

    if (isError) return <div>ERROR: {error.message}</div>;

    if (isLoading)
        return (
            <div className="mt-20 mb-20 mx-auto h-10 w-10 rounded-full border-[5px] border-dark-darken border-t-transparent animate-spin"></div>
        );

    const chooseGenre = (genreId) => {
        const existingGenres = searchParam.getAll('genre');

        if (existingGenres.includes(genreId)) {
            const newGenres = existingGenres.filter((genre) => genre !== genreId);
            setSearchParam({
                ...currentSearchParams,
                genre: newGenres,
            });
        } else {
            setSearchParam({
                ...currentSearchParams,
                genre: [...existingGenres, genreId],
            });
        }
    };

    return (
        <ul
            ref={genres}
            className="flex gap-3 flex-wrap max-h-[250px] overflow-y-auto text-neutral-400 text-md"
        >
            {data.movieGenres.map((genre) => (
                <li key={genre.id}>
                    <button
                        onClick={() => chooseGenre(String(genre.id))}
                        className={`bg-neutral-600 px-4 py-1 border border-neutral-400 rounded-full hover:brightness-75 transition duration-300 inline-block ${
                            searchParam.getAll('genre').includes(String(genre.id)) &&
                            'bg-sky-600 text-white border-neutral-100'
                        }`}
                    >
                        {genre.name}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default FilterByGenres;
