import { container } from 'tsyringe'
import { I_DateProvider } from './DateProvider/IDateProvider'
import { DayjsProvider } from './DateProvider/implementations/DayjsProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { I_MailProvider } from './MailProvider/I_MailProvider'

container.registerSingleton<I_DateProvider>(
    "DateProvider",
    DayjsProvider
)

container.registerInstance<I_MailProvider>(
    "MailProvider",
    new EtherealMailProvider
)