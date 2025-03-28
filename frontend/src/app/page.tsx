"use client";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface Breed {
  id: string;
  attributes: {
    name: string;
    description: string;
  };
}
export default function Home() {
  const [breedName, setBreedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useSWR(
    searchTerm
      ? `http://localhost:8000/api/breeds?name=${searchTerm}`
      : "http://localhost:8000/api/breeds",
    fetcher,
    { refreshInterval: 60000 }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(breedName);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-gray-100 border border-gray-300 rounded p-4 shadow-md text-center">
          <p className="text-blue-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-300 rounded p-4 shadow-md text-center">
          <p className="text-red-600 font-semibold">Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="fixed top-0 left-0 right-0 p-4 bg-black z-10">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={breedName}
            onChange={(e) => setBreedName(e.target.value)}
            placeholder="Enter dog breed"
            className="border rounded-l p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" // Updated styles
          />
          <button
            type="submit"
            className="ml-2 p-2 border rounded-r bg-blue-500 text-white hover:bg-blue-600 transition duration-200" // Updated styles
          >
            {" "}
            Search
          </button>
        </form>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {data ? (
          data.breeds ? ( // Check if data and data.breeds are defined
            data.breeds.map((breed: Breed) => (
              <div
                key={breed.id}
                className="p-4 border rounded shadow hover:shadow-lg"
              >
                <h2 className="text-lg font-bold">{breed.attributes.name}</h2>
                <p>{breed.attributes.description}</p>
              </div>
            ))
          ) : (
            <div className="bg-yellow-100 border border-yellow-300 rounded p-4 shadow-md text-center">
              <p className="text-yellow-600 font-semibold">No breeds found.</p>
            </div>
          )
        ) : (
          <div>No data available.</div> // Optional: Handle the case when data is undefined
        )}
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
