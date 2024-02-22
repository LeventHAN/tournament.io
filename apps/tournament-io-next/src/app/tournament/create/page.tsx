'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EGameType, TCreateRoomRequest } from '@/libs/models';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { TbSquareRoundedArrowLeftFilled, TbTournament } from 'react-icons/tb';

const roomCreateSchema: z.ZodType<TCreateRoomRequest> = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  description: z
    .string()
    .min(3, 'Description must be at least 3 characters long')
    .max(250, 'Description must be at most 50 characters long'),
  gameType: z.string(),
});

export default function CreateRoom() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const methods = useForm<TCreateRoomRequest>({
    resolver: zodResolver(roomCreateSchema),
    defaultValues: {
      name: 'My Cool Tournament',
      description:
        'Win crazy prices by joining this tournament. Check out our discord!',
      gameType: EGameType.LOL,
    },
  });

  // const navigate = useNavigate();
  const handleFormSubmit = (data: TCreateRoomRequest) => {
    // onSubmit(data);
    methods.reset();
  };

  return (
    <div className="mx-auto max-w-3xl pt-28">
      <div className="justify-center align-middle">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleFormSubmit)}
            className="relative space-y-4 w-full rounded-lg shadow-lg sm:px-6 md:px-8 lg:px-10 xl:px-12 sm:py-12 md:py-16 lg:py-20 xl:py-24 shadow-gray-200 text-gray-800 bg-white dark:shadow-gray-800 dark:text-gray-200 dark:bg-gray-800"
          >
            <TbSquareRoundedArrowLeftFilled
              size={90}
              className="absolute -top-6 -left-6  cursor-pointer dark:text-gray-200 text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 transition-colors duration-300 ease-in-out"
              onClick={() => router.back()}
            />
            <h1 className="text-3xl font-bold">⭐ Fill in ...</h1>
            <div>
              <p>
                <span className="font-thin text-sm">the tournament&apos;s</span>{' '}
                <span className="font-bold">name</span>
              </p>
              <Input
                type="text"
                variant="bordered"
                size="md"
                onChange={(e) => {
                  methods.setValue('name', e.target.value);
                }}
                defaultValue={methods.formState?.defaultValues?.name}
                isInvalid={!!methods.formState.errors.name}
                errorMessage={methods.formState.errors.name?.message}
              />
            </div>
            <div>
              <p>
                <span className="font-thin text-sm">the tournament&apos;s</span>{' '}
                <span className="font-bold">description</span>
              </p>
              <Input
                variant="bordered"
                size="md"
                onChange={(e) => {
                  methods.setValue('description', e.target.value);
                }}
                defaultValue={methods.formState?.defaultValues?.description}
                isInvalid={!!methods.formState.errors.description}
                errorMessage={methods.formState.errors.description?.message}
              />
            </div>
            <Button
              type="submit"
              color="primary"
              size="lg"
              fullWidth={true}
              autoFocus
            >
              <TbTournament size={20} />
              Create Tournament
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
