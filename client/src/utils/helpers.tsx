import { DateTime } from "luxon";

function convertToCustomFormat(dateString: string): string {
  const parsedDate = DateTime.fromISO(dateString);
  const formattedDate = parsedDate.toFormat("dd/MM/yyyy, HH:mm:ss");
  return formattedDate;
}

function convertTimestampToCustomFormat(timestamp: number): string {
  const parsedDate = DateTime.fromSeconds(timestamp);
  const formattedDate = parsedDate.toFormat("dd/MM/yyyy, HH:mm:ss");
  return formattedDate;
}

const getDateCategory = (createdAt: string) => {
    const conversationDate = DateTime.fromISO(createdAt);
    const today = DateTime.local().startOf('day');
    const yesterday = today.minus({ days: 1 });
  
    if (conversationDate >= today) {
      return 'Today';
    } else if (conversationDate >= yesterday && conversationDate < today) {
      return 'Yesterday';
    } else {
      return 'Older';
    }
  };

export { convertToCustomFormat, convertTimestampToCustomFormat, getDateCategory };
