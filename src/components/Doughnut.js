import React from "react";
import "./Doughnut.css";
import { Doughnut as Donut } from "react-chartjs-2";

function Doughnut(props) {
  // And for a doughnut chart
  const data = {
    datasets: [
      {
        data: props.infoData,
        backgroundColor: ["#CC1034", "#7dd71d", "#fb4443"],
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ["Cases", "Recovered", "Deaths"],
  };

  return (
    <div className="doughnut">
      <Donut className="style" data={data} />
    </div>
  );
}

export default Doughnut;
