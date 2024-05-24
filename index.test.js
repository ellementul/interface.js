import test from 'ava'

import { Interface } from './index.js'

const dogInterface = new Interface(["getPaw", "getLeg"])
const humanInterface = new Interface(["getHand", "getLeg"])

class Dog {
    getPaw(){}
    getLeg(){}
}

function HumanFactory() {
    this.getLeg = () => {}
    this.getHand = () => {}
}

test("class", t => {
    const dog = new Dog

    t.true(dogInterface.isImplemented(dog))
    t.false(humanInterface.isImplemented(dog))
})

test("factory", t => {
    const human = new HumanFactory

    t.true(humanInterface.isImplemented(human))
    t.false(dogInterface.isImplemented(human))    
})


test("generateAbstractClass", t => {
    const Person = humanInterface.generateAbstractClass()
    const person = new Person

    t.true(humanInterface.isImplemented(person))
    t.false(dogInterface.isImplemented(person))
    
    t.throws(() => person.getLeg())
})
