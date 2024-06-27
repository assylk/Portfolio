import { Tetstimonials } from "@prisma/client";
export async function getMessages(): Promise<Tetstimonials[]> {
  const response = await fetch(`http://localhost:3000/api/message`);
  if (!response.ok) {
    throw new Error("Failed to fetch Messages");
  }
  return response.json();
}
