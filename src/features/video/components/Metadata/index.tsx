import Grid from '@components/ui/Grid';
import { isEmpty } from '@lib/object';
import { Movie, TvSeries } from '@services/tmdb/model/Videos';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { DiscoverType } from 'types/tmdb/api';
import styles from './Metadata.module.scss';

const cx = classNames.bind(styles);

type Props = {
  type: DiscoverType;
  data: Movie | TvSeries;
};

export default function Metadata({ type, data }: Props) {
  return (
    <Grid template='cols' className={cx('root')} defaultClass='grid-cols-2'>
      {type === 'movie' ? (
        <MovieMetadata {...(data as Movie)} />
      ) : (
        <TvSeriesMetadata {...(data as TvSeries)} />
      )}
    </Grid>
  );
}

const LanguageMetadata = (details: Movie | TvSeries) => {
  if (isEmpty(details.spoken_languages)) {
    return 'N/A';
  }
  return details.spoken_languages.map((lang, idx) => {
    return (
      <span key={lang.iso_639_1}>
        {lang.name}
        {idx < details.spoken_languages.length - 1 && idx % 2 === 0 && '/'}
        {idx % 2 !== 0 && <br />}
      </span>
    );
  });
};

const MovieMetadata = (details: Movie) => {
  const translate = useTranslations('videos.metadata');

  return (
    <>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('length')}</span>
        <span className={cx('content')}>{details.runtime} min</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('language')}</span>
        <span className={cx('content')}>
          <LanguageMetadata {...details} />
        </span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('release_date')}</span>
        <span className={cx('content')}>{details.release_date as string}</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('status')}</span>
        <span className={cx('content')}>{details.status || 'N/A'}</span>
      </div>
    </>
  );
};

const TvSeriesMetadata = (details: TvSeries) => {
  const translate = useTranslations('videos.metadata');

  return (
    <>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('language')}</span>
        <span className={cx('content')}>
          <LanguageMetadata {...details} />
        </span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('first_air')}</span>
        <span className={cx('content')}>{details.first_air_date as string} min</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('last_air')}</span>
        <span className={cx('content')}>{details.last_air_date as string}</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>{translate('status')}</span>
        <span className={cx('content')}>{details.status || 'N/A'}</span>
      </div>
    </>
  );
};
