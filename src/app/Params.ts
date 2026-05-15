import { GeneralService } from "./services/general.service";

export class Params{

    constructor(private generalServices: GeneralService) {}

    public static MAX_PROFILE_IMAGE_SIZE_IN_KB = 120;

    public static SERVICE_BASE_URL = 'http://localhost:8081';

    public static ACCOUNT_SERVICE_URL_SUFFIXS = {
        "CHECK_EMAIL_EXISTS": "/accounts/checkEmailExists",
        "REGISTER": "/accounts/register",
        "LOGIN": "/accounts/authenticate",
        "GET_TOTAL_ACCOUNTS": "/accounts/getTotalAccounts"
    }

    public static EXAM_SERVICE_URL_SUFFIXS = {
        "CREATE_TEST": "/exams/createTest",
        "CREATE_PRACTICE_PAPER": "/exams/createPracticePaper",
        "GET_TESTS": "/exams/getTests",
        "GET_PRACTICE_PAPERS": "/exams/getPracticePapers",
        "TOGGLE_EXAM_STATUS": "/exams/toggleExamStatus",
        "UPDATE_EXAM": "/exams/updateExam",
        "DELETE_EXAM": "/exams/deleteExam",
        "GET_EXAM": "/exams/getExam",
        "GET_SUBMISSION": "/exams/getSubmission",
        "GET_EXAM_SUBMISSIONS": "/exams/getExamSubmissions"
    }

    public static PageTitles = {
        "register": 'CrecomOnline Registration'
    }

    public static PageNames = {
        "login": "login",
        "home": "home",
        "dashboard": "dashboard",
        "courses": "courses",
        "tests": "tests",
        "practice_papers": "practice-papers",
        "viewresult": 'viewresult'
    }

}