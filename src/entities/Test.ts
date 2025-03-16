import { Column, Entity } from "typeorm";

@Entity("Test", { schema: "study" })
export class Test {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("varchar", { name: "Name", nullable: true, length: 30 })
  name: string | null;
}
