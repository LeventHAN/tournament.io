'use client';

import React, { useEffect, useState } from 'react';

import { Seed, SeedItem, SeedTeam } from 'react-brackets';
import { Avatar, Button } from '@nextui-org/react';
import { IoFlash, IoFlashOff, IoPersonAdd, IoRocket } from 'react-icons/io5';
import { classNames } from '@/utils/helpers';
import { useParams } from 'next/navigation';
import { TCreateTournamentResponse } from '@/libs/models';
import { useUser } from '@clerk/nextjs';
import { getTournament } from '../../libs/graphql';
import { EditorContent, EditorProvider, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';

interface ParticipantsContainerProps {
  // Define your component props here
  handleJoinTournament: (tournamentId: string) => Promise<boolean>;
  handleLeaveTournament: (tournamentId: string) => Promise<boolean>;
}

function truncate(str: string) {
  return str.length > 24 ? str.substring(0, 24) + '...' : str;
}

const ParticipantsContainer: React.FC<ParticipantsContainerProps> = ({
  handleJoinTournament,
  handleLeaveTournament,
}) => {
  const { slug } = useParams();
  const currentLoggedInUser = useUser();

  const [tournamentData, setTournamentData] =
    useState<TCreateTournamentResponse | null>(null);

  useEffect(() => {
    const fetchTournamentData = async () => {
      const response = await getTournament(slug as string);
      setTournamentData(response.data.data.tournament);
    };

    fetchTournamentData();

    return () => {
      setTournamentData(null);
    };
  }, []);

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ];

  const joinTournament = async () => {
    const status = await handleJoinTournament(slug as string);
    if (status) {
      alert('Participant added to tournament');
    }
  };

  const leaveTournament = async () => {
    const status = await handleLeaveTournament(slug as string);
    if (status) {
      alert('Participant left the tournament');
    }
  };

  if (!tournamentData || !currentLoggedInUser.isLoaded)
    return <div>Loading...</div>;

  const isCurrentUserTournamentParticipant =
    tournamentData.tournamentParticipants.some(
      (participant) => participant.id === currentLoggedInUser.user?.id
    );

  return (
    // Parent has classname: grid grid-cols-12 gap-4
    <div className="col-span-12 grid grid-cols-12 gap-4 p-2">
      <div className="col-span-6 max-h-unit-9xl overflow-auto p-8 bg-slate-400 bg-opacity-45 rounded-md">
        <div>
          {tournamentData?.tournamentDescription[0] && (
            <EditorProvider
              extensions={extensions}
              content={tournamentData?.tournamentDescription[0]}
              editable={false}
            ></EditorProvider>
          )}
        </div>
      </div>
      <div className="col-span-6">
        <div>
          <div className="flex-row justify-between items-center">
            <Seed style={{ fontSize: 15 }} className="min-w-full">
              <SeedItem>
                <div className="p-2.5 min-w-[300px] md:min-w-[400px] grid content-center min-h[300px] divide-y-2 divide-dashed divide-[#08cbfce0]">
                  <span className="font-medium text-sky-300 mb-4">
                    Participants List
                  </span>
                  {tournamentData.tournamentParticipants &&
                    tournamentData.tournamentParticipants.map(
                      (participant, userIndex) => {
                        return (
                          <>
                            <SeedTeam
                              style={{
                                backgroundColor:
                                  userIndex % 2 ? '#08cbfce0' : '',
                              }}
                              className="cursor-pointer"
                            >
                              <span className="grid grid-cols-12 gap-2 divide-x-2 divide-double divide-[#08cbfce0]">
                                <div className="col-span-1 py-2 font-bold text-gray-500 mr-4">
                                  {userIndex}
                                </div>

                                <div className="p-0.5 col-span-7 flex items-center gap-2 px-4">
                                  <Avatar
                                    size="sm"
                                    src={participant.avatarUrl}
                                  />
                                  {truncate(participant.username)}
                                </div>
                              </span>
                            </SeedTeam>
                          </>
                        );
                      }
                    )}
                </div>
              </SeedItem>
            </Seed>
          </div>
          <div className="flex-row justify-between items-center px-8 space-x-24 lg:space-x-unit-80 text-xs md:text-base">
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
                  isCurrentUserTournamentParticipant ? 'hidden' : ''
                )}
                onClick={joinTournament}
                color="success"
              >
                <IoFlash /> <span className="hidden sm:block">Join</span>
              </Button>
              <Button
                className={classNames(
                  'text-xs md:text-base',
                  !isCurrentUserTournamentParticipant ? 'hidden' : ''
                )}
                onClick={leaveTournament}
                color="danger"
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
      </div>
    </div>
  );
};

export default ParticipantsContainer;
