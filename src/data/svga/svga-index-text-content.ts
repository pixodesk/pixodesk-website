import _content from "./svga-index-text-content.yaml";
import type {
  SectionHero,
  SplitSection,
  TitledSplitSection,
  ClosingSection,
  FeaturesSection,
  AppIntro,
  CapabilityPoints,
} from "../../types/types";



export interface TextContent {
  sections: {
    section_00: SectionHero;
    section_001: AppIntro;
    section_01: CapabilityPoints;
    section_02: SplitSection;
    section_03: FeaturesSection;
    section_030: TitledSplitSection;
    section_031: TitledSplitSection;
    section_04: TitledSplitSection;
    section_05: TitledSplitSection;
    section_06: TitledSplitSection;
    section_060: TitledSplitSection;
    section_07: TitledSplitSection;
    section_08: ClosingSection;
  };
}



const content = _content as TextContent;
export default content
