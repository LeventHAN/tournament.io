import { gql, request } from 'graphql-request';
import axios from './axios';
import {
  AddParticipantToTournamentResponse,
  GetTournamentById,
  RemoveParticipantToTournamentResponse,
  ResponseGraphQL,
  TCreateRoomRequest,
  TCreateTournamentResponse,
} from './models';

export const graphqlFetcher = (query: TODO) =>
  request(`http://localhost:3000/graphql`, query);

export const createTournament = async (
  tournamentDetails: TCreateRoomRequest
) => {
  return await axios.post<TCreateTournamentResponse>(
    'http://localhost:3000/api/tournament/createTournament',
    tournamentDetails
  );
};

export const getTournament = async (tournamentId: string) => {
  return await axios.post<ResponseGraphQL<GetTournamentById>>(
    'http://localhost:3000/graphql',
    {
      query: gql`
        query {
          tournament(id: "${tournamentId}") {
            id
            createdAt
            updatedAt
            tournamentDescription
            tournamentName
            currentTournamentBracket
            brackets { id, title, roundIsFinished, winnerPlayer { id, username, avatarUrl }, tournament {id, tournamentName} }
            tournamentParticipants { id, username, avatarUrl }
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

export const addParticipant = async (participantToAdd: {
  tournamentId: string;
}) => {
  return await axios.post<ResponseGraphQL<AddParticipantToTournamentResponse>>(
    'http://localhost:3000/graphql',
    {
      query: gql`
        mutation {
          addParticipantToTournament(
            addParticipantToTournamentInput: {
              tournamentId: "${participantToAdd.tournamentId}",
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

export const removeParticipant = async (participantToAdd: {
  tournamentId: string;
}) => {
  return await axios.post<
    ResponseGraphQL<RemoveParticipantToTournamentResponse>
  >(
    'http://localhost:3000/graphql',
    {
      query: gql`
        mutation {
          removeParticipantFromTournament(
            removeParticipantFromTournamentInput: {
              tournamentId: "${participantToAdd.tournamentId}",
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
