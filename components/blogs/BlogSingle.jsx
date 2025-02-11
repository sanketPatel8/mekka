"use client";

import React, { useEffect } from "react";
import Image from "next/image";

export default function BlogSingle({ BlogData, headerLang, descLang }) {
  return (
    <>
      <section className="layout-pt-md layout-pb-xl">
        <div className="container">
          <div className="row mt-50 justify-center">
            <div className="col-lg-12">
              <h2 className="text-30 md:text-24">{headerLang}</h2>
              <p
                className="mt-20"
                dangerouslySetInnerHTML={{
                  __html: descLang,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
