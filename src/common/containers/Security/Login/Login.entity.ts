import { Field } from "@common/store/entity/utils";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import Entity from "@common/store/entity/Entity";

export class LoginFormEntity extends Entity {

  @IsEmail()
  @IsNotEmpty()
  @Field('login')
  private _login: string;
  get login(): string { return this._login; }
  set email(value: string) { this._login = value; }

  @IsString()
  @IsNotEmpty()
  @Field('password')
  private _password: string;
  get password(): string { return this._password; }
  set password(value: string) { this._password = value; }
}
