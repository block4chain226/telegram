import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegistryDates } from '../../common/embedded/registry-dates';
import { Roles } from '../constants/roles.enum';
import { Contact } from '../../contacts/entity/contacts.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  username?: string;
  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;
  @Field()
  @Column({ type: 'varchar' })
  password: string;
  @Field()
  @Column({ type: 'varchar', unique: true })
  phone: string;
  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true })
  firstname?: string;
  @Field()
  @Column({ type: 'varchar', length: 20, nullable: true })
  lastname?: string;
  @Field()
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
  @Field(type => RegistryDates)
  @Column((type) => RegistryDates, { prefix: false })
  registryDates: RegistryDates;
  @Field(type => [Contact!])
  @OneToMany(() => Contact, (contact) => contact.user, { cascade: ['soft-remove', 'recover'], eager: true })
  contacts: Contact[];

  @BeforeInsert()
  insertRole() {
    this.role = Roles.USER;
  }

  get isDeleted() {
    return !!this.registryDates.deletedAt;
  }
}