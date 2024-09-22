import React from "react";
import CardSettings from "../../components/CardComponent/CardSetting";
import CardProfile from "../../components/CardComponent/CardProfile";
const Settings = () =>{
    return(
        <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
    );
}
export default Settings;