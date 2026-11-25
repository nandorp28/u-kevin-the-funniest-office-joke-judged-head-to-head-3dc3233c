// The Funniest Office Joke, Judged Head to Head
// One line about office life: an IT password reset that goes company-wide.
// Node 22, stdlib only. Writes the entry to /output/entry.txt.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I asked IT to fix my password. They reset it to 'Password123' and emailed it to the whole company.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim() !== LINE || LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace or have leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");

// Read-back check: the file must match the validated line exactly.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("read-back mismatch: entry.txt does not match the validated line");
}
console.log(`Wrote ${chars} characters, 1 line to ${outPath}`);
