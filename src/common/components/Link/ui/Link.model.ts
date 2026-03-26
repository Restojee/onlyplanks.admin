import { HistoryServiceInjectKey } from "@common/services/router/common/constants";
import HistoryService from "@common/services/router/HistoryService";
import React, { MouseEvent } from "react";
import { UrlBuilder } from "@common/services/router";
import { inject } from "inversify";
import Action from "@common/hocs/withView/decorators/Action";
import { ViewModel } from "@common/hocs/withView";

export interface LinkProps {
  to: UrlBuilder;
  linkUrl: string;
  classPrx: string;
  children: React.ReactNode;
}

class LinkViewModel extends ViewModel<LinkProps> {

  constructor(
    @inject(HistoryServiceInjectKey)
    private readonly historyService: HistoryService
  ) {
    super();
  }

  public get to(): UrlBuilder {
    return this.props.to;
  }

  @Action()
  public push = (event: MouseEvent): void => {
    event.preventDefault();
    this.historyService.push(this.props.to)
  }
}

export default LinkViewModel;
