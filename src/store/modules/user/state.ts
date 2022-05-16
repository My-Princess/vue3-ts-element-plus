
import { getToken } from '@/utils/cookies'
import {UserState} from '../../interface/index'

export const state: UserState = {
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  permissions:[],
  email: ''
}
