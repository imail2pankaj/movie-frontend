"use client";

import React, { useEffect } from "react";

const AdBanner = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
  useEffect(() => {
    try {
      ((window).adsbygoogle = (window).adsbygoogle || []).push(
        {}
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6282693958918202"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
};
//https://github.com/janhbnr/Next.js-14-Google-Adsense/tree/main
export default AdBanner;