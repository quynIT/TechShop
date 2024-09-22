import React from "react";
const sampleData = [
    {
      project: 'Argon Design System',
      budget: '$2,500 USD',
      status: 'pending',
      completion: 60,
    },
    {
      project: 'Angular Now UI Kit PRO',
      budget: '$1,800 USD',
      status: 'completed',
      completion: 100,
    },
    {
      project: 'Black Dashboard Sketch',
      budget: '$3,150 USD',
      status: 'delayed',
      completion: 73,
    },
    {
      project: 'React Material Dashboard',
      budget: '$4,400 USD',
      status: 'on schedule',
      completion: 90,
    },
    {
      project: 'Vue Material Dashboard',
      budget: '$2,200 USD',
      status: 'completed',
      completion: 100,
    },
  ];
const CardTable = ({color}) =>{
    return(
        
            <div className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${color === "light" ? "bg-white" : "bg-gray-800 text-white"}`}>
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <h3 className={`font-semibold text-lg ${color === "light" ? "text-gray-700" : "text-white"}`}>
                  Card Tables
                </h3>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      {['Project', 'Budget', 'Status', 'Completion'].map((header, index) => (
                        <th key={index} className={`px-6 py-3 text-xs uppercase font-semibold text-left ${color === "light" ? "bg-gray-50 text-gray-500" : "bg-gray-700 text-gray-300"}`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((item, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 py-4 text-xs whitespace-nowrap text-left">
                          {item.project}
                        </td>
                        <td className="border-t-0 px-6 py-4 text-xs whitespace-nowrap">
                          {item.budget}
                        </td>
                        <td className="border-t-0 px-6 py-4 text-xs whitespace-nowrap">
                          <span className={`font-bold ${item.status === 'completed' ? 'text-green-500' : item.status === 'pending' ? 'text-orange-500' : 'text-red-500'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 py-4 text-xs whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="mr-2">{item.completion}%</span>
                            <div className="relative w-full">
                              <div className="overflow-hidden h-2 bg-gray-200 rounded">
                                <div
                                  style={{ width: `${item.completion}%` }}
                                  className={`h-full ${item.completion === 100 ? 'bg-green-500' : 'bg-red-500'}`}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          
    );
}  
export default CardTable;