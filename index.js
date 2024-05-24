class AbstractMethodError extends Error {
    constructor(methodName) {
        super(`This "${methodName}" method is abstract! It has to define in your child's class!`)
    }
}

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

    createAbstractMethod(context, methodName) {
        const abstractMethod = function(){ throw new AbstractMethodError(methodName) }
        return abstractMethod.bind(context)
    }

    generateAbstractClass() {
        const abstractClass = class {}

        for (const methodName of this) {
            abstractClass.prototype[methodName] = this.createAbstractMethod(abstractClass.prototype, methodName)
        }

        abstractClass.is = object => this.isImplemented(object)

        return abstractClass
    }
}
export { Interface }