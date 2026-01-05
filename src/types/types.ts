export interface Item {
  title?: string;
  content?: string;
  icon?: string;
  image?: string;
  images?: string;
  button?: Button;
}

export interface Button {
  title: string;
  link: string;
  svg?: string;
}

export interface SvgSource {
  src: string;
  alt?: string;
 
}

export interface SectionHero {
  title: string;
  items?: Item[];
  svg?: SvgSource;
  images: {
    background?: string;
    front: string;
  };
  video?: string;
  storeButtons?: Button[];
  button?: Button;
}

export interface AppIntro {
  title: string;
  items: Item[];
}

export interface TextInSplitSection {
  title: string;
  items: Item[];
}

export interface TitledSplitSection {
  title: string;
  subTitle?: string;
  items: Item[];
  svg?: SvgSource;
}

export interface SplitSection{
  title: string;
  subTitle?: string;
  image: string;
  video?: string;
  items: Item[];
  svg?: SvgSource;
}

export interface ContentOnly {
  content: string;
}

export interface SectionPoints {
  title: string;
  items: ContentOnly[];
}


export interface ClosingSection {
  title: string;
  subTitle: string;
  subSections?: ShowcaseSection[];
  video?: string;
  image?: string;
  items?: Item[];
}

export interface ShowcaseSection {
  header: string;
  image: string;
  footer: string;
}


export interface FeaturesSection {
  subSections: FeaturesSubSection[];
}

export interface FeaturesSubSection {
  title: string;
  image: string;
  video: string;
  items: Item[];
}

export interface FeaturesSubSectionItem {
  subSection: FeaturesSubSection;
}

export interface Root {
  pages: Record<string, Page>;
}

export interface Page {
  menu_item: string;
  title: string;
  subTitle?: string;
  description?: string;
  descriptions?: string[];
  sections?: Record<string, Section>;
  parts?: Part[];
  image?: string;
  priceForApps?: PriceForApp[]
}

export interface PaymentOption {
  title: string;
  storeButtons: Button[];
}

export interface Section {
  title: string;
  description?: string;
  subSections?: SubSection[] | SubSection;
}


export interface SubSection {
  title?: string;
  icon?: string;
  items?: Item[];
  item?: Item;
  image: string;
  text?: string

}

export interface Part {
  title: string;
  items: Item[];
  paymentOptions?: PaymentOption[];
  storeButtons?: Button[];
  button?: Button;
}

export interface PriceForApp {
  title: string;
  icon?: string;
  price: string;
  platform: string;
  paymentMethod: string;
  otherPaymentMethod?: string;
  appDescription?: string;
  button: Button;
}


export interface CapabilityPoints {
  title: string;
  item_01?: Item;
  item_02?: Item;
  item_03?: Item;
  item_04?: Item;
  item_05?: Item;
  item_06?: Item;
}

export interface Content {
  content: string;
}

export interface AppDescription {
  title: string;
  icon: boolean;
  items: Content[];
  button: Button;
}