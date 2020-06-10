import { serve } from 'https://deno.land/std@0.55.0/http/server.ts';
import { readJsonSync } from 'https://deno.land/std/fs/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parse(args).port;

const s = serve({ port: argPort ? Number(argPort) : DEFAULT_PORT });

for await (const req of s) {
  if (req.url === '/jokes') {
    const jokes = readJsonSync('./jokes.json');
    req.respond({
      headers: new Headers({
        'content-type': 'text/html;charset=UTF-8',
        'access-control-allow-origin': '*'
      }),
      body: JSON.stringify(jokes),
    });
  }
}
