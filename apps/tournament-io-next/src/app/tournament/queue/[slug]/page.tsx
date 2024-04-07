import {
  addParticipant,
  getTournament,
  removeParticipant,
} from '@/libs/graphql';
import ParticipantsContainer from '@/components/Containers/ParticipantsContainer';
import { TCreateTournamentResponse } from '@/libs/models';

export interface Participant {
  avatarUrl: string;
  createdAt: string;
  email: string;
  globalName: string;
  updatedAt: string;
  userId: string;
  username: string;
}

export interface Team {
  id: string;
  date: string; // Assuming date will be in string format
  teams: Participant[];
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: Participant;
  room: TournamentRoom;
}

export interface TournamentRoom {
  roomId: string;
  name: string;
  description: string;
  roomPassword: string;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  messages: any[];
  rounds: any[];
}

const handleJoinTournament = async (tournamentId: string) => {
  'use server';

  const { data } = await addParticipant({
    tournamentId: tournamentId,
  });

  const succeed = data?.data?.addParticipantToTournament?.id;

  return !!succeed;
};

const handleLeaveTournament = async (tournamentId: string) => {
  'use server';

  const { data } = await removeParticipant({
    tournamentId: tournamentId,
  });

  const succeed = data?.data?.removeParticipantToTournament?.id;

  if (succeed) {
    // refresh component
    console.log('Participant left the tournament');

    // messaging ?  or  websocket ?
  }

  return !!succeed;
};

const fetchTournamentById = async (tournamentId: string) => {
  'use server';

  const { data } = await getTournament(tournamentId);

  return data?.data.tournament;
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const tournamentId = params.slug;

  // const tournament = await fetchTournamentById(tournamentId);

  return (
    <>
      <div className="flex h-screen bg-epic_tournament bg-fixed bg-cover">
        <div className="m-auto">
          <div className="grid grid-cols-12 gap-4">
            <ParticipantsContainer
              handleJoinTournament={handleJoinTournament}
              handleLeaveTournament={handleLeaveTournament}
            />
          </div>
        </div>
      </div>
    </>
  );
}
