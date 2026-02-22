export function formatPhoneNumber(phone: string): string {
  // Remove all spaces, dashes, parentheses to clean up the number
  let p = phone.replace(/[\s-()]/g, '');

  if (p.startsWith('0020')) {
    p = '+20' + p.substring(4);
  } else if (p.startsWith('+20')) {
    // Already has +20
  } else if (p.startsWith('01')) {
    p = '+20' + p.substring(1); // 012... -> +2012...
  } else if (p.startsWith('1')) {
    p = '+20' + p; // 127... -> +20127...
  } else if (p.startsWith('201')) {
    p = '+' + p; // 201... -> +201...
  } else {
    // fallback
    if (!p.startsWith('+')) {
      p = '+20' + p;
    }
  }

  return p;
}
