import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const toggleFloatingWindow = () => {
    window.ipc.send("toggle-float-window", true);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <div className="grid grid-col-1 text-2xl w-full text-center">
        <div>
          <Image
            className="ml-auto mr-auto"
            src="/images/logo.png"
            alt="Logo image"
            width={256}
            height={256}
          />
        </div>
        <span>⚡ Electron ⚡</span>
        <span>+</span>
        <span>Next.js</span>
        <span>+</span>
        <span>tailwindcss</span>
        <span>=</span>
        <span>💕 </span>
      </div>
      <div className="mt-1 w-full flex-wrap flex justify-center">
        <Link href="/next">Go to next page</Link>
      </div>
      <div className="mt-8 flex flex-col items-center space-y-4">
        <h1 className="text-3xl font-bold">Jira Time Tracker</h1>
        <button
          onClick={toggleFloatingWindow}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
        >
          Toggle Floating Timer
        </button>
      </div>
    </React.Fragment>
  );
}
