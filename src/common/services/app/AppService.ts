import { injectable } from 'inversify';
import React from 'react';
import Action from '@common/hocs/withView/decorators/Action';
import Computed from '@common/hocs/withView/decorators/Computed';
import State from '@common/hocs/withView/decorators/State';
import { Instances } from '@common/instances/Instances';

@injectable()
export class AppService {

  constructor() {
    this.closeRightSidebar = this.closeRightSidebar.bind(this);
    this.openLeftSidebar = this.openLeftSidebar.bind(this)
    this.toggleLeftSidebar = this.toggleLeftSidebar.bind(this);
    this.setPageTitle = this.setPageTitle.bind(this);
    this.setLeftSidebarContent = this.setLeftSidebarContent.bind(this);
    this.setRightSidebarContent = this.setRightSidebarContent.bind(this);
    this.setPagePath = this.setPagePath.bind(this);
  }
  
  @State()
  private _leftSidebarOpen: boolean = false;

  @State()
  private _rightSidebarOpen: boolean = false;

  @State()
  private _leftSidebarComponent: React.ComponentType<any>  = null;

  @State()
  private _leftSidebarProps: any = null;

  @State()
  private _leftSidebarContainer: Instances  = null;

  @State()
  private _rightSidebarComponent: React.ComponentType<any>  = null;

  @State()
  private _rightSidebarProps: any = null;

  @State()
  private _rightSidebarContainer: Instances  = null;

  @State()
  private _currentPageTitle: string = '';

  @State()
  private _currentPagePath: string = '';

  @State()
  private _rightSidebarTitle: string = '';

  @Computed()
  get rightSidebarTitle() : string {
    return this._rightSidebarTitle;
  }

  @Computed()
  get leftSidebarOpen(): boolean {
    return this._leftSidebarOpen;
  }

  @Computed()
  get rightSidebarOpen(): boolean {
    return this._rightSidebarOpen;
  }

  @Computed()
  get leftSidebarComponent(): React.ComponentType<any>  {
    return this._leftSidebarComponent;
  }

  @Computed()
  get leftSidebarProps(): any {
    return this._leftSidebarProps;
  }

  @Computed()
  get rightSidebarComponent(): React.ComponentType<any>  {
    return this._rightSidebarComponent;
  }

  @Computed()
  get rightSidebarProps(): any {
    return this._rightSidebarProps;
  }

  @Computed()
  get leftSidebarContainer(): Instances  {
    return this._leftSidebarContainer;
  }

  @Computed()
  get rightSidebarContainer(): Instances  {
    return this._rightSidebarContainer;
  }

  @Computed()
  get currentPageTitle(): string {
    return this._currentPageTitle;
  }

  @Computed()
  get currentPagePath(): string {
    return this._currentPagePath;
  }

  @Action()
  openLeftSidebar(component: React.ComponentType<any>, props?: any, container?: Instances): void {
    this._leftSidebarOpen = true;
    this._leftSidebarComponent = component;
    this._leftSidebarProps = props ;
    this._leftSidebarContainer = container ;
  }

  @Action()
  closeLeftSidebar(): void {
    this._leftSidebarOpen = false;
    this._leftSidebarComponent = null;
    this._leftSidebarProps = null;
    this._leftSidebarContainer = null;
  }

  @Action()
  toggleLeftSidebar(): void {
    this._leftSidebarOpen = !this._leftSidebarOpen;
  }

  @Action()
  openRightSidebar(component: React.ComponentType<any>, title: string, props?: any, container?: Instances): void {
    this._rightSidebarOpen = true;
    this._rightSidebarTitle = title;
    this._rightSidebarComponent = component;
    this._rightSidebarProps = props ;
    this._rightSidebarContainer = container ;
  }

  @Action()
  closeRightSidebar(): void {
    this._rightSidebarOpen = false;
    this._rightSidebarComponent = null;
    this._rightSidebarTitle = null;
    this._rightSidebarProps = null;
    this._rightSidebarContainer = null;
  }

  @Action()
  toggleRightSidebar(): void {
    this._rightSidebarOpen = !this._rightSidebarOpen;
  }

  @Action()
  setLeftSidebarContent(component: React.ComponentType<any>, props?: any): void {
    this._leftSidebarComponent = component;
    this._leftSidebarProps = props || null;
  }

  @Action()
  setRightSidebarContent(component: React.ComponentType<any>, props?: any): void {
    this._rightSidebarComponent = component;
    this._rightSidebarProps = props || null;
  }

  @Action()
  setPageTitle(title: string): void {
    this._currentPageTitle = title;
  }

  @Action()
  setPagePath(path: string): void {
    this._currentPagePath = path;
  }

  @Action()
  setPageInfo(title: string, path: string): void {
    this._currentPageTitle = title;
    this._currentPagePath = path;
  }
}
