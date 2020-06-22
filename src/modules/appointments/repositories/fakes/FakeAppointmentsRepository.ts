// Aqui criamos um "banco de dados" que na verdade é um vetor para fazermos
// os nossos testes, onde armazenamos os arquivos

import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private appointment: Appointment[] = [];

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = this.appointment.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointment.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month && // tem que colocar o +1 para corrigir que o janeiro começa com 0
        getYear(appointment.date) === year
      );
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointment.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month && // tem que colocar o +1 para corrigir que o janeiro começa com 0
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
      );
    });
    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), user_id, date, provider_id });

    this.appointment.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
