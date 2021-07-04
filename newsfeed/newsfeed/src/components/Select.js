import React from 'react'

import { Listbox } from '@headlessui/react'
const Select = ({ispublic, selectedOption, setSelectedOption}) => {

    return (
        <div>
                    <Listbox  value={selectedOption} onChange={setSelectedOption}>
                    <div className="relative">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left rounded-lg cursor-default bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">  
                    <span className="block truncate"> {selectedOption.name}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                   
            </span>
           </Listbox.Button>
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        
                        {ispublic.map((op) => (
                        <Listbox.Option
                            key={op.id}
                            value={op}
                            disabled={op.unavailable}
                            className="px-4 py-2 bg-white rounded-lg hover:bg-blue-200" >
                            {op.name}
                        </Listbox.Option>
                        ))}
                    </Listbox.Options>
                   </div>
                    </Listbox>
        </div>
    )
}

export default Select
