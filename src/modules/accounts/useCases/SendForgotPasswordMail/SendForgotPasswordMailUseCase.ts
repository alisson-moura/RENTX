import { inject, injectable } from "tsyringe";
import { v4 as uuid } from 'uuid'
import { resolve } from 'path'
import { I_UsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository";
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { I_MailProvider } from "@shared/container/providers/MailProvider/I_MailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
    private usersRepository: I_UsersRepository;
    private userTokensRepository: I_UserTokensRepository;
    private dateProvider: I_DateProvider;
    private mailProvider: I_MailProvider

    constructor(
        @inject("UsersRepository")
        usersRepository: I_UsersRepository,

        @inject("UserTokensRepository")
        userTokensRepository: I_UserTokensRepository,

        @inject("DateProvider")
        dateProvider: I_DateProvider,

        @inject('MailProvider')
        mailProvider: I_MailProvider
    ) {
        this.dateProvider = dateProvider
        this.userTokensRepository = userTokensRepository
        this.usersRepository = usersRepository
        this.mailProvider = mailProvider
    }


    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new AppError("User does not exists!", 404)
        }

        const token = uuid()
        const expires_date = this.dateProvider.addHour(3)

        await this.userTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date
        })

        const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs')
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            email,
            "Recuperação de Senha",
            variables,
            templatePath
        )
    }
}

export { SendForgotPasswordMailUseCase };
