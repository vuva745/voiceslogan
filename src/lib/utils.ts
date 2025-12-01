import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get avatar image based on name (gender-based)
 * Uses different avatar images for male and female names
 */
export function getAvatarForName(name: string): string {
  const firstName = name.split(' ')[0].toLowerCase();
  
  // Female names
  const femaleNames = [
    'lauren', 'aisha', 'emma', 'taylor', 'kayla', 'maya', 'sarah', 
    'olivia', 'sophia'
  ];
  
  // Male names
  const maleNames = [
    'jack', 'marcus', 'erik', 'gary', 'cameron', 'caleb'
  ];
  
  // Unisex names - assign based on hash for consistency
  const unisexNames = ['alex', 'sam', 'jordan', 'casey'];
  
  // Female avatar images (5 images)
  const femaleAvatars = [
    '/avatars/ChatGPT Image Dec 1, 2025, 10_11_28 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_13_59 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_15_57 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_16_56 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_17_58 AM.png',
  ];
  
  // Male avatar images (5 images)
  const maleAvatars = [
    '/avatars/ChatGPT Image Dec 1, 2025, 10_19_31 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_20_09 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_20_43 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_21_16 AM.png',
    '/avatars/ChatGPT Image Dec 1, 2025, 10_22_20 AM.png',
  ];
  
  // Use hash of full name to consistently assign same avatar to same person
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Determine gender and select avatar
  if (femaleNames.includes(firstName)) {
    return femaleAvatars[hash % femaleAvatars.length];
  } else if (maleNames.includes(firstName)) {
    return maleAvatars[hash % maleAvatars.length];
  } else if (unisexNames.includes(firstName)) {
    // For unisex names, use hash to determine gender (even = female, odd = male)
    // This ensures consistency for the same name
    if (hash % 2 === 0) {
      return femaleAvatars[hash % femaleAvatars.length];
    } else {
      return maleAvatars[hash % maleAvatars.length];
    }
  } else {
    // Default to female for unknown names
    return femaleAvatars[hash % femaleAvatars.length];
  }
}
