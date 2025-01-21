/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const getMovieHeadline = (selectedGenreIdOrCategory, searchQuery, genres, categories) => {
    if (searchQuery) return null;
    if (selectedGenreIdOrCategory) {
        if (typeof selectedGenreIdOrCategory === "number") {
            const genreId = selectedGenreIdOrCategory;
            const genreObj = genres.find(genre => genre.id === genreId);
            return `All  ${genreObj.name}`.toUpperCase();
        }
        if (typeof selectedGenreIdOrCategory === "string") {
            const value = selectedGenreIdOrCategory;
            const category = categories.find(category => category.value === value);
            return `${category.label === "Top rated" ? "Top-rated" : category.label} movies`.toUpperCase();
        }
    }
    if (!selectedGenreIdOrCategory) return "Popular movies".toUpperCase();
};

export default getMovieHeadline;
