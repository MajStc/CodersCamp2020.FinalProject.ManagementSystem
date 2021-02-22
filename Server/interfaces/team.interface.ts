export type members = {
    _id: boolean,
    userId : string,
    userName : string
}



export default interface Team {
    teamName: string,
    ownerId : string,
    members: Array<members>,
    pendingUsers: string[],
    projects: Array<any>,
    moderatorsId: string[],
    description: string,
    startDate: Date
}
