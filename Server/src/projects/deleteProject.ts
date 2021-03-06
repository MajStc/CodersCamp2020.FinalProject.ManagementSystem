import { Request, Response } from "express";
import userModel from '../../models/user.model';
import notesModel from '../../models/notes.model';
import tasksModel from '../../models/tasks.model';
import commentsModel from '../../models/comment.model';
import { StatusCodes } from "http-status-codes";

const deleteProject = async (req: Request, res: Response) => {
  const user = await userModel.findById(req.userInfo._id);

  const project = res.locals.project;
  const team = res.locals.team;

  if (req.userInfo._id != project.owner.id && req.userInfo._id != team.ownerId) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Permission denied');
  }

  await notesModel.deleteMany({ projectId: project._id });

  user!.projects!.forEach((userProject: any, i: number) => {
    if (userProject.id == project.id) user!.projects!.splice(i, 1);
  })

  team.projects!.forEach((teamProject: any, i: number) => {
    if (teamProject.id == project.id) team.projects!.splice(i, 1);
  })

  const tasks = await tasksModel.find({ projectId: project.id });
  tasks.forEach(async (task) => {
    const comments = await commentsModel.find({ taskId: task._id });
    comments.forEach(async (comment) => {
      await comment.delete();
    })
    await task.delete();
  })

  await notesModel.deleteMany({ projectId: project.id });

  project.members.forEach(async (member: any) => {
    const deleteUser = await userModel.findById(member.id);
    deleteUser?.projects?.forEach(async (userProject: any, i: number) => {
      if (userProject.id == project.id) deleteUser.projects?.splice(i, 1);
    });
    await deleteUser!.save();
  })

  await user!.save();
  await team.save();
  await project.delete();
  return res.status(StatusCodes.OK).send();
};

export default deleteProject;
