class Person {
  // Properties (fields)
  String? name;
  String? email;
  int? age;
 Person(String name,int age,String email ){
this.name = name;
this.age = age;
this.email = email;
  }

  void displayInfo() {
    print('Name: $name, Age: $age, Email: $email');
  }
}

void main() {
  // Create objects
  Person person1 = Person('Alice', 25, 'alice@example.com');
  person1.displayInfo();

  Person person2 = Person('Bob', 30, 'bob@example.com');
  person2.displayInfo();
}