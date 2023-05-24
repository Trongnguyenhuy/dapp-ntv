import React from "react";
const Index = () => {
    return (
        <div>
            <div className="py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
                <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                    <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                        <div className="w-full flex justify-start text-gray-600 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width={52} height={52} viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                            </svg>
                        </div>
                        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Enter Billing Details</h1>
                        <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Owner Name
                        </label>
                        <input id="name" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="James" />
                        <label htmlFor="email2" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Card Number
                        </label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute text-gray-600 flex items-center px-4 border-r h-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-credit-card" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={3} y={5} width={18} height={14} rx={3} />
                                    <line x1={3} y1={10} x2={21} y2={10} />
                                    <line x1={7} y1={15} x2="7.01" y2={15} />
                                    <line x1={11} y1={15} x2={13} y2={15} />
                                </svg>
                            </div>
                            <input id="email2" className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-16 text-sm border-gray-300 rounded border" placeholder="XXXX - XXXX - XXXX - XXXX" />
                        </div>
                        <label htmlFor="expiry" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            Expiry Date
                        </label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-calendar-event" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <rect x={4} y={5} width={16} height={16} rx={2} />
                                    <line x1={16} y1={3} x2={16} y2={7} />
                                    <line x1={8} y1={3} x2={8} y2={7} />
                                    <line x1={4} y1={11} x2={20} y2={11} />
                                    <rect x={8} y={15} width={2} height={2} />
                                </svg>
                            </div>
                            <input id="expiry" className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
                        </div>
                        <label htmlFor="cvc" className="text-gray-800 text-sm font-bold leading-tight tracking-normal">
                            CVC
                        </label>
                        <div className="relative mb-5 mt-2">
                            <div className="absolute right-0 text-gray-600 flex items-center pr-3 h-full cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-info-circle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={9} />
                                    <line x1={12} y1={8} x2="12.01" y2={8} />
                                    <polyline points="11 12 12 12 12 16 13 16" />
                                </svg>
                            </div>
                            <input id="cvc" className="mb-8 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="MM/YY" />
                        </div>
                        <div className="flex items-center justify-start w-full">
                            <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">Submit</button>
                            <button className="focus:outline-none ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="modalHandler()">
                                Cancel
                            </button>
                        </div>
                        <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out" onclick="modalHandler()">
                            <svg xmlns="http://www.w3.org/2000/svg" aria-label="Close" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center py-12" id="button">
                <button className="focus:outline-none mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm" onclick="modalHandler(true)">
                    Open Modal
                </button>
            </div>
        </div>
    );
};
export default Index;


<div class="flex justify-center h-screen items-center bg-gray-200 antialiased">
      <div class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl">
        <div
          class="flex flex-row justify-between p-6 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <p class="font-semibold text-gray-800">Add a step</p>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <div class="flex flex-col px-6 py-5 bg-gray-50">
          <p class="mb-2 font-semibold text-gray-700">Bots Message</p>
          <textarea
            type="text"
            name=""
            placeholder="Type message..."
            class="p-5 mb-5 bg-white border border-gray-200 rounded shadow-sm h-36"
            id=""
          ></textarea>
          <div class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5">
            <div class="w-full sm:w-1/2">
              <p class="mb-2 font-semibold text-gray-700">Customer Response</p>
              <select
                type="text"
                name=""
                class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                id=""
              >
                <option value="0">Add service</option>
              </select>
            </div>
            <div class="w-full sm:w-1/2 mt-2 sm:mt-0">
              <p class="mb-2 font-semibold text-gray-700">Next step</p>
              <select
                type="text"
                name=""
                class="w-full p-5 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                id=""
              >
                <option value="0">Book Appointment</option>
              </select>
            </div>
          </div>
          <hr />

          <div class="flex items-center mt-5 mb-3 space-x-4">
            <input
              class="inline-flex rounded-full"
              type="checkbox"
              id="check1"
              name="check1"
            />
            <label class="inline-flex font-semibold text-gray-400" for="check1">
              Add a crew</label
            ><br />
            <input
              class="inline-flex"
              type="checkbox"
              id="check2"
              name="check2"
                   checked
            />
            <label class="inline-flex font-semibold text-blue-500" for="check2">
              Add a specific agent</label
            ><br />
          </div>
          <div
            class="flex flex-row items-center justify-between p-5 bg-white border border-gray-200 rounded shadow-sm"
          >
            <div class="flex flex-row items-center">
              <img
                class="w-10 h-10 mr-3 rounded-full"
                src="https://randomuser.me/api/portraits/lego/7.jpg"
                alt=""
              />
              <div class="flex flex-col">
                <p class="font-semibold text-gray-800">Xu Lin Bashir</p>
                <p class="text-gray-400">table.co</p>
              </div>
            </div>
            <h1 class="font-semibold text-red-400">Remove</h1>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <p class="font-semibold text-gray-600">Cancel</p>
          <button class="px-4 py-2 text-white font-semibold bg-blue-500 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
