"use client";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header1 from "@/components/layout/header/Header1";
import Hero1 from "@/components/blogs/Hero1";
import BlogSingle from "@/components/blogs/BlogSingle";
import { blogs } from "@/data/blogs";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import { useEffect, useState } from "react";
import { showErrorToast } from "@/app/utils/tost";
import { post } from "@/app/utils/api";

export default function Page({ params }) {
  const id = params.id;
  const blog = blogs.find((item) => item.id == id) || blogs[0];

  const [BlogData, setBlogData] = useState({});
  const [Lang, setLang] = useState('');
  const [headerLang, setHeaderLang] = useState('');
  const [descLang, setDescLang] = useState('');

  const fetchData = async (locale) => {
    console.log(locale)
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      lang: locale,
      id: id
    };

    try {
      const response = await post("blog_details", sendData);
      setBlogData(response.Blog_Details);
      if (locale == 'EN') {

        console.log(locale)
        setHeaderLang(response.Blog_Details.headOneEn);
        setDescLang(response.Blog_Details.headOneTextEn);
        console.log(headerLang, descLang)
      } else {
        setHeaderLang(response.Blog_Details.headOne);
        setDescLang(response.Blog_Details.headOneText);
        console.log(headerLang, descLang)
      }
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred while fetching blog data.");
    }
  };

  
  useEffect(() => {
    if (Lang) {
      console.log("Fetching data for language:", Lang);

      fetchData(Lang);
    }
  }, [Lang]);
  useEffect(() => {
    const getLocaleFromCookies = () => {
      const cookies = document.cookie.split(";").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key.trim()] = value;
        return acc;
      }, {});

      return cookies.locale || '';
    };

    const initialLang = getLocaleFromCookies();
    if (initialLang) {
      setLang(initialLang);
    }

    const intervalId = setInterval(() => {
      const currentLocale = getLocaleFromCookies();
      if (currentLocale !== Lang) {
        setLang(currentLocale); 
        fetchData(currentLocale);
      }
    }, 200); 

    return () => clearInterval(intervalId);
  }, [Lang]); 

  

  return (
    <>
      <main>
        <Header1 />
        {BlogData?.imageOne && (
          <Hero1 blog={blog} BlogData={BlogData} />
        )}
        <BlogSingle BlogData={BlogData} headerLang={headerLang} descLang={descLang} />
        <FooterTwo />
      </main>
    </>
  );
}