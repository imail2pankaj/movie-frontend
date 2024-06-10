"use client"
// import { getPersonTypes } from "@/actions/common.action"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"

const PeopleType = ({ types }) => {

  const [filteredTypes, setFilteredTypes] = useState(types)
  const [selected, setSelected] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.value, e.target.checked)
    if(e.target.checked) {
      setSelected(x => [...x, ...(types.filter(t => Number(t.id) === Number(e.target.value)))])
    } else {
      setSelected(x => x.filter(s => Number(s.id) !== Number(e.target.value)))
      // console.log(selected.filter(s => Number(s.id) !== Number(e.target.value)))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PlusCircle size={'sm'} className="me-2" />
          People Type {selected.length}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-0 rounded-none">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(e) => {
              const val = e.target.value.trim();
              const regex = new RegExp(val, "i")
              if (val.length) { setFilteredTypes(x => types.filter(type => type.title.match(regex))); } else {
                setFilteredTypes(types)
              }
            }}
            type="search"
            placeholder="Search people types..."
            className="w-full appearance-none outline-none border-none focus:outline-none rounded-none bg-background pl-8 shadow-none"
          />
        </div>
        <hr />
        <div className="p-1">
          {filteredTypes.length > 0 && <div className="grid gap-4 h-full max-h-60 p-2 overflow-y-auto">
            {
              filteredTypes.map(x => (
                <div key={`types-${x.id}`} className="flex items-center space-x-2">
                  <input type="checkbox" id={`types-${x.id}`} checked={selected.find(s => Number(s.id) === Number(x.id))} value={`${x.id}`} onChange={handleChange} />
                  <label
                    htmlFor={`types-${x.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {x.title}
                  </label>
                </div>
              ))
            }
          </div>}
          {selected.length > 0 && <Button onClick={() => setSelected(x => x.filter(s => false))} className="w-full" variant="outlined">Clear Filter</Button>}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PeopleType
