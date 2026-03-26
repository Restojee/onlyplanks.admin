import { Field } from "@common/store/entity/utils";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { LevelMeta } from "@/modules/levels/model/common/constants";
import Entity from "@common/store/entity/Entity";

export class LevelEntityForm extends Entity {

  @IsNumber()
  @IsNotEmpty()
  @Field(LevelMeta.id)
  private _id: number;
  get id(): number { return this._id; }
  set id(value: number) { this._id = value; }

  @IsString()
  @IsNotEmpty()
  @Field(LevelMeta.name)
  private _name: string;
  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  @IsString()
  @Field(LevelMeta.description)
  private _description: string;
  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }
}
