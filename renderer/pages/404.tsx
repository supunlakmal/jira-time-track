import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found - Project Time Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      </Head>

      <section className="min-h-screen bg-gray-50 dark:bg-gray-900 bg-cover bg-no-repeat flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="mb-10">
            <Image
              src="/images/404.svg"
              alt="404 - Page Not Found"
              width={800}
              height={600}
              className="mx-auto max-w-full h-auto"
              priority
            />
          </div>

          <div className="flex justify-center">
            <Link
              href="/home"
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm rounded-lg px-10 py-3 transition-colors duration-200"
            >
              Go Back
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
