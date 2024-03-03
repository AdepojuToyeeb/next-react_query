"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, Key, useState } from "react";
import { RotatingLines, TailSpin } from "react-loader-spinner";
import { queryClient } from "./layout";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};
export default function Example() {
  const [state, setState] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
  });
  const fetchUsers = async () => {
    const response = await fetch(
      `https://65e04860d3db23f76248d350.mockapi.io/api/v1/users`
    );
    return response.json();
  };

  //get all users
  const { isLoading, error, data, status, isError, isSuccess } = useQuery({
    queryKey: ["Users"],
    queryFn: fetchUsers,
  });

  //post users
  const mutation = useMutation({
    mutationFn: (state: FormValues) =>
      axios.post(
        "https://65e04860d3db23f76248d350.mockapi.io/api/v1/users",
        state
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Users"] });
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: (value as any).trim(),
    }));
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(state);
  };

  console.log(mutation);

  if (isLoading)
    return (
      <h1 className="border flex justify-center h-screen">
        <RotatingLines
          strokeColor="#000"
          strokeWidth="5"
          animationDuration="0.75"
          width="25"
          visible={true}
        />
      </h1>
    );
  if (isError) return <h1> {error.message}</h1>;
  return (
    <div className="h-full flex gap-3 h-screen">
      <form onSubmit={submitForm} className=" border w-1/4 p-3">
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 ">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create Profile
            </h2>
          </div>

          <div>
            <div className="space-y-3 ">
              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  first name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 p-2 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={handleChange}
                    autoComplete="off"
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 "
          >
            {mutation.isPending ? (
              <RotatingLines
                strokeColor="#000"
                strokeWidth="5"
                animationDuration="0.75"
                width="20"
                visible={true}
              />
            ) : (
              "Create"
            )}
          </button>
        </div>
      </form>
      <div className="w-3/4 px-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Users
        </h2>

        <div className=" w-full flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="block py-2 align-middle sm:px-6 lg:px-8">
              <table className=" w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      First Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.map((person: any, index: Key) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.firstName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.lastName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="">
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <nav
                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex}</span> to{" "}
                    <span className="font-medium">{endIndex}</span> of{" "}
                    <span className="font-medium">{data?.total}</span> results
                  </p>
                </div>
                <div className="flex flex-1 justify-between sm:justify-end">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`${
                      currentPage === 1
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-50"
                    } relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`${
                      currentPage === totalPages
                        ? "cursor-not-allowed"
                        : "hover:bg-gray-50"
                    } relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
                  >
                    Next
                  </button>
                </div>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
