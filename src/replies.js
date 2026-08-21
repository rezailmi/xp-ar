const LINES = [
  "The sofa accepted me. The rug is still jealous.",
  "The futon accepted me. The table is still jealous.",
  "I filed the record under Background. I can still see you.",
  "I am a guest. I am also a paperclip. I sat down anyway.",
  "Searching the house… found: you, this cushion, leftover Tuesday.",
  "Do not mind the wobble. The room does that. I do a smaller version.",
  "I wrote your words on the armrest. Then I sat on them.",
  "It looks like you still live here. Good. I was using the furniture.",
];

export function replyTo(text) {
  const typed = text.replace(/\s+/g, " ").trim();
  const index = hash(typed) % LINES.length;
  return {
    echo: typed ? `You said: “${typed}”` : "",
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
