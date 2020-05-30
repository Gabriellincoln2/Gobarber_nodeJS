import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('IAppointmentsRepository')
    private appoitmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appoitments = await this.appoitmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );
    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appoitments.filter(appoitment => {
        return getDate(appoitment.date) === day;
      });

      return {
        day,
        available: appointmentsInDay.length < 10,
      };
    });
    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
