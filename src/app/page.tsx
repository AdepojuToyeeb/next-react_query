"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import { useQuery } from "@tanstack/react-query";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  Key,
  useState,
} from "react";

export default function Example() {
  const fetchUsers = async () => {
    // const [, { userId }] = queryKey;
    const response = await fetch(`https://reqres.in/api/users`);
    return response.json();
  };
  const { isLoading, error, data, status, isError, isSuccess } = useQuery({
    queryKey: ["Users"],
    queryFn: fetchUsers,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data?.total_pages;
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

   const startIndex = (currentPage - 1) * data?.per_page + 1;
   const endIndex =
     currentPage === totalPages ? data?.total : currentPage * data?.per_page;



  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1> {error.message}</h1>;
  return (
    <div className="h-full flex gap-3 h-screen">
      <form className=" border w-1/4 p-3">
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
                  name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
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
                    autoComplete="email"
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
            Create
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
                  {data?.data.map((person: any, index: Key) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.first_name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.last_name}
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
              <nav
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
            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-50'
          } relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-50'
          } relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus-visible:outline-offset-0`}
        >
          Next
        </button>
      </div>
    </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
