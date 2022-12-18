import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FiBarChart2, FiShuffle, FiSettings } from "react-icons/fi";

export interface Route {
  name: string;
  heading: string;
  icon: IconType;
  url: string;
}

export function useRoutes() {
  const { t } = useTranslation();

  const routes: Record<string, Route> = {
    "/": {
      url: "/",
      name: t("common.pages.rates.name"),
      heading: t("common.pages.rates.heading"),
      icon: FiBarChart2,
    },
  };

  return routes;
}
