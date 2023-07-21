import { ApplicationError } from "@/protocols"

export function cannotListHotelsError(): ApplicationError{
    name: "CannotListHotelsError",
    message: "Cannot list hotels!"
}