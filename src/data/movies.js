import schindlersListPoster from '../assets/posters/schindlerslist.jpg';
import fightClubPoster from '../assets/posters/fightclub.jpg';
import tedkPoster from '../assets/posters/tedk.jpg';

const movies = [
  {
    id: 1,
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    genre: "Historical Drama",
    sessionDateTime: "2025-04-30 17:00",
    poster: schindlersListPoster,
  },
  {
    id: 2,
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    genre: "Drama",
    sessionDateTime: "2025-04-30 19:00",
    poster: fightClubPoster,
  },
  {
    id: 3,
    title: "Ted K",
    description: "A biographical drama about Ted Kaczynski, the Unabomber, exploring his life, ideology, and the crimes that made him infamous.",
    genre: "Biographical Drama",
    sessionDateTime: "2025-04-30 21:00",
    poster: tedkPoster,
  },
];

export default movies;