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

export type TCreateTournamentResponse = {
  id: string;
  tournamentHostPlayerId: string;
  tournamentName: string;
  tournamentDescription: Array<RichTextContentJSON>;
  currentTournamentBracket: number;
  createdAt: string;
  updatedAt: string;
};
