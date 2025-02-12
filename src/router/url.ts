import { envConfig, MODE_APP_DEFINED } from "@/env.config";


export const MODE_APP: any = envConfig().MODE_APP;


// const BASE_URL: String = "https://api.djoumaf.net/api"
const BASE_URL: string =  MODE_APP_DEFINED("http://localhost:8080/api","https://api.djoumaf.net/api") 
const BASE_URL_PAYMENT: string = MODE_APP_DEFINED("http://localhost:3000/api","https://api-payment.djoumaf.net/api") 
export const BASE_URL_APP: string = MODE_APP !== 'dev' ? 'https://api.djoumaf.net' : 'http://localhost:8080'
export const URL = {

    // Authentication
    AUTH_REGISTER : `${BASE_URL}/auth/register`,
    AUTH_LOGIN : `${BASE_URL}/auth/login`,
    AUTH_VERIFY_EMAIL: `${BASE_URL}/auth/password/verify-email`,
    AUTH_CHANGE_PASSWORD: `${BASE_URL}/auth/password/change`,
    AUTH_IS_OWNER_EMAIL: `${BASE_URL}/auth/verify/is_owner_email`,

    // Parametre
    PARAMETER_LIST: `${BASE_URL}/parameter`,

    // Field Activity
    FIELD_ACTIVITY_NUMBER_DP_JOB_LIST: `${BASE_URL}/number_activities_depending_job`, 

    
    // Activitiy log
    ACTIVITY_LOG_INDEX: `${BASE_URL}/activity_log`,

    // USER
    USER_INDEX: `${BASE_URL}/user`,

    // Profile
    PROFILE_INDEX: `${BASE_URL}/profile`,
    PROFILE_SHOW:  `${BASE_URL}/profile/show`,
    PROFILE_CREATED: `${BASE_URL}/profile/create`,
    PROFILE_UPDATE:  `${BASE_URL}/profile/update`,
    PROFILE_EDIT:  `${BASE_URL}/profile/edit`,
    PROFILE_SEARCH:  `${BASE_URL}/profile/search`,
    PROFILE_DESCRIPTION_EDIT: `${BASE_URL}/profile/description/edit`,
    PROFILE_SHOW_SLUG: `${BASE_URL}/profile/show_slug`,

    // CV
    PROFILE_INDEX_CV: `${BASE_URL}/profile/index/cv`,
    PROFILE_CREATE_CV: `${BASE_URL}/profile/create/cv`,
    PROFILE_DELETE_CV: `${BASE_URL}/profile/delete/cv`,

    // CANDIDACY
    PROFILE_CANDIDACY_SEE: `${BASE_URL}/profile/candidacy/see`,
    PROFILE_CANDIDACY_STATE: `${BASE_URL}/profile/candidacy/state`,

    // Profile Experience
    PROFILE_EXPERIENCE_INDEX: `${BASE_URL}/profile/experience`,
    PROFILE_EXPERIENCE_SHOW: `${BASE_URL}/profile/experience/show`,
    PROFILE_EXPERIENCE_CREATED: `${BASE_URL}/profile/experience/create`,
    PROFILE_EXPERIENCE_UPDATE: `${BASE_URL}/profile/experience/update`,
    PROFILE_EXPERIENCE_DELETE: `${BASE_URL}/profile/experience/delete`,

    // Profile Course
    PROFILE_COURSE_INDEX: `${BASE_URL}/profile/course`,
    PROFILE_COURSE_CREATED: `${BASE_URL}/profile/course/create`,
    PROFILE_COURSE_UPDATE: `${BASE_URL}/profile/course/update`,
    PROFILE_COURSE_DELETE: `${BASE_URL}/profile/course/delete`,

    // Profile Mail
    TALK_MAIL_INDEX:  `${BASE_URL}/talk/mails/dj`,
    
    // Jobs
    JOBS_LIST: `${BASE_URL}/job`,
    JOBS_DETAIL: `${BASE_URL}/job/show`,
    JOBS_CREATE: `${BASE_URL}/job/create`,
    JOBS_UPDATE: `${BASE_URL}/job/update`,
    JOBS_DELETE: `${BASE_URL}/job/delete`,

    // Jobs Apply
    JOB_APPLY_SHOW: `${BASE_URL}/job/apply/show`,
    JOB_APPLY_CREATE: `${BASE_URL}/job/apply/create`,

    // Medias Profile
    MEDIA_PROFILE_SHOW: `${BASE_URL}/media/show`,
    MEDIA_PROFILE_UPDATE:  `${BASE_URL}/media/profile/update`,

    // Cerle
    CERCLE_FOLLOW_USER: `${BASE_URL}/cercle/follow`,
    CERCLE_FOLLOW_COUNT_USER: `${BASE_URL}/cercle/follow/count`,
    CERCLE_IS_FOLLOW_USER: `${BASE_URL}/cercle/is_follow`,
    CERCLE_LIST: `${BASE_URL}/cercle/list`,
    CERCLE_ALL_PROFILE: `${BASE_URL}/cercle/all_profile`,
    CERCLE_ALL_PROFILE_COMPAGNY: `${BASE_URL}/cercle/all_profile_compagny`,

    // Post
    POST_INDEX: `${BASE_URL}/post`,
    POST_SHOW: `${BASE_URL}/post/show`,
    POST_CREATE: `${BASE_URL}/post/create`,
    POST_DELETE: `${BASE_URL}/post/delete`,

    // Post Actions
    POST_ACTION_LIKE: `${BASE_URL}/post/like`,
    POST_ACTION_DJOUMER: `${BASE_URL}/post/djoumer`,

    POST_COMMENTS: `${BASE_URL}/post/comments`,
    POST_COMMENTS_CREATED: `${BASE_URL}/post/comment/create`,

    // Search
    SEARCH: `${BASE_URL}/search`,


    //Chat Message
    CHAT_MESSAGE_INDEX: `${BASE_URL}/messages`,
    CHAT_MESSAGE_CREATE: `${BASE_URL}/messages`,
    CHAT_GROUP_CREATE: `${BASE_URL}/chat/group`,
    CHAT_MESSAGE_SHOW: `${BASE_URL}/messages/show`,


    // Notification
    NOTIFICATION_INDEX: `${BASE_URL}/notifications`,
    NOTIFICATION_CREATE: `${BASE_URL}/notification/create`,
    NOTIFICATION_UPDATE_DISTRIBUTION_ALL: `${BASE_URL}/notification/update/distribution/all`,
    NOTIFICATION_UPDATE_DISTRIBUTION: `${BASE_URL}/notification/update/distribution`,

    // PAYMENT
    PAYMENT_CV: `${BASE_URL_PAYMENT}/payment/create`,

    

}
