import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'user_contacts' })
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  // The user who initiated the friendship (or contact request)
  @ManyToOne(() => User, (user) => user.sentContacts)
  user: User;

  // The user who is the recipient of the contact/friendship request
  @ManyToOne(() => User, (user) => user.receivedContacts)
  contact: User;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'blocked'],
    default: 'pending',
  })
  status: 'pending' | 'accepted' | 'blocked'; // The status of the friendship

  @CreateDateColumn({ nullable: true, name: 'created_at' })
  createdAt: Date; // Timestamp for when the friendship/contact was created

  @CreateDateColumn({ nullable: true, name: 'accepted_at' })
  acceptedAt: Date; // Timestamp for when the contact/friendship was accepted

  @UpdateDateColumn({ nullable: true, name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date;
}
