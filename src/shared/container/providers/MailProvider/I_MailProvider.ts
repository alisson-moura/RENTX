interface I_MailProvider {
    sendMail(to: string, subject: string, variables: any, path: string): Promise<void>
}

export { I_MailProvider }