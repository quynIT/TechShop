import {React, useState} from "react";
import {Link} from "react-router-dom";
const Sidebar = () => {
    const [collapseShow, setCollapseShow] = useState("hidden");
  
    return (
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow(collapseShow === "hidden" ? "bg-white m-2 py-3 px-6" : "hidden")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" to="/">
            Notus React
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">
              {/* <UserDropdown /> */}
            </li>
          </ul>
          {/* Collapse */}
          <div className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}>
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0" to="/">
                    Notus React
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Admin Layout Pages</h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {['/admin/dashboard', '/admin/settings', '/admin/tables', '/admin/maps'].map((path, index) => (
                <li className="items-center" key={index}>
                  <Link
                    className={`text-xs uppercase py-3 font-bold block ${window.location.pathname === path ? "text-lightBlue-500 hover:text-lightBlue-600" : "text-blueGray-700 hover:text-blueGray-500"}`}
                    to={path}
                  >
                    <i className={`fas ${index === 0 ? 'fa-tv' : index === 1 ? 'fa-tools' : index === 2 ? 'fa-table' : 'fa-map-marked'} mr-2 text-sm ${window.location.pathname === path ? "opacity-75" : "text-blueGray-300"}`}></i>
                    {path.split('/').pop().charAt(0).toUpperCase() + path.split('/').pop().slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Auth Layout Pages */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Auth Layout Pages</h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/auth/login">
                  <i className="fas fa-fingerprint text-blueGray-400 mr-2 text-sm"></i> Login
                </Link>
              </li>
              <li className="items-center">
                <Link className="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block" to="/auth/register">
                  <i className="fas fa-clipboard-list text-blueGray-300 mr-2 text-sm"></i> Register
                </Link>
              </li>
            </ul>
            {/* Documentation */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">Documentation</h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {[
                { href: "https://www.creative-tim.com/learning-lab/tailwind/react/colors/notus", label: "Styles", icon: "fas fa-paint-brush" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus", label: "CSS Components", icon: "fab fa-css3-alt" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/angular/overview/notus", label: "Angular", icon: "fab fa-angular" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/js/overview/notus", label: "Javascript", icon: "fab fa-js-square" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus", label: "NextJS", icon: "fab fa-react" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus", label: "React", icon: "fab fa-react" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/svelte/overview/notus", label: "Svelte", icon: "fas fa-link" },
                { href: "https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus", label: "VueJS", icon: "fab fa-vuejs" },
              ].map((doc, index) => (
                <li className="inline-flex" key={index}>
                  <a href={doc.href} target="_blank" rel="noopener noreferrer" className="text-blueGray-700 hover:text-blueGray-500 text-sm block mb-4 no-underline font-semibold">
                    <i className={`${doc.icon} mr-2 text-blueGray-300 text-base`}></i> {doc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  
  export default Sidebar;