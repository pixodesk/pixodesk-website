import _content from "./svg-index-text-content.yaml";
import type {
  SectionHero,
  SplitSection,
  TitledSplitSection,
  ClosingSection,
  AppIntro,
  CapabilityPoints,
} from "../../types/types";


export interface TextContent {
  sections: {
    section_00: SectionHero;
    section_001: AppIntro;
    section_01: CapabilityPoints;
    section_02: TitledSplitSection;
    section_03: TitledSplitSection;
    section_04: TitledSplitSection;
    section_05: TitledSplitSection;
    section_06: TitledSplitSection;
    section_07: TitledSplitSection;
    section_08: TitledSplitSection;
  };
}



const content = _content as TextContent;
export default content
