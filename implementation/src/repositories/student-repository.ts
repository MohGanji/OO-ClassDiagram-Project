import Student from '../student';

class StudentRepositorySingleton {
  save(student: Student) {
    this.students.push(student);
  }
  private students: Student[] = [];
  constructor() {}
  getAllStudents() {
    return this.students.slice();
  }
}

const StudentRepository = new StudentRepositorySingleton();
export default StudentRepository;
