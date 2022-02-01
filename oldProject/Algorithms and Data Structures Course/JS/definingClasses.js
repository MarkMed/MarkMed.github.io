"use strict";
class Person {
    constructor(age, name, nationality, passion) {
        this.age = age;
        this.name = name;
        this.nationality = nationality;
        this.passion = passion;
    }
    sayHello() {
        alert(`Hello! my name is ${this.name}, I am ${this.age} year old and I like so much the ${this.passion}`);
    }
}
