import { Tetstimonials } from "@prisma/client";
import { DOMAIN } from "@/utils/constant";

export async function getMessages(): Promise<Tetstimonials[]> {
  const response = await fetch(`${DOMAIN}/api/message`);
  if (!response.ok) {
    throw new Error("Failed to fetch Messages");
  }
  return response.json();
}
