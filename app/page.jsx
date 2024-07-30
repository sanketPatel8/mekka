import React from "react";
import Firstpage from "./home/page";
// import { Provider } from "react-translated";
// import HomeT from "@/Translate/HomeT";

export const metadata = {
  title: "mekkabooking - Ihr Hajj & Umra Portal ",
  description: "mekkabooking - Ihr Hajj & Umra Portal ",
};

// const language = 'en'; // Set the default language

export default function page() {
  return (
    <>
      {/* <Provider language={langauge} translation={HomeT}> */}
      <Firstpage />
      {/* </Provider> */}
    </>
  );
}
