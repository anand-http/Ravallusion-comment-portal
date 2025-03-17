'use client'

import React from 'react'
import { Combobox } from '../ui/combobox'

const profession = [
    {
        value: "engineer",
        label: "Engineer",
    },
    {
        value: "doctor",
        label: "Doctor",
    },
    {
        value: "teacher",
        label: "Teacher",
    },
    {
        value: "student",
        label: "Student",
    },
    {
        value: "ca",
        label: "CA",
    },
]

const CustomCombobox = ({ required, label, icon, id,value,onChange }) => {
    return (
        <div className='flex flex-col gap-[0.375rem]'>
            <label htmlFor={id} className="text-xs">
                {label}
                {required && <span className="text-red-700"> *</span>}
            </label>
            <div className='flex bg-[var(--input)] rounded-xl items-center px-2 h-full py-1 md:py-0'>
                <span>{icon}</span>
                <Combobox profession={profession} value={value} onChange={onChange} />
            </div>
        </div>
    )
}

export default CustomCombobox