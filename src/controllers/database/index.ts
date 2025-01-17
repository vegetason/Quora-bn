import { Sequelize } from "sequelize";
import dotenv from "dotenv"
import pg from "pg"

dotenv.config()

export const sequelize=new Sequelize(process.env.DB_DATABASE as any, process.env.DB_USERNAME as any, process.env.DB_PASSWORD, {
    dialect: "postgres",
    dialectModule: pg,
  });