import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="not-found site-container">
      <p>404</p>
      <h1>Page not found</h1>
      <p>The page you’re looking for isn’t here.</p>
      <Button asChild>
        <Link href="/">Back to portfolio</Link>
      </Button>
    </main>
  );
}
