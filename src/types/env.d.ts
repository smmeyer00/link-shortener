declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_LINK_DETAIL_PAGE_ANALYTICS_ENABLED?: string;
    NEXT_PUBLIC_ANALYTIC_RECORDING_ENABLED?: string;
    // Add other environment variables as needed
  }
}
