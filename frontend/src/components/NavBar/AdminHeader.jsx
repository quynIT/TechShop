import React from "react";
const AdminHeader = ()=> {
    // Dữ liệu mẫu
    const statSubtitle = 'Traffic';
    const statTitle = '350,897';
    const statArrow = 'up';
    const statPercent = '3.48';
    const statPercentColor = 'text-emerald-500';
    const statDescription = 'Since last month';
    const statIconName = 'far fa-chart-bar';
    const statIconColor = 'bg-red-500';
  
    return (
      <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap flex">

              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg">
                    <div className="flex-auto p-4">
                      <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                          <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                            {statSubtitle}
                          </h5>
                          <span className="font-semibold text-xl text-blueGray-700">
                            {statTitle}
                          </span>
                        </div>
                        <div className="relative w-auto pl-4 flex-initial">
                          <div
                            className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${statIconColor}`}
                          >
                            <i className={statIconName}></i>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-blueGray-400 mt-4">
                        <span className={`${statPercentColor} mr-2`}>
                          <i
                            className={
                              statArrow === 'up'
                                ? 'fas fa-arrow-up'
                                : 'fas fa-arrow-down'
                            }
                          ></i>{' '}
                          {statPercent}%
                        </span>
                        <span className="whitespace-nowrap">{statDescription}</span>
                      </p>
                    </div>
                  </div>
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                      <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-blueGray-400 uppercase font-bold text-xs">
                          {statSubtitle}
                        </h5>
                        <span className="font-semibold text-xl text-blueGray-700">
                          {statTitle}
                        </span>
                      </div>
                      <div className="relative w-auto pl-4 flex-initial">
                        <div
                          className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${statIconColor}`}
                        >
                          <i className={statIconName}></i>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blueGray-400 mt-4">
                      <span className={`${statPercentColor} mr-2`}>
                        <i
                          className={
                            statArrow === 'up'
                              ? 'fas fa-arrow-up'
                              : 'fas fa-arrow-down'
                          }
                        ></i>{' '}
                        {statPercent}%
                      </span>
                      <span className="whitespace-nowrap">{statDescription}</span>
                    </p>
                  </div>
                </div>
            </div>
            </div>
            
            </div>
            
          </div>
        </div>
      

      
      </> 
    );
}
export default AdminHeader;
