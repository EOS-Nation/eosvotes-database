import * as fs from 'fs';
import path from 'path';

function readData (filename: string) {
  return fs.readFileSync(path.join(__dirname, filename), 'utf8')
    .split(/\n/)
    .map(line => JSON.parse(line))
}

export const eosioForumData = readData('eosio.forum.jsonl')