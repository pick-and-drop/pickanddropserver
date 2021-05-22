import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class PostRefactoring1621665842311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        default: '123123',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'password');
  }
}
