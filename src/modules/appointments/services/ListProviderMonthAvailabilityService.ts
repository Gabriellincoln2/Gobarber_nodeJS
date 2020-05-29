import { injectable, inject } from 'tsyringe';

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
    console.log(appoitments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
