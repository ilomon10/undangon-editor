import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CONSTANTS } from "../Constants";

export const Analytics: React.FC = () => {
  return (
    <>
      <script
        defer
        src={`https://${CONSTANTS.UMAMI_URL}/script.js`}
        data-website-id={CONSTANTS.UMAMI_ID}
      ></script>

      <script
        defer
        data-domain={CONSTANTS.PLAUSIBLE_ID}
        src={`http://${CONSTANTS.PLAUSIBLE_URL}/js/script.js`}
      ></script>

      <GoogleAnalytics gaId={CONSTANTS.GOOGLE_ANALYTICS_ID} />
    </>
  );
};
