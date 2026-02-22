export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit and non-plus characters (handles formats like +20 12 83829510)
  let p = phone.replace(/[^\d+]/g, '');

  // Normalize 0020 to +20
  if (p.startsWith('0020')) {
    p = '+20' + p.substring(4);
  }

  // Handle common Egyptian formats
  // 1. Already +201...
  if (p.startsWith('+201')) {
    return p;
  }

  // 2. 201... -> +201... (12 digits)
  if (p.startsWith('201') && p.length === 12) {
    return '+' + p;
  }

  // 3. 01... -> +201... (11 digits)
  if (p.startsWith('01') && p.length === 11) {
    return '+20' + p.substring(1);
  }

  // 4. 1... -> +201... (10 digits)
  if (p.startsWith('1') && p.length === 10) {
    return '+20' + p;
  }

  // Fallback for other formats
  if (!p.startsWith('+')) {
    if (p.startsWith('0')) {
      return '+20' + p.substring(1);
    }
    return '+20' + p;
  }


  return p;
}

export function getPhoneVariations(phone: string): string[] {
  const normalized = formatPhoneNumber(phone);
  if (!normalized.startsWith('+201')) return [phone, normalized];

  const digits = normalized.substring(3); // e.g., 1020714336
  return [
    normalized,           // +201020714336
    '20' + digits,       // 201020714336
    '0' + digits,        // 01020714336
    digits,              // 1020714336
    phone                // raw input
  ].filter((v, i, a) => a.indexOf(v) === i); // deduplicate
}

