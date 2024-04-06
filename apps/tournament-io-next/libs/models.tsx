export type RichTextContentJSON = {
  [key: string]: any;
  type: string;
  content: Array<{
    [key: string]: any;
    type: string;
    content: Array<{ type: string; text: string }>;
  }>;
};

export type TCreateRoomRequest = {
  name: string;
  description: RichTextContentJSON;
  gameType: string;
};

export enum EGameType {
  LOL = 'League of Legends',
  VALORANT = 'Valorant',
  CSGO = 'Counter Strike: Global Offensive',
}

export type ResponseGraphQL<T> = {
  data: T;
  errors: any;
};

export type TCreateTournamentResponse = {
  id: string;
  tournamentHostPlayer: {
    id: string;
    username: string;
    avatarUrl: string;
  };
  tournamentName: string;
  tournamentDescription: Array<RichTextContentJSON>;
  currentTournamentBracket: number;
  createdAt: string;
  updatedAt: string;
  brackets: {
    id: string;
    title: string;
    roundIsFinished: boolean;
    winnerPlayer: {
      id: string;
      username: string;
      avatarUrl: string;
    };
    tournament: {
      id: string;
      tournamentName: string;
    };
  }[];
  tournamentParticipants: {
    id: string;
    username: string;
    avatarUrl: string;
  }[];
};

export type GetTournamentById = {
  tournament: TCreateTournamentResponse;
};

export type AddParticipantToTournamentResponse = {
  addParticipantToTournament: {
    id: string;
  };
};

export type RemoveParticipantToTournamentResponse = {
  removeParticipantToTournament: {
    id: string;
  };
};
