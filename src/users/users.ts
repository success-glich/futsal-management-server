import { AllowNull, AutoIncrement, BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { AuthHelper } from "../auth/auth.helper";

export interface IUser{
  id?:number;
  uuid:string;
  name:string;
  phone_number:string;
  email:string;
  password:string;
  password_reset_token?:string;
  token_send_at?:Date;
  email_verified_at?:Date;
  email_verify_token?:string | null;
  verified?:boolean;
}
@Table
export class User extends Model<IUser> {
  @AutoIncrement
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;
  @Column({
    type: DataType.STRING(36),
    unique: true,
    field: "uuid",
  })
  uuid!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number!: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
     type:DataType.STRING,
    allowNull:true
  })
  password_reset_token!:string

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  token_send_at!: Date;
  
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  email_verified_at!: Date;
    
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email_verify_token!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verified!: boolean;

  @BeforeCreate
  static async hashPassword(user: User) {
    try {
      user.password=await AuthHelper.hash(user.password);
    } catch (error) {
      throw error;      
    }
    
  }
}