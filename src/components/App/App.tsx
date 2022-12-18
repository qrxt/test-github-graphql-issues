import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

// const ExchangeRates = React.lazy(
//   () => import("components/pages/ExchangeRatesPage")
// );

function App() {
  const { t } = useTranslation();

  console.log("hello");
  return (
    <Page>
      <Helmet>
        <title>{t("common.title")}</title>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            // <Suspense fallback={<ExchangeRatesSkeleton />}>
            //   <ExchangeRates />
            // </Suspense>
            <div>hello</div>
          }
        />
      </Routes>
    </Page>
  );
}

export default App;
