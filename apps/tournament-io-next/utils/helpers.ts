import Clerk from '@clerk/clerk-js';
import { auth } from '@clerk/nextjs';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

async function getAuthToken() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { getToken } = auth();
    return await getToken();
  }

  const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
  await clerk.load();
  return await clerk.session?.getToken();
}

async function getUserId() {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { user } = await auth();
    if (user) {
      return user.id;
    }
  }

  const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!);
  await clerk.load();
  return clerk.user?.id;
}

export { classNames, getAuthToken, getUserId };
