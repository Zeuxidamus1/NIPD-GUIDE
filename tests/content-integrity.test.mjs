import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const manifest = JSON.parse(
  await readFile(new URL("../src/legal-content-manifest.json", import.meta.url), "utf8"),
);

test("every preserved legal/reference block matches its source fingerprint", async () => {
  const byFile = new Map();

  for (const block of manifest.blocks) {
    if (!byFile.has(block.file)) {
      byFile.set(
        block.file,
        await readFile(new URL(`../${block.file}`, import.meta.url), "utf8"),
      );
    }

    const source = byFile.get(block.file);
    const pattern = new RegExp(
      `/\\* --- LEGACY SCRIPT BLOCK ${block.index} START --- \\*/\\r?\\n([\\s\\S]*?)\\r?\\n/\\* --- LEGACY SCRIPT BLOCK ${block.index} END --- \\*/`,
    );
    const match = source.match(pattern);
    assert.ok(match, `preserved block ${block.index} is present in ${block.file}`);

    // The source originated on Windows, while CI checks it out on Linux.
    // Canonical CRLF hashing keeps the legal-content check strict without
    // treating Git's platform-specific line endings as content changes.
    const canonicalBlock = match[1].replace(/\r?\n/g, "\r\n");
    const digest = createHash("sha256").update(canonicalBlock).digest("hex");
    assert.equal(digest, block.sha256, `block ${block.index} content changed`);
  }
});

test("all original legal source groups are represented", () => {
  const indexes = manifest.blocks.map((block) => block.index);
  assert.deepEqual(indexes, [2, 3, ...Array.from({ length: 33 }, (_, offset) => offset + 5)]);
});
