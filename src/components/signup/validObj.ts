export interface validObjProps {
  [key: string]: {
    regexp: RegExp;
    isTest: boolean | null;
    value: string;
  };
}

const validObj: validObjProps = {
  email: {
    regexp:
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    isTest: false,
    value: "",
  },
  username: {
    regexp: /^[가-힣]{2,5}$/, // 이름 2 ~ 5글자
    isTest: false,
    value: "",
  },
  password: {
    regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, // 비밀번호 (최소 8자리 숫자,문자,특수문자 최소 1개),
    isTest: false,
    value: "",
  },
  passwordConfirm: {
    regexp: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/, // 비밀번호 (최소 8자리 숫자,문자,특수문자 최소 1개),
    isTest: false,
    value: "",
  },
  phone: {
    regexp: /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/, // 휴대폰 번호 양식
    isTest: false,
    value: "",
  },
  blog_id: {
    regexp: /^[a-z]+[a-z0-9]{5,19}$/, // 영문자로 시작하고 영문자 또는 숫자 6 ~ 20
    isTest: false,
    value: "",
  },
};

export default validObj;
