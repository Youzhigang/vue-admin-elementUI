import Cookies from 'js-cookie'

export const BasePath = 'http://localhost:10715/CoreAPI/'

export const ValidateApi = 'http://localhost:10715/CoreAPI/User/validate?tokenid='+ Cookies.get('UserTokenID')





