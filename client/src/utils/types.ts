interface Member {
  userId: string;
  userName: string;
}

interface Project {
  projectName: string;
  projectId: string;
}

export interface TeamData {
  description: string;
  members: Member[];
  moderatorsId: string[];
  ownerId: string;
  pendingUsers: string[];
  projects: Project[];
  startDate: string;
  teamName: string;
}

export const baseTeamSetup: TeamData = {
  description: "",
  members: [],
  moderatorsId: [],
  ownerId: "",
  pendingUsers: [],
  projects: [],
  startDate: "",
  teamName: "",
};

interface Team {
  id: string;
  name: string;
}

interface Owner {
  id: string;
  name: string;
}

interface ProjectMember {
  id: string;
  name: string;
}

interface Task {
  id: string;
  name: string;
}

interface Note {
  id: string;
  name: string;
}

export interface ProjectData {
  status: string;
  team: Team;
  owner: Owner;
  projectName: string;
  deadline: string;
  members: ProjectMember[];
  tasks: Task[];
  note: Note[];
  date: string;
  content: string;
}

export const baseProjectSetup: ProjectData = {
  status: "",
  team: {
    id: "",
    name: "",
  },
  owner: { id: "", name: "" },
  projectName: "",
  deadline: "",
  date: '',
  members: [],
  tasks: [],
  note: [],
  content: '',
};

export interface TaskData {
status: string;
commentsId: string[];
projectId: string;
name: string;
content: string;
deadline: string;
startData: string
}

export const baseTaskSetup: TaskData = {
  status: '',
  commentsId: [],
  projectId: '',
  name: '',
  content: '',
  deadline: '',
  startData: '',
}

export type TParams = { teamId: string; projectId: string };
