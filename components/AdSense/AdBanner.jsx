"use client";

import React, { useEffect } from "react";

const AdBanner = ({
  pId,
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
    {/*<ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={`ca-pub-${pId}`}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>*/}
  );
};
//https://github.com/janhbnr/Next.js-14-Google-Adsense/tree/main
export default AdBanner;