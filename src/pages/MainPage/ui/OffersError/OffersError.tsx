import { memo, type FC } from 'react';

type OffersErrorProps = {
  message: string;
};

const OffersError: FC<OffersErrorProps> = ({ message }) => (
  <div className="cities">
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">Unable to load offers</b>
          <p className="cities__status-description">{message}</p>
        </div>
      </section>
      <div className="cities__right-section" />
    </div>
  </div>
);

export default memo(OffersError);
