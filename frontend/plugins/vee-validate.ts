import { extend } from 'vee-validate'
import {
  alpha_spaces as alphaSpaces,
  email,
  required,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field cannot be left blank.',
})
extend('email', {
  ...email,
  message: 'Please enter a valid email address.',
})
extend('alpha_spaces', {
  ...alphaSpaces,
  message: 'Please use alpha [A-z] characters only.',
})
