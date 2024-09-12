import { User } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './messages.entity';

@Entity({ name: 'message_receipts' })
export class MessageReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.messageReceipts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'recipient_id' })
  recipient: User; // The recipient of the message

  @ManyToOne(() => Message, (message) => message.receipts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'message_id' })
  message: Message; // The message for which this receipt applies

  @Column({ type: 'boolean', default: false })
  isRead: boolean; // Whether the message has been read

  @Column({ type: 'boolean', default: false })
  isDelivered: boolean; // Whether the message has been delivered

  @CreateDateColumn({ nullable: true })
  readAt: Date; // Timestamp for when the message was read

  @CreateDateColumn({ nullable: true })
  deliveredAt: Date; // Timestamp for when the message was delivered

  @CreateDateColumn({ nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}
