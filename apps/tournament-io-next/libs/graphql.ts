import { gql, request } from 'graphql-request';
import axios from './axios';
import { TCreateRoomRequest } from './models';

export const graphqlFetcher = (query: TODO) =>
  request(`http://localhost:3000/graphql`, query);

export const createTournament = async (
  tournamentDetails: TCreateRoomRequest
) => {
  return await axios.post(
    'http://localhost:3000/graphql',
    {
      query: gql`
      mutation {
        createTournament(createTournamentInput: {
          name: "${tournamentDetails.name}",
          description: "${tournamentDetails.description}",
          gameType: "${tournamentDetails.gameType}"
          tournamentHostPlayerId: "flagged_id"
        }) {
          id,
          tournamentName
        }
      }
      `,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const getTournament = async (tournamentId: string) => {
  return await axios.post(
    'http://localhost:3000/graphql',
    {
      query: gql`
        query {
          tournament(id: "${tournamentId}") {
            id
            createdAt
            updatedAt
            tournamentName
            currentTournamentBracket
          }
        }
      `,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const createPlayer = async () => {
  return await axios.post(
    'http://localhost:3000/graphql',
    {
      query: gql`
        mutation {
          createPlayer(
            createPlayerInput: {
              id: "unique_id_here"
              username: "desired_username"
              email: "user@example.com"
              avatarUrl: "https://example.com/avatar.jpg"
            }
          ) {
            id
          }
        }
      `,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
