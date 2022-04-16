import tokens from './tokens.json';
import { createTheme } from '@shopify/restyle';

const theme = createTheme({
  colors: {
    neutral600: tokens.FigmaColors.neutral600,
    neutral900: tokens.FigmaColors.neutral900,
    tertiaryColorOrange5: tokens.FigmaColors.tertiaryColorOrange5,
    tertiaryColorOrange1: tokens.FigmaColors.tertiaryColorOrange1,
    tertiaryColorOrange3: tokens.FigmaColors.tertiaryColorOrange3,
    neutralNeutral800: tokens.FigmaColors.neutralNeutral800,
    primaryColorPurple2: tokens.FigmaColors.primaryColorPurple2,
    neutralNeutral600: tokens.FigmaColors.neutralNeutral600,
    neutralNeutral400: tokens.FigmaColors.neutralNeutral400,
    neutralNeutral0: tokens.FigmaColors.neutralNeutral0,
    neutralNeutral500: tokens.FigmaColors.neutralNeutral500
  },
  textVariants: {
    headingHeading1: {
      fontFamily: tokens.FigmaTexts.headingHeading1.fontFamily,
      fontWeight: tokens.FigmaTexts.headingHeading1.fontWeight,
      fontSize: tokens.FigmaTexts.headingHeading1.fontSize,
      lineHeight: tokens.FigmaTexts.headingHeading1.lineHeight,
      letterSpacing: tokens.FigmaTexts.headingHeading1.letterSpacing
    },
    buttonSmall: {
      fontFamily: tokens.FigmaTexts.buttonSmall.fontFamily,
      fontWeight: tokens.FigmaTexts.buttonSmall.fontWeight,
      fontSize: tokens.FigmaTexts.buttonSmall.fontSize,
      lineHeight: tokens.FigmaTexts.buttonSmall.lineHeight,
      letterSpacing: tokens.FigmaTexts.buttonSmall.letterSpacing
    },
    headingHeading4: {
      fontFamily: tokens.FigmaTexts.headingHeading4.fontFamily,
      fontWeight: tokens.FigmaTexts.headingHeading4.fontWeight,
      fontSize: tokens.FigmaTexts.headingHeading4.fontSize,
      lineHeight: tokens.FigmaTexts.headingHeading4.lineHeight,
      letterSpacing: tokens.FigmaTexts.headingHeading4.letterSpacing
    },
    priceMedium: {
      fontFamily: tokens.FigmaTexts.priceMedium.fontFamily,
      fontWeight: tokens.FigmaTexts.priceMedium.fontWeight,
      fontSize: tokens.FigmaTexts.priceMedium.fontSize,
      lineHeight: tokens.FigmaTexts.priceMedium.lineHeight,
      letterSpacing: tokens.FigmaTexts.priceMedium.letterSpacing
    },
    captionCaption3: {
      fontFamily: tokens.FigmaTexts.captionCaption3.fontFamily,
      fontWeight: tokens.FigmaTexts.captionCaption3.fontWeight,
      fontSize: tokens.FigmaTexts.captionCaption3.fontSize,
      lineHeight: tokens.FigmaTexts.captionCaption3.lineHeight,
      letterSpacing: tokens.FigmaTexts.captionCaption3.letterSpacing
    },
    inputPlaceholderDefault: {
      fontFamily: tokens.FigmaTexts.inputPlaceholderDefault.fontFamily,
      fontWeight: tokens.FigmaTexts.inputPlaceholderDefault.fontWeight,
      fontSize: tokens.FigmaTexts.inputPlaceholderDefault.fontSize,
      lineHeight: tokens.FigmaTexts.inputPlaceholderDefault.lineHeight,
      letterSpacing: tokens.FigmaTexts.inputPlaceholderDefault.letterSpacing
    },
    buttonMediumExtraBold: {
      fontFamily: tokens.FigmaTexts.buttonMediumExtraBold.fontFamily,
      fontWeight: tokens.FigmaTexts.buttonMediumExtraBold.fontWeight,
      fontSize: tokens.FigmaTexts.buttonMediumExtraBold.fontSize,
      lineHeight: tokens.FigmaTexts.buttonMediumExtraBold.lineHeight,
      letterSpacing: tokens.FigmaTexts.buttonMediumExtraBold.letterSpacing
    },
    captionCaption2: {
      fontFamily: tokens.FigmaTexts.captionCaption2.fontFamily,
      fontWeight: tokens.FigmaTexts.captionCaption2.fontWeight,
      fontSize: tokens.FigmaTexts.captionCaption2.fontSize,
      lineHeight: tokens.FigmaTexts.captionCaption2.lineHeight,
      letterSpacing: tokens.FigmaTexts.captionCaption2.letterSpacing
    },
    subtitleSubtitle2: {
      fontFamily: tokens.FigmaTexts.subtitleSubtitle2.fontFamily,
      fontWeight: tokens.FigmaTexts.subtitleSubtitle2.fontWeight,
      fontSize: tokens.FigmaTexts.subtitleSubtitle2.fontSize,
      lineHeight: tokens.FigmaTexts.subtitleSubtitle2.lineHeight,
      letterSpacing: tokens.FigmaTexts.subtitleSubtitle2.letterSpacing
    },
    cardDetailsSemibold14: {
      fontFamily: tokens.FigmaTexts.cardDetailsSemibold14.fontFamily,
      fontWeight: tokens.FigmaTexts.cardDetailsSemibold14.fontWeight,
      fontSize: tokens.FigmaTexts.cardDetailsSemibold14.fontSize,
      lineHeight: tokens.FigmaTexts.cardDetailsSemibold14.lineHeight,
      letterSpacing: tokens.FigmaTexts.cardDetailsSemibold14.letterSpacing
    },
    bodyBody2: {
      fontFamily: tokens.FigmaTexts.bodyBody2.fontFamily,
      fontWeight: tokens.FigmaTexts.bodyBody2.fontWeight,
      fontSize: tokens.FigmaTexts.bodyBody2.fontSize,
      lineHeight: tokens.FigmaTexts.bodyBody2.lineHeight,
      letterSpacing: tokens.FigmaTexts.bodyBody2.letterSpacing
    },
    priceLarge: {
      fontFamily: tokens.FigmaTexts.priceLarge.fontFamily,
      fontWeight: tokens.FigmaTexts.priceLarge.fontWeight,
      fontSize: tokens.FigmaTexts.priceLarge.fontSize,
      lineHeight: tokens.FigmaTexts.priceLarge.lineHeight,
      letterSpacing: tokens.FigmaTexts.priceLarge.letterSpacing
    },
    priceSmall: {
      fontFamily: tokens.FigmaTexts.priceSmall.fontFamily,
      fontWeight: tokens.FigmaTexts.priceSmall.fontWeight,
      fontSize: tokens.FigmaTexts.priceSmall.fontSize,
      lineHeight: tokens.FigmaTexts.priceSmall.lineHeight,
      letterSpacing: tokens.FigmaTexts.priceSmall.letterSpacing
    },
    cardDetailsSemibold12: {
      fontFamily: tokens.FigmaTexts.cardDetailsSemibold12.fontFamily,
      fontWeight: tokens.FigmaTexts.cardDetailsSemibold12.fontWeight,
      fontSize: tokens.FigmaTexts.cardDetailsSemibold12.fontSize,
      lineHeight: tokens.FigmaTexts.cardDetailsSemibold12.lineHeight,
      letterSpacing: tokens.FigmaTexts.cardDetailsSemibold12.letterSpacing
    },
    subtitleSubtitle3: {
      fontFamily: tokens.FigmaTexts.subtitleSubtitle3.fontFamily,
      fontWeight: tokens.FigmaTexts.subtitleSubtitle3.fontWeight,
      fontSize: tokens.FigmaTexts.subtitleSubtitle3.fontSize,
      lineHeight: tokens.FigmaTexts.subtitleSubtitle3.lineHeight,
      letterSpacing: tokens.FigmaTexts.subtitleSubtitle3.letterSpacing
    },
    headingHeading5: {
      fontFamily: tokens.FigmaTexts.headingHeading5.fontFamily,
      fontWeight: tokens.FigmaTexts.headingHeading5.fontWeight,
      fontSize: tokens.FigmaTexts.headingHeading5.fontSize,
      lineHeight: tokens.FigmaTexts.headingHeading5.lineHeight,
      letterSpacing: tokens.FigmaTexts.headingHeading5.letterSpacing
    },
    bodyBody1: {
      fontFamily: tokens.FigmaTexts.bodyBody1.fontFamily,
      fontWeight: tokens.FigmaTexts.bodyBody1.fontWeight,
      fontSize: tokens.FigmaTexts.bodyBody1.fontSize,
      lineHeight: tokens.FigmaTexts.bodyBody1.lineHeight,
      letterSpacing: tokens.FigmaTexts.bodyBody1.letterSpacing
    },
    buttonMedium: {
      fontFamily: tokens.FigmaTexts.buttonMedium.fontFamily,
      fontWeight: tokens.FigmaTexts.buttonMedium.fontWeight,
      fontSize: tokens.FigmaTexts.buttonMedium.fontSize,
      lineHeight: tokens.FigmaTexts.buttonMedium.lineHeight,
      letterSpacing: tokens.FigmaTexts.buttonMedium.letterSpacing
    },
    headingHeading2: {
      fontFamily: tokens.FigmaTexts.headingHeading2.fontFamily,
      fontWeight: tokens.FigmaTexts.headingHeading2.fontWeight,
      fontSize: tokens.FigmaTexts.headingHeading2.fontSize,
      lineHeight: tokens.FigmaTexts.headingHeading2.lineHeight,
      letterSpacing: tokens.FigmaTexts.headingHeading2.letterSpacing
    }
  }
});

// export type Theme = typeof theme;
export default theme;
