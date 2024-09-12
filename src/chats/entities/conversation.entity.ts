import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConversationParticipant } from './conversation-participants.entity';
import { Message } from './messages.entity';

@Entity({ name: 'conversation' })
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'is_group', default: false })
  isGroup: boolean;

  @Column({ name: 'is_deleted', default: false })
  isDeleted: boolean;

  @OneToMany(
    () => ConversationParticipant,
    (participant) => participant.conversation,
    {
      onDelete: 'SET NULL',
    },
  )
  participants: ConversationParticipant[];

  @OneToMany(() => Message, (messages) => messages.conversation, {
    onDelete: 'SET NULL',
  })
  messages: Message[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
