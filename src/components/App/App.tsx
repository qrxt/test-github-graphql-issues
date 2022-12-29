import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Loading from "components/Loading";

const IssuesSearchPage = React.lazy(
  () => import("components/pages/IssuesSearchPage")
);
const IssuesListPage = React.lazy(
  () => import("components/pages/IssuesListPage")
);
const IssuePage = React.lazy(() => import("components/pages/IssuePage"));

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
            <Suspense fallback={<Loading />}>
              <IssuesSearchPage />
            </Suspense>
          }
        />

        <Route
          path="/issues"
          element={
            <Suspense fallback={<Loading />}>
              <IssuesListPage />
            </Suspense>
          }
        />
        <Route
          path="/issue/:owner/:repo/:issueNumber"
          element={
            <Suspense fallback={<Loading />}>
              <IssuePage />
            </Suspense>
          }
        />
      </Routes>
    </Page>
  );
}

export default App;
