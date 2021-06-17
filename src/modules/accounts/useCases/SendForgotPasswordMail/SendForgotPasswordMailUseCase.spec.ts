import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UserTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokensRepositoryInMemory"
import { I_UsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { I_UserTokensRepository } from "@modules/accounts/repositories/IUserTokensRepository"
import { I_DateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { I_MailProvider } from "@shared/container/providers/MailProvider/I_MailProvider"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotMailUseCase: SendForgotPasswordMailUseCase
let usersRepository: I_UsersRepository
let userTokensRepository: I_UserTokensRepository
let dateProvider: I_DateProvider
let mailProvider: I_MailProvider

describe("Send forgot Mail", () => {

    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory()
        userTokensRepository = new UserTokensRepositoryInMemory()
        dateProvider = new DayjsProvider()
        mailProvider = new MailProviderInMemory()
        sendForgotMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepository,
            userTokensRepository,
            dateProvider,
            mailProvider
        )
    })

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail")

        await usersRepository.create({
            driver_license: "664168",
            email: "john@mail.com",
            name: "John Doe",
            password: '123456'
        })

        await sendForgotMailUseCase.execute("john@mail.com")
        expect(sendMail).toBeCalled()
    })

    it("Should not be able to send email if user does not exists", async () => {
        await expect(sendForgotMailUseCase.execute("john@mail.com")).rejects.toEqual(new AppError("User does not exists!", 404))
    })

    it("Should be able to create an user token", async () => {
        const generateToken = spyOn(userTokensRepository, "create")
        await usersRepository.create({
            driver_license: "664168",
            email: "john@mail.com",
            name: "John Doe",
            password: '123456'
        })

        await sendForgotMailUseCase.execute("john@mail.com")
        expect(generateToken).toBeCalled()
    })
})