import { useParams } from 'react-router-dom';

import { MovieDetails } from '../components/MovieDetailsComponent/MovieDetailsComponent';
import { appMessages } from '../constants/appConstants';

export const MovieDetailsPage: React.FC = () => {
  const { movieId } = useParams<{ movieId?: string }>();

  if (!movieId) {
    return <div className="page-message">{appMessages.movieIdMissing}</div>;
  }

  const movieIdNumber = Number(movieId);

  if (!Number.isInteger(movieIdNumber) || movieIdNumber <= 0) {
    return <div className="page-message">{appMessages.movieIdInvalid}</div>;
  }

  return (
    <main className="page-shell">
      <MovieDetails movieId={String(movieIdNumber)} genreDictionary={{}} />
    </main>
  );
};