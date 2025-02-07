import react from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'
import {GrEdit as EditIcon} from 'react-icons/gr'

export function EditTodo ({ title, id, handleUpdate }) {
    const [updatedTitle, setUpdateTitle] = useState(title);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <EditIcon className="iconHover"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogDescription>
                        Make changes to this todo
                    </DialogDescription>
                </DialogHeader>
                <DialogTrigger asChild>
                    <form className='flex flex-col gap-2' action={handleUpdate}>
                        <input type="hidden" value={id} name="id" />
                        <Label htmlFor="title">Previous Todo</Label>
                        <Input
                            id="title"
                            name="title"
                            value={updatedTitle}
                            onChange={(e) => setUpdateTitle(e.target.value)}
                            className="col-span-3"
                        />
                        <DialogFooter>
                            <Button>Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogTrigger>
            </DialogContent>
        </Dialog>
    )
};