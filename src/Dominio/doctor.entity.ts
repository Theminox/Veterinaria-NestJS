import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('DoctorEntity')
export class DoctorEntity {
  @ObjectIdColumn()
  _id: ObjectID | string;
  @Column()
  NombreDoctor: string;
  @Column()
  EdadDoctor: number;
  @Column()
  Estado: boolean;
  //PacienteId Se coloca automaticamente cuando se crea un paciente (Mascota)
  @Column()
  PacienteId: string[];
}
