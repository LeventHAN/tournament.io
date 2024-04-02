export type TCreateRoomRequest = {
  name: string;
  description: {
    type: string;
    content: Array<{
      type: string;
      content: Array<{ type: string; text: string }>;
    }>;
  };
  gameType: string;
};

export enum EGameType {
  LOL = 'League of Legends',
  VALORANT = 'Valorant',
  CSGO = 'Counter Strike: Global Offensive',
}

export type Response<T> = {
  data: T;
  errors: any;
};

export type TCreateTournamentResponse = {
  createTournament: {
    id: string;
    tournamentName: string;
  };
};
