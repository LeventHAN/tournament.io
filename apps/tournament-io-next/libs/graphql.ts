import { gql, request } from 'graphql-request';
import axios from './axios';
import {
  AddParticipantToTournamentResponse,
  GetTournamentById,
  GetTournamentByIdWithBracketsSeed,
  RemoveParticipantToTournamentResponse,
  ResponseGraphQL,
  StartTournamentResponse,
  TCreateRoomRequest,
  TCreateTournamentResponse,
  UpdateTournamentSeedWinner,
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
            brackets { id, title, roundIsFinished, winnerPlayer { id, username, avatarUrl } }
            tournamentParticipants { id, username, avatarUrl }
            tournamentHostPlayer { id, username, avatarUrl }
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
export const getTournamentWithBracketsWithSeeds = async (
  tournamentId: string
) => {
  return await axios.post<ResponseGraphQL<GetTournamentByIdWithBracketsSeed>>(
    'http://localhost:3000/graphql',
    {
      query: gql`
        query {
          tournamentWithBracketsSeedTeams(id: "${tournamentId}") {
            id
            createdAt
            updatedAt
            tournamentDescription
            tournamentName
            currentTournamentBracket
            brackets { id, title, roundIsFinished, winnerPlayer { id, username, avatarUrl }, seeds { id, date, teams { id, score, players { id, username, avatarUrl } } } }
            tournamentHostPlayer { id, username, avatarUrl }
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

export const startTournament = async (tournamentId: string) => {
  return await axios.post<ResponseGraphQL<StartTournamentResponse>>(
    'http://localhost:3000/graphql',
    {
      query: gql`
        mutation {
          startTournament(startTournamentInput: { id: "${tournamentId}" }) { id }
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

export const updateTournamentSeedWinner = async (data: {
  tournamentId: string;
  bracketId: string;
  seedId: string;
  winnerPlayerId: string;
}) => {
  return await axios.post<ResponseGraphQL<UpdateTournamentSeedWinner>>(
    'http://localhost:3000/graphql',
    {
      query: gql`
        mutation {
          updateTournamentSeedWinner(updateTournamentSeedWinnerInput: { id: "${tournamentId}", bracketId: "${data.bracketId}", seedId: "${data.seedId}",  winnerPlayerId: "${data.winnerPlayerId}" }) { id }
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
