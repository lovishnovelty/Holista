export interface InputInterface {
  placeholder?: string;
  secureTextEntry?: boolean;
  inputStyle?: any;
  value?: any;
  keyboardType?: any;
  returnKeyLabel?: any;
  textContentType?: any;
  returnType?:
    | 'default'
    | 'none'
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send'
    | 'previous'
    | 'google'
    | 'join'
    | 'route'
    | 'yahoo'
    | 'emergency-call'
    | undefined;
  error?: string | false | undefined;
  touched?: any;
  autoCapitalize?: any;
  autoFocus?: boolean;
  maxLength?: any;
  onChangeText: (val: any) => any;
  onKeyPress?: (val: any) => any;
  inputRef?: () => any;
  onSubmitEditing?: () => any;
}
