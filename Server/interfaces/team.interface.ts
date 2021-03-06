import members from "./teamMembers.interface";

export default interface Team {
  teamName: string;
  ownerId: string;
  members: members[];
  moderatorsId: string[];
  description: string;
  startDate: Date;
}
