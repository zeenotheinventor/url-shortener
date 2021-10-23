import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity()
export class Url extends BaseEntity {
  @ObjectIdColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  shortUrl: string;

  @Field()
  @Column()
  longUrl: string;
}
