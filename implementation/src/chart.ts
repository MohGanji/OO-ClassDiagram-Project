import EducationalTerm from "./educational-term";
import { Course } from "./course-agg/course";

export class Chart {
    public get selectiveCourseGroups(): Course[][] {
        return this._selectiveCourseGroups;
    }
    public set selectiveCourseGroups(value: Course[][]) {
        this._selectiveCourseGroups = value;
    }
    public get optionalCourseCount(): number {
        return this._optionalCourseCount;
    }
    public set optionalCourseCount(value: number) {
        this._optionalCourseCount = value;
    }
    public get optionalCourses(): Course[] {
        return this._optionalCourses;
    }
    public set optionalCourses(value: Course[]) {
        this._optionalCourses = value;
    }
    public get requiredCourses(): Course[] {
        return this._requiredCourses;
    }
    public set requiredCourses(value: Course[]) {
        this._requiredCourses = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get terms(): EducationalTerm[] {
        return this._terms;
    }
    public set terms(value: EducationalTerm[]) {
        this._terms = value;
    }
    constructor(
        private _id: string,
        private _terms: EducationalTerm[],
        private _requiredCourses: Course[],
        private _optionalCourses: Course[],
        private _optionalCourseCount: number,
        private _selectiveCourseGroups: Course[][],
    ) { }
}