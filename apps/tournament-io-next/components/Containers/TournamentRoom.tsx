'use client';

import { useEffect, useState } from 'react';
import {
  Bracket,
  IRenderSeedProps,
  Seed,
  SeedItem,
  SeedTeam,
} from 'react-brackets';
import { TbArrowRightCircle, TbLoader, TbTournament } from 'react-icons/tb';
import moment from 'moment';
import {
  getTournamentWithBracketsWithSeeds,
  updateTournamentSeedWinner,
} from '../../libs/graphql';
import { useParams } from 'next/navigation';
import { TBracket } from '../../libs/models';
/*
const genMatches = (nTeams) => {
  let matchArray = [];

  while (nTeams > 1) {
    nTeams = (nTeams + 1) >> 1;
    let matches = [];
    for (let i = 0; i < nTeams; ++i) {
      const match = {
        id: i,
        date: moment(new Date()).format('YYYY-MM-DD'),
        teams: [
          { id: null, name: null },
          { id: null, name: null },
        ],
      };
      matches.push(match);
    }
    const roundTitle = matchArray.length + 1;
    matchArray.push({ title: `Round ${roundTitle}`, seeds: matches });
  }
  return matchArray;
};
*/
// const rounds = genMatches(16);

function truncate(str: string) {
  return str.length > 24 ? str.substring(0, 24) + '...' : str;
}

