import { container } from 'tsyringe'
import { I_DateProvider } from './DateProvider/IDateProvider'
import { DayjsProvider } from './DateProvider/implementations/DayjsProvider'

container.registerSingleton<I_DateProvider>(
    "DateProvider",
    DayjsProvider
)