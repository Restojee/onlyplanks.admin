import { Callback } from "@common/types/common";
import React from "react";

export class ModalEntity {

  constructor(component: React.FunctionComponent, name?: string) {
    this.component = component;
    this.name = name;
  }

  get component(): React.FunctionComponent {
    return this._component;
  }

  set component(value: React.FunctionComponent) {
    this._component = value;
  }
  private _component: React.FunctionComponent;

  get name(): string | Callback<[], string> {
    return this._name;
  }

  set name(value: string | Callback<[], string>) {
    this._name = value;
  }
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
  private _id: string;
  private _name: string | Callback<[], string>;
}