"use client";

import { Suspense } from "react";
import AlleBooks from "./AlleBooks";

export default function AllBooksPage() {
  return (
    <Suspense fallback={<div>Loading filters...</div>}>
      <AlleBooks />
    </Suspense>
  );
}
