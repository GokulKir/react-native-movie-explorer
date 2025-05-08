
const morePopularMovies = [
    {
      id: '4',
      title: 'The Dark Knight',
      image: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg',
      category: 'Movies',
    },
    {
      id: '5',
      title: 'Pulp Fiction',
      image: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
      category: 'Movies',
    },
  ];
  
  const moreTrendingMovies = [
    {
      id: '4',
      title: 'Fight Club',
      image: 'https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg',
      category: 'Movies',
    },
    {
      id: '5',
      title: 'The Shawshank Redemption',
      image: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
      category: 'Movies',
    },
  ];
  
  export const filterMovies = (movies, searchQuery, selectedCategory) => {
    let filtered = movies;
    if (searchQuery) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (movie.subtitle && movie.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter((movie) => movie.category === selectedCategory);
    }
    return filtered;
  };
  
  export const sortMovies = (movies, sortOrder) => {
    if (sortOrder === 'alphabetical') {
      return [...movies].sort((a, b) => a.title.localeCompare(b.title));
    }
    return movies;
  };
  
  export const loadMorePopularMovies = (popularPage, setPopularMovies, setPopularPage) => {
    if (popularPage < 2) {
      setPopularMovies((prev) => [...prev, ...morePopularMovies]);
      setPopularPage((prev) => prev + 1);
    }
  };
  
  export const loadMoreTrendingMovies = (trendingPage, setTrendingMovies, setTrendingPage) => {
    if (trendingPage < 2) {
      setTrendingMovies((prev) => [...prev, ...moreTrendingMovies]);
      setTrendingPage((prev) => prev + 1);
    }
  };