export default function TournamentRoom() {
  const { slug } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [tournamentFinished, setTournamentFinished] = useState(false);
  const [tournamentFinal, setTournamentFinal] = useState(false);
  const [tournamentWinner, setTournamentWinner] = useState<{
    name: string;
  } | null>(null);

  const [settingWinnerLoading, setSettingWinnerLoading] = useState(0);

  const handleTabIndexChange = (index) => () => {
    setTabIndex(index);
  };

  const handleSwipeChange = (index) => {
    setTabIndex(index);
  };

  async function fetchTournament() {
    const tournament = await getTournamentWithBracketsWithSeeds(slug as string);

    if (tournament.data.data.tournamentWithBracketsSeedTeams) {
      const { brackets } = tournament.data.data.tournamentWithBracketsSeedTeams;
      const rounds = brackets.map((bracket: TBracket) => {
        return {
          id: bracket.id,
          title: bracket.title,
          roundIsFinished: bracket.roundIsFinished,
          seeds: bracket.seeds.map((seed) => {
            return {
              id: seed.id,
              date: seed.date,
              teams: seed.teams[0].players.map((player) => {
                return {
                  id: player.id,
                  name: player.username,
                  score: seed.teams[0].score,
                };
              }),
            };
          }),
        };
      });
      setRound(rounds);
    }
  }

  useEffect(() => {
    fetchTournament();
  }, []);

  const [rounds, setRound] = useState<TODO[]>([]);

  const calculateGroupNumber = (roundIndex: number, seedIndex: number) => {
    let index = 1;
    for (let i = 0; i < roundIndex; i++) {
      index += rounds[i].seeds.length;
    }
    index += seedIndex;
    return index;
  };

  // TODO: Currently only supports 1v1 brackets - need to add support for other types of brackets
  const setWinner = async (
    roundIndex: number,
    seedIndex: number,
    teamIndex: number
  ) => {
    alert('setWinner');
    setSettingWinnerLoading(calculateGroupNumber(roundIndex, seedIndex));
    // If the round is already finished, do nothing, do not send anything to the backend
    if (rounds[roundIndex].roundIsFinished) {
      setSettingWinnerLoading(0);
      return;
    }

    // find the bracket, seed, team and the player inside that won and console log the id and name
    const bracketId = rounds[roundIndex].id;
    const seedId = rounds[roundIndex].seeds[seedIndex].id;
    const winnerPlayerId =
      rounds[roundIndex].seeds[seedIndex].teams[teamIndex].id;

    const result = await updateTournamentSeedWinner({
      tournamentId: slug as string,
      bracketId,
      seedId,
      winnerPlayerId,
    });

    if (result?.data?.data?.updateTournamentSeedWinner) {
      // TODO: Handle the result
      console.log(result.data.data.updateTournamentSeedWinner);
    }

    await fetchTournament(); // refetch the tournament to get the updated data
    setSettingWinnerLoading(0);
  };

  // TODO: Create on backend
  const createTheSecondRoundForEveryBracket = () => {
    const oldRounds = [...rounds];
    const newRounds = [];

    // Check if there are rounds in the oldRounds array
    if (oldRounds.length) {
      const lastRound = oldRounds[oldRounds.length - 1];

      // Check if the last round has more than one seed
      if (lastRound.seeds.length > 1) {
        console.log(
          'Check if the last round has more than one seed ',
          lastRound.seeds.length > 1
        );
        // set lastRound as finished
        const newRound = {
          id: oldRounds.length + 1,
          title: `Round ${oldRounds.length + 1}`,
          seeds: [],
          roundIsFinished: false,
        };

        const winners = [];
        const losers = [];

        for (let j = 0; j < lastRound.seeds.length; j++) {
          const seed = lastRound.seeds[j];

          // Determine if it's a winner or loser based on the score
          if (seed.teams[0].score === 1) {
            winners.push(seed.teams[0]);
            losers.push(seed.teams[1]);
          } else if (seed.teams[0].score === 0) {
            winners.push(seed.teams[1]);
            losers.push(seed.teams[0]);
          } else {
            // notify there is one team without winner
            alert('There is at least one team without a winner');
            return;
          }

          lastRound.roundIsFinished = true;
        }

        // Pair up winners to fight each other
        while (winners.length >= 2) {
          const teamA = winners.pop();
          const teamB = winners.pop();
          const newSeed = {
            id: `${oldRounds.length}_${newRound.seeds.length}`,
            date: moment(new Date()).format('YYYY-MM-DD'),
            teams: [
              {
                id: `${oldRounds.length}_${newRound.seeds.length}_0`,
                name: teamA?.name,
                score: 0,
              },
              {
                id: `${oldRounds.length + 2}_${newRound.seeds.length}_1`,
                name: teamB?.name,
                score: 0,
              },
            ],
          };
          // Push the new seed to the beginning of the array
          newRound.seeds.unshift(newSeed);
        }

        // Pair up remaining winners with random losers
        while (winners.length > 0) {
          const teamA = winners.pop();
          const randomLoserIndex = Math.floor(Math.random() * losers.length);
          const teamB = losers.splice(randomLoserIndex, 1)[0];
          const newSeed = {
            id: `${oldRounds.length + 2}_${newRound.seeds.length}`,
            date: moment(new Date()).format('YYYY-MM-DD'),
            teams: [teamA, teamB],
          };
          // Push the new seed to the beginning of the array
          newRound.seeds.unshift(newSeed);
        }

        newRounds.push(newRound);
      }
    }

    if (oldRounds.length === 2 && newRounds.length === 1) {
      setTournamentFinal(true);
    }

    // handle last round winner
    if (!newRounds.length) {
      setTournamentFinal(false);
      setTournamentFinished(true);

      // roundIsFinished set true
      oldRounds[oldRounds.length - 1].roundIsFinished = true;
      const winningTeam = oldRounds[oldRounds.length - 1].seeds[0].teams.find(
        (team) => team.score === 1
      );

      if (winningTeam) {
        setTournamentWinner(winningTeam);
      } else {
        // error notify
        alert('Please select a final winner for the tournament.');
        return;
      }
    }

    setRound([...oldRounds, ...newRounds]);
  };

  const CustomSeed = ({
    seed,
    breakpoint,
    roundIndex,
    seedIndex,
  }: IRenderSeedProps) => {
    const homeTeam = seed.teams[0];
    const awayTeam = seed.teams[1];

    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 12 }}>
        {settingWinnerLoading ==
          calculateGroupNumber(roundIndex, seedIndex) && (
          <TbLoader className="z-10 blur-0 h-10 w-10 animate-spin absolute" />
        )}
        <SeedItem
          className={
            settingWinnerLoading == calculateGroupNumber(roundIndex, seedIndex)
              ? 'opacity-50 blur-sm'
              : ''
          }
        >
          <div>
            <span className="font-medium text-sky-400">
              Group #{calculateGroupNumber(roundIndex, seedIndex)}
            </span>
            <SeedTeam
              style={{
                backgroundColor: homeTeam.score > awayTeam.score && 'green',
              }}
              onClick={() => setWinner(roundIndex, seedIndex, 0)}
              className="cursor-pointer"
            >
              <div>{homeTeam.name ? truncate(homeTeam.name) : '----'}</div>
              {!!homeTeam.score && <TbTournament className="h-4 w-4" />}
            </SeedTeam>
            <SeedTeam
              style={{
                backgroundColor: homeTeam.score < awayTeam.score && 'green',
              }}
              onClick={() => setWinner(roundIndex, seedIndex, 1)}
              className="cursor-pointer"
            >
              <div>{awayTeam.name ? truncate(awayTeam.name) : '----'}</div>
              {!!awayTeam.score && <TbTournament className="h-4 w-4" />}
            </SeedTeam>
          </div>
        </SeedItem>
        <div>
          {seed.date
            ? moment(new Date(seed.date)).format('YYYY-MM-DD')
            : '----'}
        </div>
      </Seed>
    );
  };

  function MobileRoundsButton({ handleMobileClick }) {
    return rounds.map((round) => {
      return (
        <button
          key={round.id}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleMobileClick(round.id)}
        >
          {round.title}
        </button>
      );
    });
  }

  return (
    <div className="w-full h-full">
      <div className="visible lg:invisible space-x-2 ">
        <MobileRoundsButton handleMobileClick={handleTabIndexChange} />
      </div>
      <Bracket
        rounds={rounds}
        renderSeedComponent={CustomSeed}
        swipeableProps={{
          enableMouseEvents: true,
          animateHeight: true,
          index: tabIndex,
          onChangeIndex: handleSwipeChange,
        }}
      />
      {!tournamentFinished && (
        <button
          onClick={createTheSecondRoundForEveryBracket}
          type="button"
          className="ml-4 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Next Round
          <TbArrowRightCircle className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      )}
      {tournamentFinal && (
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Tournament Final
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Please select a final winner for the tournament.
          </p>
        </div>
      )}
      {tournamentFinished && tournamentWinner && (
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Tournament Finished
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {tournamentWinner.name} is the winner!
          </p>
        </div>
      )}
    </div>
  );
}
