import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { Query } from "typeorm/driver/Query";

export class CreateCarImages1618514738449 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars_image',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'car_id',
                    type: 'uuid',
                },
                {
                    name: 'image_name',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ],
            foreignKeys: [
                {
                    name: 'FK_CarImage',
                    referencedTableName: 'cars',
                    referencedColumnNames: ['id'],
                    columnNames: ["car_id"],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ]

        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('cars_image', 'FK_CarImage')
        await queryRunner.dropTable('cars_image')
    }

}
