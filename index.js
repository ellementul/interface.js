class Interface extends Set {
    isImplemented(object) {
        if(!object)
            return false

        if(typeof object !== "object")
            return false

        for (const methodName of this) {
            if(!object[methodName])
                return false

            if(typeof object[methodName] !== "function")
                return false
        }

        return true
    }
}
export { Interface }