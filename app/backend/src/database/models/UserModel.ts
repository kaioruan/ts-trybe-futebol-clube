import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // createdAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   field: 'created_at',
  // },
  // updatedAt: {
  //   type: DataTypes.DATE,
  //   allowNull: false,
  //   field: 'updated_at',
  // },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default User;
