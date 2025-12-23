import { useState, type FC, type MouseEvent } from 'react';

export type SortType =
  | 'Popular'
  | 'Price: low to high'
  | 'Price: high to low'
  | 'Top rated first';

const sortOptions: SortType[] = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first',
];

type SortingOptionsProps = {
  activeSort: SortType;
  onSortChange: (sortType: SortType) => void;
};

const SortingOptions: FC<SortingOptionsProps> = ({
  activeSort,
  onSortChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionClick =
    (option: SortType) => (event: MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      onSortChange(option);
      setIsOpen(false);
    };

  const optionsClassName = isOpen
    ? 'places__options places__options--custom places__options--opened'
    : 'places__options places__options--custom';

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggle}>
        {activeSort}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={optionsClassName}>
        {sortOptions.map((option) => (
          <li
            key={option}
            className={
              option === activeSort
                ? 'places__option places__option--active'
                : 'places__option'
            }
            tabIndex={0}
            onClick={handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortingOptions;
