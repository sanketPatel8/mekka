'use client';

import React, { useEffect } from "react";
import Image from "next/image";

export default function BlogSingle({ BlogData, Lang }) {
  useEffect(() => {
    console.log("Language changed:", Lang);
    // You can add any side effects here that need to run when Lang changes
  }, [Lang]);

  return (
    <>

    {Lang === "EN" ? (
      <section className="layout-pt-md layout-pb-xl">
        <div className="container">
          <div className="row mt-50 justify-center">
            <div className="col-lg-12">
              <h2 className="text-30 md:text-24">
                { BlogData?.headOneEn }
              </h2>
              <p
                className="mt-20"
                dangerouslySetInnerHTML={{
                  __html: 
                     BlogData?.headOneTextEn
                   
                }}
              />
            </div>
          </div>
        </div>
      </section>
    ) : (
      <section className="layout-pt-md layout-pb-xl">
        <div className="container">
          <div className="row mt-50 justify-center">
            <div className="col-lg-12">
              <h2 className="text-30 md:text-24">
                 { BlogData?.headOne}
              </h2>
              <p
                className="mt-20"
                dangerouslySetInnerHTML={{
                  __html:BlogData?.headOneText,}}
              />
            </div>
          </div>
        </div>
      </section>
    )}
      
    </>
  );
}
