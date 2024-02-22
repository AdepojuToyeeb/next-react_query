"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function LocaleSwitcher() {
  const fetchUsers = async ({ queryKey }: any) => {
    const [, { userId }] = queryKey;
    const response = await fetch(`https://reqres.in/api/user/${userId}`);
    return response.json();
  };
  const userId = 12;
  const { isLoading, error, data, status, isError, isSuccess } = useQuery({
    queryKey: ["Users", { userId }],
    queryFn: fetchUsers,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Something happened {error.message}</h1>;
  console.log(data);
  return (
    <>
      <div>
        <h1>{data?.data?.name}</h1>
        <h1>{data?.data?.id}</h1>
      </div>
    </>
  );
}
