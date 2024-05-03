import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { UserEntity } from 'src/users/entities/user.entity';

config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'medic_api',
  entities: [UserEntity],
  logging: true,
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
  .then(() => {
    console.log('Entidades carregadas:', dataSourceOptions.entities);

    console.log('Conexão com o banco de dados estabelecida com sucesso')
  })
  .catch(error => console.error('Erro ao conectar ao banco de dados:', error));

export default dataSource;