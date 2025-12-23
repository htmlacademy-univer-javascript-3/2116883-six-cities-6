import { memo, type FC, type MouseEvent } from 'react';

type CityListProps = {
  cities: string[];
  activeCity: string;
  onCitySelect: (city: string) => void;
};

const CityList: FC<CityListProps> = ({
  cities,
  activeCity,
  onCitySelect,
}) => {
  const handleCityClick = (city: string) => (event: MouseEvent) => {
    event.preventDefault();
    onCitySelect(city);
  };

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.map((city) => {
          const linkClassName =
            city === activeCity
              ? 'locations__item-link tabs__item tabs__item--active'
              : 'locations__item-link tabs__item';

          return (
            <li className="locations__item" key={city}>
              <a
                className={linkClassName}
                href="#"
                onClick={handleCityClick(city)}
              >
                <span>{city}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(CityList);
