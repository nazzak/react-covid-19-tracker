import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = (props) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${props.active && "infoBox__selected"} ${
        props.active && props.isRed && "infoBox__isred"}`}
    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {props.title}
        </Typography>

        <h2 className="infoBox__cases">{props.value}</h2>

        <Typography className="infoBox__total" color="textSecondary">
          {props.total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
