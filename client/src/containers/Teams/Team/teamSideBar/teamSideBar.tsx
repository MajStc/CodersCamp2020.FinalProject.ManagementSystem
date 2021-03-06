import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as types from "../../../../utils/types";
import classes from "./teamSidebar.module.scss";

import PrimaryActiveItem from "components/UI/sideBar/sidebarItems/primaryActiveItem/primaryActiveItem";
import PrimaryInactiveItem from "components/UI/sideBar/sidebarItems/primaryInactiveItem/primaryInactiveItem";
import SecondaryItem from "components/UI/sideBar/sidebarItems/secondaryItem/secondaryItem";
import SideBar from "components/UI/sideBar/sideBar";
import PrimaryList from "components/UI/sideBar/sidebarItems/primaryList/primaryList";
import SecondaryList from "components/UI/sideBar/sidebarItems/secondaryList/secondaryList";
import LiItem from "components/UI/sideBar/sidebarItems/liItem/liItem";
import SpinnerLight from "components/UI/spinnerLight/spinner";

import { authUser } from "reduxState/loginSlice";
import { fetchTeam } from "reduxState/teamDataSlice";
import { RootState } from "reduxState/store";

const TeamSidebar = () => {
  const history = useHistory();
  const { teamId } = useParams<types.TParams>();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.userInformation);
  const userTeam = useSelector((state: RootState) => state.singleTeamData);

  const changeDesc = useSelector((state: RootState) => state.changeTeamDesc);
  const changeTitleState = useSelector(
    (state: RootState) => state.changeTeamTitle
  );
  const addPending = useSelector((state: RootState) => state.addTeamMember);
  const changeOwner = useSelector((state: RootState) => state.changeTeamOwner);
  const changeModeratorState = useSelector(
    (state: RootState) => state.changeTeamModerator
  );
  const removeStages = useSelector(
    (state: RootState) => state.removeTeamMember
  );
  const removePendingStages = useSelector(
    (state: RootState) => state.removePendingUser
  );
  const createProjectState = useSelector(
    (state: RootState) => state.createProjectSlice
  );

  // import list of teams and projects of current active team
  const changeTeam = (e: any) => {
    history.push(`/teams/${e.target.id}`);
  };

  useEffect(() => {
    dispatch(fetchTeam(teamId));
    dispatch(authUser());
  }, [
    changeDesc.success,
    changeTitleState.success,
    changeOwner.success,
    addPending.success,
    dispatch,
    teamId,
    changeModeratorState.success,
    removeStages.success,
    removePendingStages.success,
    createProjectState.success,
  ]);

  return (
    <SideBar title={"Your teams"}>
      <PrimaryList>
        {user.teams ? (
          user.teams.map((team: any) => {
            if (team.id === teamId) {
              return (
                <LiItem teamId={`${team.id}LiTem`} key={team.id}>
                  <PrimaryActiveItem name={team.name} key={`${team.id}pri`} />

                  <SecondaryList key={`${team.id}List`}>
                    {userTeam.team.projects &&
                      user.projects.map((project: any) => {
                        if (project.teamId === teamId) {
                          return (
                            <NavLink
                              to={`/teams/${teamId}/projects/${project.id}`}
                              exact
                              className={classes.navLink}
                              key={project.id}
                            >
                              <SecondaryItem
                                id={project.id}
                                name={project.name}
                                key={project.id}
                              />
                            </NavLink>
                          );
                        }
                        return null;
                      })}
                  </SecondaryList>
                </LiItem>
              );
            } else {
              return (
                <PrimaryInactiveItem
                  key={team.id}
                  id={team.id}
                  name={team.name}
                  clickHandler={changeTeam}
                />
              );
            }
          })
        ) : (
          <SpinnerLight />
        )}
      </PrimaryList>
    </SideBar>
  );
};

export default TeamSidebar;
