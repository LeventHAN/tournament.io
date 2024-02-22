export type TCreateRoomRequest = {
  name: string;
  description: string;
  gameType: string;
};

export enum EGameType {
  LOL = 'League of Legends',
  VALORANT = 'Valorant',
  CSGO = 'Counter Strike: Global Offensive',
}
