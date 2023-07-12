"use client";

import { useEffect } from "react";

import { NextPageContext } from "next";

import { AtmData } from "./api/getAtmData/route";

import { loadAtmData } from "@/lib/load-atm-data";

Home.getInitialProps = async (context: NextPageContext) => {
  const atmData: AtmData = await loadAtmData();
  console.log("getInitialProps is run");

  // Props returned will be passed to the page component
  return { props: { atmData } };
};

export default function Home(props: AtmData) {
  const getData = async () => {
    const atmData: AtmData = await loadAtmData();
    console.log("getData in pages useEffect: ", atmData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      hello world
      <div>{props.message}</div>
    </main>
  );
}
