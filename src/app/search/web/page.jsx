import WebSearchResults from "@/components/WebSearchResults";
import Link from "next/link";
import React from "react";

export default async function WebSearchPage({ searchParams }) {
  const startIndex = searchParams.start || "1";
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=AIzaSyB314yb4EqEr2BCpYVeaoUbBlamC_uunU8&cx=f0af57485a7a84e33&q=${searchParams.searchTerm}&start=${startIndex}`
  );
  if (!response.ok) throw new Error("Something went wrong");
  const data = await response.json();
  const results = data.items;
  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">
          No results found for {searchParams.searchTerm}
        </h1>
        <p className="text-lg">
          Try searching the web or images for something else{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }
  return <div>{results && <WebSearchResults results={data} />}</div>;
}
