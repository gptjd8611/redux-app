import axios from 'axios';
//import { getToken, isTokenExpired, tokenRefresh } from '../stores/token.js';

//엑시오스 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://localhost:3001/',  // 원하는 기본 URL로 설정
    timeout: 5000,  // 요청 타임아웃 설정
});

//토큰 저장 [localstorage]
const setToken = (token) => {
    localStorage.setItem('accessToken', token);
};
setToken('amy9798');
// 토큰을 localStorage에서 가져오는 함수
const getToken = () => {
    return localStorage.getItem('accessToken');
}

// 요청 인터셉터 설정
instance.interceptors.request.use(
    (config) => {//요청 구성(config)을 인자로 받는 함수
        // 요청이 전달되기 전에 작업 수행
        const accessToken = getToken();
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = 'application/json';
        }
        alert('요청 성공~!! 토큰:'+ accessToken );
        console.log(config)
        return config;
    },
    (error) => {// 요청 오류가 있는 작업 수행: getToken이 실패하는 경우
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
// 401 에러와 같이 공통적인 에러 처리를 위해 각 컴포넌트마다 에러 처리 코드를 작성하는 것은 비효율적입
instance.interceptors.response.use(
    (response) => {
        // 성공적인 응답 처리
        // [활용]
         // 1. status-code가 정상적이어도 내용상의 이유로 에러처리가 필요한 경우
        //  2. 민감정보 또는 데이터에 대한 가공 작업
        if (response.status === 404) {
            console.log('404 페이지로 넘어가야 함!');
        }
        return response;
    },
    async (error) => {
        // 실패한 응답 처리
        if (error.response?.status === 401) {   // 401 상태 코드(인증 오류)가 발생한 경우 처리
            // 만료된 토큰인지 확인하고, 만료된 경우 토큰을 갱신합니다.
            //if (isTokenExpired()) await tokenRefresh();
            // const accessToken = getToken();
            //갱신된 토큰을 사용하여 오류가 발생한 요청의 'Content-Type' 헤더를 설정합니다.
            // error.config.headers = {
            //     'Content-Type': 'application/json',
            //     Authorization: `Bearer ${accessToken}`,
            // };
            // 오류가 발생한 요청을 재시도하고, 재시도한 결과를 반환합니다.
            // const response = await axios.request(error.config);
            //return response;
        }
        // 오류가 발생하면 프로미스를 오류와 함께 거부합니다.
        return Promise.reject(error);
    }
);




// 응답 인터셉터 설정
// instance.interceptors.response.use(
//     (response) => {
//         // 성공적인 응답 처리
//         return response;
//         // [활용]
//         //  1. status-code가 정상적이어도 내용상의 이유로 에러처리가 필요한 경우
//         //  2. 민감정보 또는 데이터에 대한 가공 작업
//     },
//     async (error) => {
//         // 실패한 응답 처리
//         if (error.response?.status === 401) {
//             // 401 상태 코드(인증 오류)가 발생한 경우 처리
//             // 토큰 갱신 등의 로직을 수행 후, 갱신된 토큰을 localStorage에 저장
//             // 예시: await tokenRefresh();
//             //const newAccessToken = getNewToken();
//             //setToken(newAccessToken);
//
//             // 갱신된 토큰을 사용하여 오류가 발생한 요청을 재시도
//             // const newAccessToken = getToken();
//             error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//             const response = await axios.request(error.config);
//             return response;
//         }
//         return Promise.reject(error);
//     }
// );
const api = {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    //다른 HTTP 메소드들에 대한 함수들도 필요에 따라 추가할 수 있습니다.

};
export default api;






