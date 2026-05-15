
// export enum AnswerTypes { "options", "boolean", "oneword" }

export interface OptionsType {

    "options": { 'value': string }[],
    "correct_answer": number,

}

export interface BooleanType {

    "correct_answer": boolean,

}

export interface OnewordType {

    "correct_answer": string,

}

export interface Question {

    "body": string,
    "marks": {
        "positive": number,
        "negative": number
    },
    "answer_type": "options" | "boolean" | "oneword",
    "images": { 'src' : string, 'label' : string } [],
    "answer_content": OptionsType | BooleanType | OnewordType | any,
    
}

export interface Test {

    "_id": string,
    "title": string,
    'pass_marks': number,
    "description": string,
    "time": number,
    "marks": number,
    "is_without_time": boolean,
    "isActive": boolean,
    "negativeMarking": boolean,
    "details": {
        "added_by": string,
        "added_on": string
    },
    "questions": Question[]

}

export interface PracticePaper {

    "_id": string,
    "title": string,
    'pass_marks': number,
    "description": string,
    "time": number,
    "marks": number,
    "is_without_time": boolean,
    "isActive": boolean,
    "negativeMarking": boolean,
    "details": {
        "added_by": string,
        "added_on": string
    },
    "questions": Question[]

}

class TestsParams {





}