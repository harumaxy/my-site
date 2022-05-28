import { Diplodocus } from "https://deno.land/x/diplodocus/mod.ts";

const diplodocus = await Diplodocus.load();

const port = 3000;
const listener = Deno.listen({ port });
console.log(`Listening on http://localhost:${port}`);

async function hanndleConnection(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);
  for await (const event of httpConn) {
    event.respondWith(diplodocus.handler(event.request));
  }
}

for await (const conn of listener) {
  hanndleConnection(conn);
}
