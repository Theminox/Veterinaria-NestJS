import { Inject, Injectable } from '@nestjs/common';
import { ServiceVeterinaria } from './serviceveterinaria';
import { MascotaHistorial } from 'src/Api/mascotahistorial.vo';
import { DoctorEntity } from '../doctor.entity';
import { MascotaEntity } from '../mascota.entity';
import { MascotaRepository } from '../mascota.repository';
import { DoctorRepository } from '../doctor.repository';

@Injectable()
export class ServiceVeterinariaService implements ServiceVeterinaria {

    constructor(@Inject('MascotaRepository')
        private readonly mascotaRepository: MascotaRepository,
        @Inject('DoctorRepository')
        private readonly doctorRepository: DoctorRepository
    ){}
    async verDoctores(): Promise<any[]> {
     let doctores: DoctorEntity[] 
     doctores = await this.doctorRepository.VerTodosDoctores()
     return doctores
    }
    async verMascotas(): Promise<any[]> {
      let mascotas: MascotaEntity[]
      mascotas = await this.mascotaRepository.VerTodasMascotas()
      return mascotas
     }
    async AgregarMascota(mascota: MascotaEntity): Promise<void> {
        let posiblemascota: MascotaEntity
        posiblemascota = await this.mascotaRepository.findByCN(mascota.Cedula,mascota.NombreMascota)
        let doctor: DoctorEntity
        doctor = await this.doctorRepository.findById(mascota.DoctorId)
        return new Promise(async (resolve,reject) => {
            if (!doctor) {
                reject('Ya existe ese doctor');
              }
            if(posiblemascota){
              reject('La mascota ya existe');
              return null
            }
            
              let registro: string = "" 
            
              switch (mascota.Especie) {
                case 'perro':
                  if (mascota.Peso < 4) {
                    reject('Los perro no pueden pesar menos de 4kg');
                    break;
                  } else if (mascota.Peso > 30) {
                    registro = ' Y Tiene sobrepeso ';
                  } else if (mascota.Peso < 15) {
                    registro = ' Y Tiene desnutrición ';
                  }
                  mascota.Historial += registro
                  await this.mascotaRepository.AgregarMascotas(mascota);
                  break;
                case 'gato':
                  if (mascota.Peso < 3) {
                    reject('Los gatos no pueden pesar menos de 3kg');
                    break;
                  } else if (mascota.Peso > 12) {
                    registro = ' Y Tiene sobrepeso ';
                  } else if (mascota.Peso < 6) {
                    registro = ' Y Tiene desnutrición ';
                  }
                  mascota.Historial += registro
                  await this.mascotaRepository.AgregarMascotas(mascota);
                  break;
                case 'ave':
                  if (mascota.Peso < 2) {
                    reject('Las aves no pueden pesar menos de 2kg');
                    break;
                  } else if (mascota.Peso > 10) {
                    registro = ' Y Tiene sobrepeso ';
                  } else if (mascota.Peso < 4) {
                    registro = ' Y Tiene desnutrición ';
                  }
                  mascota.Historial += registro
                  await this.mascotaRepository.AgregarMascotas(mascota);
                  break;

                case 'pez':
                  mascota.Historial += registro
                  await this.mascotaRepository.AgregarMascotas(mascota);
                  break;

                default:
                    reject("lo siento no es una especie valida")
                    break;
              }
              resolve()
    })
    }
    AgregarDoctor(doctor: DoctorEntity): Promise<void> {
        return new Promise((resolve,reject) =>{
            this.doctorRepository.CrearDoctor(doctor)
            resolve()
        })
    }
    VerHistorial(mascotaid: string): Promise<MascotaEntity> {
        let mascota = this.mascotaRepository.VerHistorialMascota(mascotaid)
        return mascota
    }
    async EditarHistoria(mascota: MascotaHistorial): Promise<void> {
        let mascotah: MascotaEntity
        mascotah = await this.mascotaRepository.findById(mascota.id)
        return new Promise((resolve,reject) =>{
            mascotah.Historial = mascota.Historial
            this.mascotaRepository.EditarHistorialMascota(mascotah)
            resolve()
        })  
    }
    async VerHistoriales(doctor: string): Promise<MascotaEntity[]> {
        let mascota = await this.mascotaRepository.listadoMascotas(doctor)
        return mascota    
    }
    async EliminarMascota(mascotaid: string): Promise<void>{
        let mascotah: MascotaEntity
        mascotah = await this.mascotaRepository.findById(mascotaid)
        return new Promise((resolve,reject)=>{
            this.mascotaRepository.EliminarMascotas(mascotah)
            resolve()
        })
    }
}
