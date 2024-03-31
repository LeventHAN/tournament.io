'use client';

import React, { useState } from 'react';

import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets';
import { Avatar, Button } from '@nextui-org/react';
import { IoFlash, IoFlashOff, IoPersonAdd, IoRocket } from 'react-icons/io5';
import { classNames } from '@/utils/helpers';
import { useParams } from 'next/navigation';

interface ParticipantsContainerProps {
  // Define your component props here
  handleJoinTournament: (tournamentId: string) => void;
}

function truncate(str: string) {
  return str.length > 24 ? str.substring(0, 24) + '...' : str;
}

const ParticipantsContainer: React.FC<ParticipantsContainerProps> = ({
  handleJoinTournament,
}) => {
  // Add your component logic here

  const { slug } = useParams();

  const [tournament, setTournament] = useState(null);

  return (
    <>
      <div className="col-span-12">
        <div className="flex-row justify-between items-center">
          <Seed style={{ fontSize: 15 }} className="min-w-full">
            <SeedItem>
              <div className="p-2.5 min-w-[300px] md:min-w-[400px] grid content-center min-h[300px] divide-y-2 divide-dashed divide-[#08cbfce0]">
                <span className="font-medium text-sky-300 mb-4">
                  Participants List
                </span>

                {[] &&
                  [
                    {
                      globalName: 'Levent Test',
                      avatarUrl:
                        'https://avatars.githubusercontent.com/u/29967589?v=4',
                    },
                  ].map((user, userIndex) => {
                    return (
                      <>
                        <SeedTeam
                          style={{
                            backgroundColor: userIndex % 2 ? '#08cbfce0' : '',
                          }}
                          className="cursor-pointer"
                        >
                          <span className="grid grid-cols-12 gap-2 divide-x-2 divide-double divide-[#08cbfce0]">
                            <div className="col-span-1 py-2 font-bold text-gray-500 mr-4">
                              {userIndex}
                            </div>

                            <div className="p-0.5 col-span-7 flex items-center gap-2 px-4">
                              <Avatar size="sm" src={user?.avatarUrl || ''} />
                              {truncate(user?.globalName || '')}
                            </div>
                          </span>
                        </SeedTeam>
                      </>
                    );
                  })}
              </div>
            </SeedItem>
          </Seed>
        </div>
        <div className="flex justify-between items-center px-8 space-x-24 lg:space-x-unit-80 text-xs md:text-base">
          <div className="order-1">
            <Button className="text-xs md:text-base" disabled>
              <IoPersonAdd />{' '}
              <span className="hidden sm:block">Add offline participant</span>
            </Button>
          </div>
          <div className="order-2">
            <Button
              className={classNames(
                'text-xs md:text-base',
                false ? 'hidden' : ''
              )}
              onClick={() => handleJoinTournament(slug as string)}
              color="success"
            >
              <IoFlash /> <span className="hidden sm:block">Join</span>
            </Button>
            <Button
              className={classNames(
                'text-xs md:text-base',
                true ? 'hidden' : ''
              )}
              onClick={() => alert('leave')}
              color="success"
            >
              <IoFlashOff /> <span className="hidden sm:block">Leave</span>
            </Button>
          </div>
          <div className="order-3">
            <Button
              className="text-xs md:text-base"
              onClick={() => alert('bum')}
              color="success"
            >
              <IoRocket />{' '}
              <span className="hidden sm:block">Start the tournament</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantsContainer;
