String sayHello(String startHello, String name){
  return "$startHello I am $name";
}

String startWith(int indX){
  List<String> hellos = ["Hello!", "Hi!", "Hello there!", "Howdy!", "Greetings!"];
  return hellos[indX];
}

int resolveID(int id){
  return id - 1561;
}

String getPersonName(int personID, List<String> peopleList){
  return peopleList[resolveID(personID)];
  
}

void main() {
  List<String> people = ["Marquitos", "Lousiana", "Adrian", "Bruno"];

  print(sayHello(startWith(2), getPersonName(1561, people)));
}