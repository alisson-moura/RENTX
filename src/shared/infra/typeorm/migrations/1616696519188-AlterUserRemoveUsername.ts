import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserRemoveUsername1616696519188 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "username",
            type: "varchar"
        }))
    }

}
