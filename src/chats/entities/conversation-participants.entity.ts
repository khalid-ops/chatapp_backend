import { User } from '../../users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conversation } from './conversation.entity';

@Entity({ name: 'conversation_participants' })
export class ConversationParticipant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.conversations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.participants)
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @Column({ name: 'role', default: 'participant' })
  role: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'joined_at',
  })
  joinedAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'left_at' })
  leftAt: Date;
}
