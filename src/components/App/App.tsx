import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Page from "components/Page";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Center, Spinner } from "@chakra-ui/react";

const IssuesPage = React.lazy(() => import("components/pages/IssuesPage"));

function Loading() {
  return (
    <Center h="100%" py={6}>
      <Spinner size="xl" color="purple.500" thickness="4px" />
    </Center>
  );
}

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
              <IssuesPage />
            </Suspense>
          }
        />
      </Routes>
    </Page>
  );
}

export default App;
