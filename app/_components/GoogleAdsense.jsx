import Script from "next/script";

const GoogleAdsense = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }
  return (
    <>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-6282693958918202"
        data-ad-slot="6944255980"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <Script dangerouslySetInnerHTML={{ __html: "(window.adsbygoogle = window.adsbygoogle || []).push({});" }} />
    </>
  );
};

export default GoogleAdsense;
