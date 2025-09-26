"use client";

import { Suspense } from "react";
import AllBooks from "./AllBooks"; 

export default function AllBooksPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <AllBooks />
    </Suspense>
  );
}
