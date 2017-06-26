const authCode = {
    url: 'authCode',
    method: 'get'
}
const register = {
    url: 'register',
    method: 'post'
}
const sendActiveEmail = {
    url: 'sendActiveEmail',
    method: 'post'
}
const checkUserName = {
    url: 'checkUserName',
    method: 'get'
}
const activeEmail = {
    url: 'activeEmail',
    method: 'post'
}
const uploadImage = {
    url: 'image/upload'
}
const postEntInfo = {
    url: 'postEntInfo',
    method: 'post'
}
const postBaseInfo = {
    url: '/user/update',
    method: 'post'
}
const updatePwd = {
    url: '/user/updatePwd',
    method: 'post'
}
const sendFoundPwdEmail = {
    url: 'sendFoundPwdEmail',
    method: 'post'
}
const reFoundPwd = {
    url: 'reFoundPwd',
    method: 'post'
}
const login = {
    url: 'login',
    method: 'post'
}
const logout = {
    url: 'logout',
    method: 'post'
}
const queryMoviesByName = {
    url: 'movie-manage/searchMovieByTitle',
    method: 'get'
}
const getMovieDetail = {
    url: 'movie-manage/movieDetail',
    method: 'get'
}
const getVodMovieInfo = {
    url: 'movie-manage/getVodMovieInfo',
    method: 'get'
}
const updateVodMovieInfo = {
    url: 'movie-manage/updateVodMovieInfo',
    method: 'post'
}
const bindMovie = {
    url: '/movie-manage/bindMovie',
    method: 'post'
}
const myMovieList = {
    url: '/movie-manage/list',
    method: 'get'
}
const cancleAudit = {
    url: '/movie-manage/cancleAudit',
    method: 'post'
}
const liftingAuth = {
    url: '/movie-manage/liftingAuth',
    method: 'post'
}
const deleteRecord = {
    url: '/movie-manage/delete',
    method: 'post'
}
const checkBind = {
    url: '/movie-manage/checkBind',
    method: 'get'
}


export {
    updatePwd,
    authCode,
    register,
    sendActiveEmail,
    checkUserName,
    activeEmail,
    uploadImage,
    postEntInfo,
    postBaseInfo,
    sendFoundPwdEmail,
    reFoundPwd,
    login,
    logout,
    queryMoviesByName,
    getMovieDetail,
    getVodMovieInfo,
    updateVodMovieInfo,
    bindMovie,
    myMovieList,
    cancleAudit,
    liftingAuth,
    deleteRecord,
    checkBind
}