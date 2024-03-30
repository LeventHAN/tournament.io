import CreateTournamentForm from '@/components/Forms/CreateTournamentForm';
import { TCreateRoomRequest } from '@/libs/models';
import { createTournament } from '@/libs/graphql';

const handleFormSubmit = async (createRoomData: TCreateRoomRequest) => {
  'use server';

  const { data } = await createTournament(createRoomData);

  console.log({ data: data.data, errors: data.errors });
};

export default async function CreateRoom() {
  return (
    <div className="bg-epic_tournament bg-fixed bg-cover h-screen">
      <div className="mx-auto max-w-3xl pt-28">
        <div className="justify-center align-middle">
          <CreateTournamentForm handleSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
