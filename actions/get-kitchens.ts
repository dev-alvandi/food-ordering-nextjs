import { Kitchen } from "@/types-db";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/kitchens`;

const getKitchens = async (): Promise<Kitchen[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getKitchens;
