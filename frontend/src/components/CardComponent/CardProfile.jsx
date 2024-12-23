import React from "react";

const CardProfile = () => {
  return (
    <>
      <div className="relative p-10 h-full bg-white w-full shadow-xl rounded-lg ">
        <div className="px-6">
          <div className=" justify-center">
            <div className="w-full px-4 flex justify-center">
              {/* image */}
              <div className="relative">
                <img
                  alt="tania andrew"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                  class="relative block justify-center h-96 cursor-pointer rounded-full object-cover object-center"
                />
              </div>
            </div>
      
          </div>
          <div className="text-center mt-12 text-3xl">
            <h3 className="text-3xl font-semibold leading-normal  text-blueGray-700 mb-2">
              Jenna Stones
            </h3>
            <div className="text-3xl leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              Los Angeles, California
            </div>
            <div className="mb-2 text-blueGray-600 mt-10">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              abc@gmail.com
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              0111111111
            </div>
          </div>
          {/* display entire information */}
          <div className="mt-10 py-10 border-t-4 border-lime-500 text-3xl text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 leading-relaxed text-blueGray-700">
                  An artist of considerable range, Jenna the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm, intimate
                  feel with a solid groove structure. An artist of considerable
                  range.
                </p>
                <a
                  href="#pablo"
                  className="font-normal text-lightBlue-500"
                  onClick={(e) => e.preventDefault()}
                >
                  Show more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardProfile;
