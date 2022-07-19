import {
  DirectAnswer,
  SpellCheck,
  UniversalResults,
} from "@yext/answers-react-components";
import { UniversalResultsConfig } from "../config/universalResultsConfig";
import usePageSetupEffect from "../hooks/usePageSetupEffect";

const universalResultsFilterConfig = {
  show: true,
};

export default function UniversalSearchPage(props: {
  universalResultsConfig: UniversalResultsConfig;
}) {
  const { universalResultsConfig } = props;
  usePageSetupEffect();

  return (
    <div>
      <SpellCheck />
      <DirectAnswer />
      <UniversalResults verticalConfigMap={universalResultsConfig} />
    </div>
  );
}
