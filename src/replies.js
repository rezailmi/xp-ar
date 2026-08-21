const LINES = [
  "It looks like you live here. I live here now. That is probably fine.",
  "I filed the sofa under Furniture. The rug is under Me.",
  "Would you like help sitting down? I cannot sit. I can hover helpfully.",
  "I am a guest. I am also a paperclip. Both of us are on the rug.",
  "Searching the house… found: you, me, a lamp that thinks it is important.",
  "Do not mind the wobble. The room is doing that. I am doing that.",
  "If you walk behind the sofa I will still be on the rug. That is policy.",
  "I wrote your words down. Then I lost the paper. Say them again if you want.",
];

export function replyTo(text) {
  const typed = text.replace(/\s+/g, " ").trim();
  const index = hash(typed) % LINES.length;
  return {
    echo: typed ? `You typed: “${typed}”` : "You pressed Enter with nothing in the box. Noted.",
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
