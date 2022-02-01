class Person {
    age: number;
    name: string;
    nationality: string;
    passion: string;

    constructor(age: number, name: string, nationality: string, passion: string){
        this.age = age;
        this.name = name;
        this.nationality = nationality;
        this.passion = passion;
    }

    sayHello(){
        alert(`Hello! my name is ${this.name}, I am ${this.age} year old and I like so much the ${this.passion}`)
    }
}