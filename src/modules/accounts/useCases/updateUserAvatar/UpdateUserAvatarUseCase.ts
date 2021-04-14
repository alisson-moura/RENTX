import { injectable, inject } from "tsyringe"
import { I_UsersRepository } from "../../repositories/IUsersRepository"
import { deleteFile } from '../../../../utils/file'

interface I_Request {
    user_id: string
    avatar_file: string
}

@injectable()
class UpdateUserAvatarUseCase {
    private usersRepository: I_UsersRepository

    constructor(
        @inject('UsersRepository')
        usersRepository: I_UsersRepository
    ) {
        this.usersRepository = usersRepository
    }

    public async execute({ user_id, avatar_file }: I_Request): Promise<void> {
        const user = await this.usersRepository.findById(user_id)
        if (user.avatar) {
            await deleteFile({
                filename: user.avatar,
                folder: 'avatar'
            })
        }

        user.avatar = avatar_file
        await this.usersRepository.create(user)
    }

}

export { UpdateUserAvatarUseCase }