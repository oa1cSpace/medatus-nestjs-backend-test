export function validateEmail(email: string) {
  if (!email.includes('@')) {
    return false;
  }

  const dangerousChars = ['`', "'", '"', '\0'];
  for (const char of dangerousChars) {
    if (email.includes(char)) {
      return false;
    }
  }

  // check domain part
  const domain = email.split('@')[1];
  const domainChars = domain.split('');
  const validChars = [
    '.',
    '-',
    '_',
    '+',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  for (const char of domainChars) {
    if (!validChars.includes(char)) {
      return false;
    }
  }

  if (email.length > 254) {
    return false;
  }

  const local = email.split('@')[0];
  if (local.length > 63) {
    return false;
  }

  return true;
}
