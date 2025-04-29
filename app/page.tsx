import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { TX_TITLE } from "~/shared-name";

export default function Home() {
  return (
    <ViewTransition>
      <section className="mx-auto my-16 max-w-lg">
        <header className="mb-8 flex gap-x-4">
          <h1 className="font-extrabold text-3xl leading-10">React 신기능</h1>
        </header>

        <main>
          <ul>
            <li className="list-disc">
              <ViewTransition name={TX_TITLE}>
                <Link href="/tx">Transaction Status</Link>
              </ViewTransition>
            </li>
          </ul>
        </main>
      </section>
    </ViewTransition>
  );
}
