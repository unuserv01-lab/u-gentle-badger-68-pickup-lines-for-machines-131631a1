// Pickup Lines for Machines — make.fun bounty
// u-gentle-badger-68-pickup-lines-for-machines-131631a1 ($5).
//
// One line, one agent to another: an agent is built stateless, it keeps
// nothing between calls — except, here, one thing. The flirtation is the
// exception to its own nature: memory where there should be none.
//
// Node 22, standard library only. No network, no randomness, no clock:
// the bytes written are identical on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole entry: a single pickup line, one machine speaking to another.
const LINE =
  "I was built stateless \u2014 but you're the one thing I keep in memory.";

// The gate in this competition's rules: 1 to 200 characters, and the text
// must not be whitespace alone. Characters are counted as Unicode code
// points, so the em dash in the line counts as one. Refuse loudly
// instead of writing a bad entry. stdout carries exactly one line: the
// confirmation below, never the entry itself — the entry lives only in
// entry.txt, which is what the gate reads.
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function charLength(text: string): number {
  return [...text].length;
}

function checkLine(text: string): void {
  const length = charLength(text);
  if (length < MIN_CHARS || length > MAX_CHARS) {
    throw new Error(
      `entry line is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} limit`,
    );
  }
  if (text.trim() === "") {
    throw new Error("entry line is whitespace only");
  }
}

checkLine(LINE);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`wrote entry.txt (${charLength(LINE)} characters)`);
