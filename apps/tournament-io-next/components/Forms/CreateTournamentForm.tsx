'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { EGameType, TCreateRoomRequest } from '@/libs/models';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { TbSquareRoundedArrowLeftFilled, TbTournament } from 'react-icons/tb';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { IoArrowRedo, IoArrowUndo } from 'react-icons/io5';
import {
  TbBold,
  TbClearFormatting,
  TbCode,
  TbCodeAsterix,
  TbH1,
  TbH2,
  TbH3,
  TbH4,
  TbH5,
  TbH6,
  TbItalic,
  TbListTree,
  TbSeparatorHorizontal,
  TbStrikethrough,
} from 'react-icons/tb';

const roomCreateSchema: z.ZodType<TCreateRoomRequest> = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  description: z.object({
    type: z.string(),
    content: z.array(z.object({})),
  }),
  gameType: z.string(),
});

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-4">
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'bordered' : 'light'}
            size="sm"
          >
            <TbBold /> bold
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'bordered' : 'light'}
            size="sm"
          >
            <TbItalic /> italic
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            variant={editor.isActive('strike') ? 'bordered' : 'light'}
            size="sm"
          >
            <TbStrikethrough /> strike
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            variant={editor.isActive('code') ? 'bordered' : 'light'}
            size="sm"
          >
            <TbCode /> code
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            variant={
              editor.isActive('heading', { level: 1 }) ? 'bordered' : 'light'
            }
          >
            <TbH1 /> h1
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            variant={
              editor.isActive('heading', { level: 2 }) ? 'bordered' : 'light'
            }
          >
            <TbH2 /> h2
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            variant={
              editor.isActive('heading', { level: 3 }) ? 'bordered' : 'light'
            }
          >
            <TbH3 /> h3
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            variant={
              editor.isActive('heading', { level: 4 }) ? 'bordered' : 'light'
            }
          >
            <TbH4 /> h4
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            variant={
              editor.isActive('heading', { level: 5 }) ? 'bordered' : 'light'
            }
          >
            <TbH5 /> h5
          </Button>
          <Button
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            variant={
              editor.isActive('heading', { level: 6 }) ? 'bordered' : 'light'
            }
          >
            <TbH6 /> h6
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant={editor.isActive('bulletList') ? 'bordered' : 'light'}
          >
            <TbListTree /> list
          </Button>
          <Button
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            variant={editor.isActive('codeBlock') ? 'bordered' : 'light'}
          >
            <TbCodeAsterix /> code block
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <TbSeparatorHorizontal /> horizontal rule
          </Button>
          <Button
            variant="shadow"
            size="sm"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
          >
            <TbClearFormatting /> Clear marked
          </Button>
          <Button
            size="sm"
            variant="light"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <IoArrowUndo />
          </Button>
          <Button
            size="sm"
            variant="light"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <IoArrowRedo />
          </Button>
        </div>
      </div>
    </>
  );
};

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

interface Props {
  handleSubmit: (data: TCreateRoomRequest) => Promise<string | undefined>;
}

const CreateTournamentForm: React.FC<Props> = ({ handleSubmit }) => {
  const router = useRouter();

  const [content, setContent] = React.useState<any>(null);

  const methods = useForm<TCreateRoomRequest>({
    resolver: zodResolver(roomCreateSchema),
    defaultValues: {
      name: 'My Cool Tournament',
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is a cool tournament!',
              },
            ],
          },
        ],
      },
      gameType: EGameType.LOL,
    },
  });

  // const navigate = useNavigate();
  const handleFormSubmit = async (data: TCreateRoomRequest) => {
    const tournamentId = await handleSubmit(
      JSON.parse(
        JSON.stringify({
          ...data,
          description: {
            type: 'doc',
            content: content,
          },
        })
      )
    );
    if (tournamentId) {
      methods.reset();
      router.push(`/tournament/queue/${tournamentId}`);
      alert('Tournament created!');
    }
  };

  return (
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
        <h1 className="text-3xl font-bold">⭐ Fill in:</h1>
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
          <>
            <div className="border-2 rounded-lg p-4">
              <EditorProvider
                slotBefore={<MenuBar />}
                extensions={extensions}
                content={methods.formState?.defaultValues?.description}
                onUpdate={(context) => {
                  setContent(context.editor.getJSON()?.content);
                  methods.setValue('description', {
                    type: 'doc',
                    content: context.editor.getJSON()?.content,
                  });
                }}
              ></EditorProvider>
            </div>
          </>
          <span
            className="text-red-700"
            hidden={!methods.formState.errors.description}
          >
            {methods.formState.errors.description?.content[0]?.content?.message}
          </span>
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
  );
};

export default CreateTournamentForm;
