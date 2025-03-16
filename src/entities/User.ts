import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "study" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "email", comment: "이메일", length: 50 })
  email: string;

  @Column("varchar", { name: "password", comment: "비밀번호", length: 100 })
  password: string;

  @Column("int", {
    name: "status",
    comment: "회원 상태 1: 정상, -1: 탈퇴",
    default: () => "'1'",
  })
  status: number;

  @Column("int", {
    name: "referrer_member_idx",
    nullable: true,
    comment: "추천인 idx",
  })
  referrerMemberIdx: number | null;

  @Column("varchar", {
    name: "referrer_source",
    nullable: true,
    comment: "유입경로",
    length: 255,
  })
  referrerSource: string | null;

  @Column("varchar", {
    name: "referrer_code",
    nullable: true,
    comment: "추천인 코드",
    length: 255,
  })
  referrerCode: string | null;

  @Column("datetime", {
    name: "created_at",
    comment: "생성일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updated_at",
    comment: "수정일시",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("datetime", {
    name: "deleted_at",
    nullable: true,
    comment: "탈퇴일시",
  })
  deletedAt: Date | null;

  @Column("datetime", {
    name: "last_login_at",
    nullable: true,
    comment: "최종 로그인 시간",
  })
  lastLoginAt: Date | null;
}
