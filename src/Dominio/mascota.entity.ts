import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('MascotaEntity')
export class MascotaEntity {
  @ObjectIdColumn()
  _id: ObjectID | string;
  @Column()
  NombreMascota: string;
  @Column()
  DoctorId: string;
  @Column()
  Cedula: number;
  @Column()
  Edad: number;
  @Column()
  Especie: string;
  @Column()
  Raza: string;
  @Column()
  Caracteristicas: string;
  @Column()
  Peso: number;
  @Column()
  Historial: string;
}
