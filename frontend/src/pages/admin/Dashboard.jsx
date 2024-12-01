import React from "react";
import CardSocialTraffic from "../../components/CardComponent/CardTraffic";
import CardPageVisits from "../../components/CardComponent/CardPageVisit";

const Dashboard = () => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
