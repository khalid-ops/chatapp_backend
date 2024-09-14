import { ConversationParticipant } from '../../chats/entities/conversation-participants.entity';
import { MessageReceipt } from '../../chats/entities/message-receipt.entity';
import { Message } from '../../chats/entities/messages.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserContact } from './user-contact.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  googleId: string;

  @Column({
    nullable: true,
  })
  firstName: string;

  @Column({
    nullable: true,
  })
  lastName: string;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    nullable: true,
    default: 'active',
  })
  status: string;

  @Column({
    nullable: true,
    default: false,
  })
  loggedIn: boolean;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @OneToMany(() => ConversationParticipant, (participant) => participant.user)
  conversations: ConversationParticipant[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => MessageReceipt, (receipt) => receipt.recipient)
  messageReceipts: MessageReceipt[];

  @OneToMany(() => UserContact, (contact) => contact.user)
  sentContacts: UserContact[];

  @OneToMany(() => UserContact, (contact) => contact.contact)
  receivedContacts: UserContact[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
