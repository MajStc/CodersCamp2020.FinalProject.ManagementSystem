import express, { Request, Response } from "express";

import getSpecifiedProjectFromTeam from "../src/projects/getSpecifiedProjectFromTeam";

import createNewProject from "../src/projects/createNewProject";

import deleteProject from "../src/projects/deleteProject";

import updateProjectMembers from "../src/projects/updateProjectMembers";
import updateProjectStatus from "../src/projects/updateProjectStatus";
import updateProjectInfo from "../src/projects/updateProjectInfo";

import findProject from "../middleware/findProject";
import findTeam from "../middleware/findTeam";
import auth from '../middleware/auth';

export default class ProjectsController {
  public path = "/teams/:teamId/projects";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:projectId`,
      findTeam,
      findProject,
      this.getSpecifiedProjectFromTeam
    );

    this.router.post(`${this.path}`, auth, findTeam, this.createNewProject);

    this.router.put(
      `${this.path}/:projectId/members`,
      auth,
      findTeam,
      findProject,
      this.updateProjectMembers
    );
    this.router.put(
      `${this.path}/:projectId/status`,
      auth,
      findTeam,
      this.updateProjectStatus
    );
    this.router.put(
      `${this.path}/:projectId/info`,
      auth,
      findTeam,
      this.updateProjectInfo
    );

    this.router.delete(
      `${this.path}/:projectId`,
      auth,
      findTeam,
      findProject,
      this.deleteProject
    );
  }

  getSpecifiedProjectFromTeam(req: Request, res: Response) {
    getSpecifiedProjectFromTeam(req, res);
  }

  createNewProject(req: Request, res: Response) {
    createNewProject(req, res);
  }

  updateProjectMembers(req: Request, res: Response) {
    updateProjectMembers(req, res);
  }

  updateProjectStatus(req: Request, res: Response) {
    updateProjectStatus(req, res);
  }

  deleteProject(req: Request, res: Response) {
    deleteProject(req, res);
  }

  updateProjectInfo(req: Request, res: Response) {
    updateProjectInfo(req, res);
  }
}
