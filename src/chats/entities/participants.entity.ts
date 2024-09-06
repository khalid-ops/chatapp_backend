import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'participants' })
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'conversation_id' })
  conversation: string;
}
