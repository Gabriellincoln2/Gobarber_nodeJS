import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default interface IUserTokenRepository {
  generate(used_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
