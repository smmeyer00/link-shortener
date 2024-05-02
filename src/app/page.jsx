import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p className="p-4">[sign-in required] Home page. Not implemented yet, but will be a 'dashboard' with list/table of owned links. Clicking one of the owned links will take you to specific page with analytics, edit, delete, etc... in future
      </p>
      <p className="p-4">
        Right now this 'Home' page is on the "/" path. We may want this on "/home" path that requires auth, and reserve "/" for a landing path which supports unauth.
      </p>
    </main>
  );
}
