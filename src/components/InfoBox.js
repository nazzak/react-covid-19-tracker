import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core"

const InfoBox = (props) => {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* Title : Coronavirus cases*/}
                {/* +120k : Number of cases*/}
                {/* 1.2M Total*/}
                <Typography className='infoBox__title' color="textSecondary">
                    {props.title}
                </Typography>

                <h2 className="infoBox__cases" >{props.value}</h2>

                <Typography className="infoBox__total" color="textSecondary">
                    {props.total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
