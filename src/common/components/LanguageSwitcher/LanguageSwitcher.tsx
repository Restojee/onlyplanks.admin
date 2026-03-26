import * as React from "react";
import { withView } from "@common/hocs/withView";
import { WithViewProps } from "@common/hocs/withView/types";
import { LanguageSwitcherViewModel } from "./LanguageSwitcherViewModel";
import { Button } from "@common/components/Button";
import { Row } from "@common/components/Layout";

const LanguageSwitcherComponent: React.FC<WithViewProps<LanguageSwitcherViewModel>> = ({
  viewModel 
}) => (
  <Row nonIntegration>
    {viewModel.supportedLanguages.map((language) => (
      <Button
        key={language}
        label={viewModel.getLanguageName(language)}
        color={viewModel.isLanguageActive(language) ? "paletteTextOnColor" : "paletteTextDescription"}
        bgColor={viewModel.isLanguageActive(language) ? "paletteBackgroundStatusSuccessDark" : "paletteBackgroundHover"}
        onClick={() => viewModel.changeLanguage(language)}
      />
    ))}
  </Row>
)

export const LanguageSwitcher = withView(LanguageSwitcherComponent as any, LanguageSwitcherViewModel);
