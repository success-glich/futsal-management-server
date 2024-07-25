import { AllowNull, BeforeCreate, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  displayName!: string;

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
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
  }
}