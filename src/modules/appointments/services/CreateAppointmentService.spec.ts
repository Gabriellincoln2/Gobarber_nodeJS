// Cada service terá ao menos 1 aquivo de teste,
// onde esse arquivo de teste pode fazer vários testes

import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1122',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1122');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '1122',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1122',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
