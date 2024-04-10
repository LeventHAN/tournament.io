import TournamentRoom from '@/components/Containers/TournamentRoom';

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  return (
    <>
      <div className="flex h-screen bg-epic_tournament bg-fixed bg-cover">
        <div className="m-auto">
          <div className="grid grid-cols-12 gap-4">
            {params.slug}
            <TournamentRoom />
          </div>
        </div>
      </div>
    </>
  );
}
