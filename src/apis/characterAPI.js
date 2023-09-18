import axios from 'axios';

const mockCharacter = [
  {
    char_id: 1,
    story_id: 1,
    user_id: 1,
    image_id: '/avatars/001.png',
    name: 'Hero',
    strength: 'Bravery',
    weakness: 'Impulsiveness',
    backstory: 'A brave hero on a quest.',
  },
  {
    char_id: 2,
    story_id: 2,
    user_id: 1,
    image_id: '/avatars/012.png',
    name: 'Adventurer',
    strength: 'Resourcefulness',
    weakness: 'Stubbornness',
    backstory: 'An adventurous soul seeking treasures.',
  },
  {
    char_id: 3,
    story_id: 3,
    user_id: 1,
    image_id: '/avatars/033.png',
    name: 'Space Explorer',
    strength: 'Curiosity',
    weakness: 'Fear of the unknown',
    backstory: 'An astronaut exploring new frontiers.',
  },
];

// respond mock data by default, will change back to respond real data when database is ready
export const fetchCharactersByUserId = (userId) => axios.get(`/api/characters/user/${userId}`)
  .then((response) => mockCharacter)// response.data)
  .catch((error) => mockCharacter);

export const addCharacterByUserId = () => {

};
