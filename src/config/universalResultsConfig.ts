import { VerticalConfig } from "@yext/answers-react-components";
import { StandardCard } from "../components/StandardCard";

export type UniversalResultsConfig = Record<string, VerticalConfig>;

export const universalResultsConfig: UniversalResultsConfig = {
  products: {
    label: "Products",
  },
  events: {
    label: "Events",
  },
  jobs: {
    label: "Jobs",
  },
  faqs: {
    label: "FAQ",
    viewAllButton: true,
  },
  locations: {
    label: "Locations",
  },
};
