import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ExploreFilter from '../components/Explore/ExploreFilter';
import ExploreResult from '../components/Explore/ExploreResult';

const Explore = () => {
    const [searchParams] = useSearchParams();

    const [config, setConfig] = useState({});

    useEffect(() => {
        const changeConfig = (key, value) => {
            setConfig((prevConfig) => ({
                ...prevConfig,
                [key]: value,
            }));
        };

        const sortType = searchParams.get('sort_by') || 'popularity.desc';
        changeConfig('sort_by', sortType);

        const genreType = searchParams.getAll('genre') || [];
        changeConfig('with_genres', genreType.toString());

        const releaseFrom = searchParams.get('from') || '2002-11-04';
        const releaseTo = searchParams.get('to') || '2022-07-28';
        changeConfig('primary_release_date.gte', releaseFrom);
        changeConfig('primary_release_date.lte', releaseTo);
        changeConfig('air_date.gte', releaseFrom);
        changeConfig('air_date.lte', releaseTo);

        // eslint-disable-next-line
        console.log(genreType);
    }, [searchParams]);

    return (
        <>
            <div className="flex flex-col-reverse md:flex-row">
                <div className="shrink-0 md:max-w-[310px] w-full md:py-12 pt-4 px-3 ">
                    <ExploreFilter />
                </div>
                <div className="flex-grow px-[2vw] pt-6">
                    <ExploreResult config={config} />
                </div>
            </div>
        </>
    );
};

export default Explore;
