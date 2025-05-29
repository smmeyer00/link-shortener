// Global type declarations for the project

// Example of extending the Window interface
type Window = object

// Example of module augmentation for Next.js
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

declare module "next" {
  export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
}

declare module "next/app" {
  export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
  };
}
