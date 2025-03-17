"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export function Combobox({ profession, value, onChange }) {
    const [open, setOpen] = React.useState(false)
    // const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>

            <PopoverTrigger asChild >
                <Button
                    variant="none"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-[var(--input)] font-normal rounded-xl"
                >
                    {value
                        ? profession.find((profession) => profession.value === value)?.label
                        : "Select profession..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent
                className=" min-w-[var(--radix-popover-trigger-width)] w-full p-0 "
            >
                <Command >
                    <CommandInput placeholder="Search prfession..." />
                    <CommandList>
                        <CommandEmpty>No profession found.</CommandEmpty>
                        <CommandGroup>
                            {profession.map((profession) => (
                                <CommandItem
                                    key={profession.value}
                                    value={profession.value}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue); 
                                        setOpen(false);
                                    }}
                                    className={cn(
                                        "px-2 py-1 cursor-pointer hover:bg-gray-200",
                                        value === profession.value
                                            ? "bg-gray-300 font-medium"
                                            : "bg-transparent"
                                    )}
                                >
                                    {profession.label}
                                    <Check
                                        className={cn(
                                            "ml-auto transition-opacity",
                                            value === profession.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>



    )
}
