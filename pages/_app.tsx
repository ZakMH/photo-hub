import "@/styles/globals.css";
import { NextComponentType } from "next";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import React, { ReactElement, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean };
};

type AuthProps = {
  children: ReactElement;
};

const client = new QueryClient({});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
}

function Auth({ children }: AuthProps): JSX.Element {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
