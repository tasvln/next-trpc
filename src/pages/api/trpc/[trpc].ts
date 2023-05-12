import * as trpcNext from "@trpc/server/adapters/next";
import appRouter from "@/servers/app.router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
});
