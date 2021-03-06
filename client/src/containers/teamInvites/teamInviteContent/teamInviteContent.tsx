import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "components/UI/formElements/button/button";
import Square from "components/UI/square/square";
import SpinnerCard from "components/UI/SpinnerCard/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { declineInvite, acceptInvite } from "reduxState/teamInvites";

import styles from "./teamInviteContent.module.scss";
import { RootState } from "reduxState/store";

interface Props {
  children: string;
  teamId: string;
}

const TeamInviteContent = (props: Props) => {
  const dispatch = useDispatch();
  const handleStages = useSelector(
    (state: RootState) => state.handleTeamInvite
  );
  const handleAccept = () => {
    dispatch(acceptInvite(props.teamId));
  };

  const handleDecline = () => {
    dispatch(declineInvite(props.teamId));
  };

  return (
    <Square>
      <AlignVert>
        {handleStages.success && handleStages.teamId === props.teamId ? (
          <span className={styles.notification}>
            {" "}
            {handleStages.information}{" "}
          </span>
        ) : (
          <>
            <div className={styles.wrapper}>
              {handleStages.loading && handleStages.teamId === props.teamId ? (
                <SpinnerCard />
              ) : (
                <div className={styles.innerWrapper}>
                  <span className={styles.inviteTitle}>{props.children}</span>
                  <Button clicked={handleAccept}>Accept</Button>
                  <Button btnType="danger" clicked={handleDecline}>
                    Decline
                  </Button>
                </div>
              )}
            </div>
            {handleStages.error && handleStages.teamId === props.teamId && (
              <ErrorHandler>{handleStages.error.response.data}</ErrorHandler>
            )}
          </>
        )}
      </AlignVert>
    </Square>
  );
};

export default TeamInviteContent;
