import { useParams } from 'react-router-dom';

import { MovieGenre } from '../components/GenresComponent/GenresComponent';
import { appMessages } from '../constants/appConstants';

const MoviesListGenrePage: React.FC = () => {
  const { genreId } = useParams<{ genreId?: string }>();

  if (!genreId) {
    return <div className="page-message">{appMessages.genreIdMissing}</div>;
  }

  const genreIdNumber = Number(genreId);

  if (!Number.isInteger(genreIdNumber) || genreIdNumber <= 0) {
    return <div className="page-message">{appMessages.genreIdInvalid}</div>;
  }

  return (
    <main className="page-shell">
      <MovieGenre genreId={genreIdNumber} />
    </main>
  );
};

export default MoviesListGenrePage;