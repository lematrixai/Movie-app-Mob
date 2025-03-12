export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    Headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}

export const fetchMovies = async ( {query}: {query: string} ) => {
    const endpoint = query ?
        `${TMDB_CONFIG.BASE_URL}/search/movies?query=${encodeURIComponent(query)}` :
        `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: TMDB_CONFIG.Headers,

        });

    if (!response.ok) {
        throw new Error(`Failure fetching movies: ${response.statusText}`)
    }

    const data = await response.json();

    return data.results;
}





// const url = 'https://api.themoviedb.org/3/authentication';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmZmZmU0YWM0NjlmNGE1ZjJmMmRhODlkOGY0ZjQ2MSIsIm5iZiI6MTcwMzI1NzYyMC4yNDUsInN1YiI6IjY1ODVhNjE0ZDY0YWMyNTE3NjE0MzJlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hIjYMWuvBbjY1B2LLhiSXTEAOuoSWX-Fr0As8cRRTQo'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));