import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Issues = React.lazy(() => import("components/pages/IssuesPage"));

function App() {
  const { t } = useTranslation();

  return (
    <Page>
      <Helmet>
        <title>{t("common.title")}</title>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <Issues />
            </Suspense>
          }
        />
      </Routes>
    </Page>
  );
}

export default App;
