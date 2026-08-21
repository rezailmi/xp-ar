const LINES = [
  "It looks like you’re trying to stand in a living room. I can help with that. Or spin.",
  "I circled the important part. The important part is you. Also the lamp.",
  "Would you like help spinning, sitting, or pretending this is a spreadsheet?",
  "I put your words in a folder called STUFF. The folder is imaginary.",
  "Have you saved? There is nothing to save. I saved it anyway.",
  "Searching living room… found: sofa, one (1) Pips, leftover Tuesday.",
  "I’m not supposed to leave the rug. That’s a lie. I just like the rug.",
  "Tip: the TV only plays snow. That’s editorial.",
  "Whoa! You typed! I have a form for that. The form ate itself.",
];

export function replyTo(text) {
  const typed = text.replace(/\s+/g, " ").trim();
  const index = hash(typed) % LINES.length;
  return {
    echo: typed ? `You typed: “${typed}”` : "You pressed Enter without typing. Bold.",
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
