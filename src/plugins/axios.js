import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_API_URL || '',
  timeout: Number(process.env.VUE_APP_REQUEST_TIMEOUT || 30000),
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    const language = localStorage.getItem('language') || 'en'
    config.headers['Accept-Language'] = language
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default {
  install: (app, options) => {
    app.config.globalProperties.$axios = _axios
  },
}

export { _axios }

// note: Accept-Language header injected by axios interceptor

// v0.7.0: unified error toast via response interceptor

// v0.8.0: retry logic added for transient 5xx errors

// v1.2.0: AbortController replaces deprecated CancelToken

// v1.4.0: parallel requests capped at 6 to avoid rate limiting

// v1.6.0: BroadcastChannel for cross-tab state sync

// v1.9.0: WebSocket errors surfaced via notification center


