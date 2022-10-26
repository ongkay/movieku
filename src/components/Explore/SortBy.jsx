import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState } from 'react';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { useCurrentParams } from './useCurrentParams';

const SortBy = () => {
    const [openSort, setOpenSort] = useState(true);
    const [parent] = useAutoAnimate();

    const [searchParams, setSearchParams] = useSearchParams();

    const options = [
        { value: 'popularity.desc', label: 'Most popular' },
        { value: 'vote_average.desc', label: 'Most rating' },
        { value: 'release_date.desc', label: 'Most recent' },
    ];

    const customStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: '#49494b',
            boxShadow: 'none',
            border: 0,
        }),
        option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? '#989898' : '#49494b',
        }),

        singleValue: (provided) => {
            return { ...provided, color: 'white' };
        },

        menu: (styles) => ({
            ...styles,
            backgroundColor: '#49494b',
        }),
    };

    const [currentSearchParams] = useCurrentParams();

    const chooseSort = (option) => {
        const sortValue = option?.value || '';

        setSearchParams({
            ...currentSearchParams,
            sort_by: sortValue,
        });
    };

    const sortType = searchParams.get('sort_by') || 'popularity.desc';
    return (
        <div
            ref={parent}
            className="bg-dark-lighten rounded-md shadow-md px-4 pt-3 mt-10"
        >
            <div className="flex justify-between items-center text-white pb-3">
                <p className="text-lg ">Sort</p>
                <button onClick={() => setOpenSort((prev) => !prev)}>
                    {openSort && <FiChevronDown size={20} />}
                    {!openSort && <FiChevronRight size={20} />}
                </button>
            </div>
            {openSort && (
                <div className="py-3 border-t border-neutral-600 text-white">
                    <p className="text-lg mb-2 text-white/80">Sort results by </p>
                    <Select
                        options={options}
                        styles={customStyles}
                        defaultValue={options[0]}
                        value={options.find((option) => option.value === sortType)}
                        onChange={chooseSort}
                    />
                </div>
            )}
        </div>
    );
};

export default SortBy;
