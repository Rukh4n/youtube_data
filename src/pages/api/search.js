import { searchFunction } from "@/libs/youtube";

export default async function handler(req, res) {
    await searchFunction(req, res);
}
