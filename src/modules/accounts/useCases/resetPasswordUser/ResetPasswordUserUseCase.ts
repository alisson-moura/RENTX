import { I_UsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

@injectable()
class ResetPasswordUserUseCase {
    private userTokensRepository: I_UserTokensRepository;
    private dateProvider: I_DateProvider;
    private usersRepository: I_UsersRepository;
    private;

    constructor(
        @inject("UserTokensRepository")
        userTokensRepository: I_UserTokensRepository,
        @inject("DateProvider")
        dateProvider: I_DateProvider,
        @inject("UsersRepository")
        usersRepository: I_UsersRepository
    ) {
        this.userTokensRepository = userTokensRepository;
        this.dateProvider = dateProvider;
        this.usersRepository = usersRepository;
    }
    async execute(token: string, password: string): Promise<void> {
        const userToken = await this.userTokensRepository.findByRefreshToken(token);
        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (
            this.dateProvider.compareIfBefore(
                userToken.expires_date,
                this.dateProvider.dateNow()
            )
        ) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);
        if (!user) {
            throw new AppError("Invalid user!")
        }
        user.password = await hash(password, 8);
        await this.usersRepository.create(user);
        await this.userTokensRepository.deleteById(userToken.id);
    }
}
export { ResetPasswordUserUseCase };
