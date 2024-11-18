"use client"

import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogSingle from "@/components/blogs/BlogSingle";
import { blogs } from "@/data/blogs";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import { useEffect, useState } from "react";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";
import Head from "next/head";

// export const metadata = {
//   title: "Blog-single || ViaTour - Travel & Tour React NextJS Template",
//   description: "ViaTour - Travel & Tour React NextJS Template",
// };

export default function page({ params }) {
  const id = params.id;
  const blog = blogs.find((item) => item.id == id) || blogs[0];

  const [BlogData, setBlogData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const sendData = {
        AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
        id : id
      };

      try {
        const response = await post("blog_details", sendData);
        setBlogData(response.Blog_Details)
      } catch (error) {
        console.error("Error caught:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          showErrorToast("Please verify your email");
        } else {
          showErrorToast("An error occurred during registration.");
        }
      }
    };

    fetchData();
  }, []);

  console.log("BlogData" , BlogData);
  

  return (
    <>
   
      <main>
        <Header1 />
     {BlogData?.imageOne && (
        <Hero1 blog={blog} BlogData={BlogData}  />
     )}
        <BlogSingle BlogData={BlogData} />
   
        <FooterTwo />
      </main>
    </>
  );
}
