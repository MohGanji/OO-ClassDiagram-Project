import CourseAkhzShode from './course-akhz-shode-agg/course-akhz-shode';
import Student from './student';
import EducationalTerm from './educational-term';

export default interface EntekhabVahedTerm {}

class EntekhabVahedTermImpl implements EntekhabVahedTerm {
  courseAkhzShode: CourseAkhzShode[] = [];
  constructor(private minVahed: number, private maxVahed: number, private term: EducationalTerm) {}

  addCourse(course: CourseAkhzShode) {
    this.courseAkhzShode.push(course);
  }
}

export const EntekhabVahedTermFactory = {
  createEntekhabVahedTerm(student: Student, term: EducationalTerm) {
    const { enteranceTerm, avgGrade } = student;
    const maxVahed = avgGrade < 12 ? 14 : avgGrade > 17 ? 24 : 20;
    const minVahed = term.year - enteranceTerm.year >= 4 ? 0 : 12;
    const entekhabVahedTerm = new EntekhabVahedTermImpl(minVahed, maxVahed, term);
    student.addEntekhabVahedTerm(entekhabVahedTerm);
  }
};
