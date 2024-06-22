import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const parseStringify = (value) => JSON.parse(JSON.stringify(value));

export const parseDate = (date) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleString('en-US', {
    // weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
}

export const queryParseDate = (date) => {
  return `${(new Date(date)).toLocaleString('default', { month: '2-digit' })}-${(new Date(date).getDate())}`
}


export function generateString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}