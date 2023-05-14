import { Head } from "$fresh/runtime.ts";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render as renderGFM } from "https://deno.land/x/gfm/mod.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL("../posts.md", import.meta.url);
    const markdown = await Deno.readTextFile(url);
    const content = renderGFM(markdown, {});
    return ctx.render(content);
  },
};

export default function Home(props: PageProps<string>) {
  return (
    <>
      <Head>
        <title>reads.theruntime.dev</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h2 class="text-2xl font-bold">reads.theruntime.dev</h2>
      </div>

      <main
        data-color-mode="auto"
        data-dark-theme="dark"
        class="p-4 mx-auto max-w-screen-md markdown-body"
        dangerouslySetInnerHTML={{ __html: props.data }}
      />
    </>
  );
}
