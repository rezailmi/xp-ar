const LINES = [
  "It looks like you’re trying to get something done.",
  "I can search this computer — or just sit here. Your call.",
  "Have you saved your work? Just checking.",
  "Try Start, then All Programs. That’s where the good stuff lives.",
  "I’m not on the Internet right now. I can still listen.",
  "That reminds me of a file I saw once. Or maybe a stick.",
  "The Start button is in the corner. Always has been.",
  "If this were 2001, I’d fetch that for you.",
];

export function replyTo(text) {
  const typed = text.replace(/\s+/g, " ").trim();
  const index = hash(typed) % LINES.length;
  return {
    echo: typed ? `You typed: “${typed}”` : "You pressed Enter without typing.",
    line: LINES[index],
  };
}

function hash(value) {
  let n = 0;
  for (let i = 0; i < value.length; i += 1) {
    n = (n * 31 + value.charCodeAt(i)) >>> 0;
  }
  return n;
}
