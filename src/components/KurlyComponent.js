import React, { Component } from 'react';
import seach from '../img/ico_search.svg'  /* 지우기 */
import Postcode from './Postcode';

class KurlyComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            아이디: '',
            아이디ok: false,
            아이디중복확인: false,
            비밀번호: '',
            비밀번호1ok: false,
            비밀번호2ok: false,
            비밀번호3ok: false,
            비밀번호확인:'',
            이름: '',
            이메일: '',
            이메일ok: false,
            휴대폰: '',
            휴대폰ok: false,
            isPhoneOkOpen:false,
            휴대폰인증:'',
            인증키:'123456',
            disalbled1:false,
            disalbled2:false,
            onClickPhoneOkEvent:false,
            isTimerOpen:true,//카운트
            setId1:0,
            isPhoneOkClass:false,

            minutes:2,
            secondes:59,
            counterStart:false,


            
            주소1: '',
            주소2: '',
            주소: '',
            성별: '선택안함',

            생년: '',
            생월: '',
            생일: '',
            생년월일: '',

            추가입력사항: '', //라디오버튼 단일선택
            isAddInputBoxShow:false,
            추가입력상자:'',
            addInputPlaceHolder:'',


            약관동의:[], //체크박스 다중선택 저장 객체 배열
            isAddressOn: false, //주소검색을 클릭하면 true로 변환하면 주소검색창이 열리게 만듬

            showId: false, //아이디 가이드텍스트 show 기본 안보이게 
            isClassId: '',//클래스를 검정색: true(초록색):false(빨간색)

            showPw: false, //비밀번호 가이드텍스트 show 기본 안보이게 
            isClassPw1: '',
            isClassPw2: '',
            isClassPw3: '',

            showPwRe:false,
            isClassPwRe:'',
            
            isModalOpen : false, //모달창 show & hide
            isModalOpen1 : false, //모달창 show & hide
            modalText:'', //아이디/이메일 가이드 텍스트
            isClassEmail:'',

            isPhoneClass:false, //휴대폰 버튼 클래스

            //생년월일 가이드 텍스트
            showBirthDay:false, //show(true) hide(false)
            isClassBirthDay:'',//'', true, false
            birthDayGuideText:''//가이드 텍스트 내용들
        }
    }

    
    onMouseDown=(e) =>{
        this.setState({showId: true});
    }
    //입력값의 입력 제한(정규표현식)
    //숫자 6자이상 16자 미만 {6, 16}
    //영문 필수 +
    //숫자선택 *
    //공백사용불가 [^\s]
    onChangeId=(value)=>{
        this.setState({아이디: value});
        this.inputIdtext=value; //전역변수

    
        const regExp = /(?=.*[A-Za-z])+(?=.*[0-9])*[^\s][A-Za-z0-9]{6,}/g;
        if(value===''){
          this.setState({
            isClassId: '',
            아이디ok: false
          });      
        }
        else{
            if(regExp.test(value)){
              this.setState({
                isClassId: true,
                아이디ok: true
              });
            }
            else{
              this.setState({
                isClassId: false,
                아이디ok: false
              });
            }
        }
    
      }

    //아이디 중복확인 반복처리문
    //1.아이디에 입력값 === 저장된 아이디 비교
    //2.로컬스토레이지(데이터베이스) 데이터 전체 추출
    //3. 전체 추출에서 아이디만 추출
    //4. 반복처리 비교하고 같은 아이디가 있다면 true로 반환
    //5. 결과가 true이면 등록된 아이디 입니다.
    //6. 결과가 false이면 사용가능한 아이디 입니다.

   
    //중복확인 아이디 클릭 모달 이벤트
    onClickIdModalEvent=(e)=>{
        e.preventDefault();
        this.setState({isModalOpen : true, 아이디중복확인: true});
        if(this.state.아이디===''){
            this.setState({modalText:'아이디를 입력해 주세요', 아이디ok:false,})
        }else{
            if(this.state.isClassId===false){
                this.setState({modalText:'아이디는 6자 이상의 영문 혹은 영문과 숫자 조합만 가능합니다.', 아이디ok:false,});
            }else{
               let imsiDb=[];
               for(let i=0; i<localStorage.length; i++){
                imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
               }
               //console.log('현재 입력된 아이디', this.inputIdtext);
               //console.log('데이터 확인',imsiDb )

               let result=imsiDb.map((item) => item.아이디===this.inputIdtext);
               if(result.includes(true)){
                    this.setState({
                        modalText:'중복된 아이디 입니다.',
                        아이디ok:false
                    });
               }else{
                this.setState({
                    modalText:'사용가능한 아이디 입니다.',
                    아이디ok:true
                });
               }
            }
        }
    }
    onClickModalClose=(e)=>{
        e.preventDefault();
        this.setState({isModalOpen:false});
    }
    onClickModalClose1=(e)=>{
        e.preventDefault();
        this.setState({isModalOpen1:false});
        
      if(this.state.휴대폰인증===this.state.인증키){
            this.setState({
                isPhoneOkOpen:false, 
                isTimerOpen:true,
                isPhoneOkClass:false
            });
        }else{
            this.setState({isPhoneOkOpen:true,isPhoneOkClass:true});
        } 
          
    }
    

    onFocusPw=(e) =>{
        this.setState({showPw: true});
    }
    //10자 이상
    //영문/숫자/특수문자
    //연속 같은 숫자 사용불가 /(.)\1\1/
    onChangePw=(value) => {
        this.setState({비밀번호:value})
        const regExp1= /.{10,}/;
        const regExp2= /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{10,}/;
        const regExp3= /(.)\1\1/;

        if(value===''){
            this.setState({isClassPw1:'', 비밀번호1ok:false});
        }else{
            if(regExp1.test(value)){
                this.setState({isClassPw1:true,  비밀번호1ok:true});
            }else{
                this.setState({isClassPw1:false,  비밀번호1ok:false});
            }
        }
        if(value===''){
            this.setState({isClassPw2:'',  비밀번호2ok:false});
        }else{
            if(regExp2.test(value)){
                this.setState({isClassPw2:true,  비밀번호2ok:true});
            }else{
                this.setState({isClassPw2:false,  비밀번호1ok:false});
            }
        }
        if(value===''){
            this.setState({isClassPw3:'',  비밀번호3ok:false});
        }else{
            if(regExp3.test(value)===false){
                this.setState({isClassPw3:true,  비밀번호3ok:true});
            }else{
                this.setState({isClassPw3:false,  비밀번호3ok:false});
            }
        }
    }
    onFocusPwRe=()=>{
        this.setState({showPwRe:true})
    }
    onChangePwRe=(value) => {
        this.setState({비밀번호확인:value});
        //입력된 비밀번호와 ===비밀번호 확인 비교
        if(value===''){
            this.setState({isClassPwRe:''});
        }else{
            if(this.state.비밀번호===value){
                this.setState({isClassPwRe: true})
            }else{
                this.setState({isClassPwRe: false})
            }
        }
    }
    onChangeName=(value) => {
       //영문, 한글, 공백만 입력하고 나머지는 모두 자동 삭제
       //문자열.replace(정규표현식,'') 
        this.setState({이름:value.replace(/[^A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s]/g, '')});
    }
    
    onChangeEmail=(value) => {
        this.emailValue=value; // 전역변수
        this.inputEmailtext=value; //현재입력 이메일 전역변수
        this.setState({이메일:value});
        //cjh7652@hanmail.net
        //cjhwww@yahoo.co.kr
        //cjh_hyun@dkse12_.co.kr
        //222cjh-hyun@naver.com
        //jee.hyun@gmail.com

        //[A-Za-z0-9] - 대소문자숫자
        //\w - 대소문자숫자
        //+ - 1개이상(무조건1개이상 있어야 함)
        //* - 0개이상(있어도 되고 없어도 되는것)
        //{min, max} {6,}-6자 이상 {6,10}-6자 이상 10자 미만
        //^ 밖에 있는 것은 시작
        //[^] 부정문
        //$ 마지막에 있는 것은 종료
        const regExp=/^[A-Za-z0-9-_]+(.[A-Za-z0-9-_])*@[A-Za-z0-9-_]+(.[A-Za-z])*.[A-Za-z]{2,3}$/;

        if(value===''){
            this.setState({isClassEmail:'', 이메일ok:false});
        }else{
            if(regExp.test(value)){
                this.setState({isClassEmail:true, 이메일ok:true})
            }else{
                this.setState({isClassEmail:false, 이메일ok:false})
            }
        }

    }
    //중복확인 이메일 클릭 모달 이벤트
    onClickEmailModalEvent=(e)=>{
        e.preventDefault();
        this.setState({isModalOpen : true});
        if(this.state.이메일===''){
            this.setState({modalText:'이메일을 입력해 주세요', 이메일ok:false})
        }else{
            if(this.state.isClassEmail===false){
                this.setState({modalText:'잘못된 이메일 형식입니다.', 이메일ok:false });
            }else{
                let imsiDb=[];
               for(let i=0; i<localStorage.length; i++){
                imsiDb.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
               }
               //console.log('현재 입력된 이메일', this.inputEmailtext);
               //console.log('데이터 확인',imsiDb )

               let result=imsiDb.map((item) => item.이메일===this.inputEmailtext);
               if(result.includes(true)){
                    this.setState({
                        modalText:'중복된 이메일 입니다.',
                        이메일ok:false
                    });
               }else{
                this.setState({
                    modalText:'사용가능한 이메일 입니다.',
                    이메일ok:true
                });
               }
            }
        }
    }
    onChangePhone=(value) => {
        this.phoneValue=value;
        let result=value.replace(/[^0-9]/g,'');
        this.setState({휴대폰:result});

        //휴대폰 번호가 10이상이면 우측에 인증번호받기 버튼이 활성화
        if(this.state.휴대폰.length >=10){
            this.setState({isPhoneClass:true});
        }else{
            this.setState({isPhoneClass:false});
        }
    }
    //휴대폰 인증번호 받기 클릭 이벤트
   
    onChangePhone1=(value) =>{
        this.setState({휴대폰인증:value});
        if(this.state.휴대폰인증===this.state.인증키){
           this.setState({
            isPhoneOkOpen:false,
            disabled2: true,
           })
        }else{
            this.setState({
                isPhoneOkOpen:true,
                
            })
        }
    }

    counterTimer(){
        
        let setId2 = setInterval(() =>{
            this.setState({secondes: this.state.secondes-1})
            if(this.state.secondes <= 0){
                this.setState({
                    secondes:59,
                    minutes: this.state.minutes-1 //1분감소
                });//1분경과
                if(this.state.minutes<=0){
                    clearInterval(setId2);
                    this.setState({
                        secondes:0,
                        minutes:0
                    })
                }
            }
        },1000);
        //this.setState({setId1: setId2})
       
    }
    //인증번호 확인 버튼 클릭 이벤트
    onClickPhoneOkEvent=(e)=>{
        e.preventDefault();
        if(this.state.휴대폰인증===this.state.인증키){
            this.setState({
                isModalOpen1: true,
                modalText: '인증번호가 확인되었습니다.',
                disalbled2:true,
                isTimerOpen:false,
                isPhoneOkOpen:true,
            })
            clearInterval(this.state.setId1)
        }else{
            this.setState({
                isModalOpen1: true,
                modalText: '인증번호 확인하세요',
                disalbled2:false,
                isTimerOpen:true,
                isPhoneOkOpen:true
            })
        }
    }

    //생명주기 렌더링 이후에 동작하는 메서드
   componentDidMount(){
       this.state.counterStart && this.counterTimer()
   }
    

    onClickPhoneEvent=(e)=>{
        e.preventDefault();
        //입력이 완료되고 난후 인증번호 버튼을 클릭해서 실행

        //휴대폰 번호 입력상자가 빈값이면 버튼은 클릭 취소
        if(this.phoneValue!==undefined){
            if(this.phoneValue.length<10){
                return;
            }
            else{
                if(!/^01[016789]{1}[0-9]{3,4}[0-9]{4}$/g.test(this.state.휴대폰)){ //휴대폰의 값이 아니면
                    this.setState({
                        isModalOpen:true,
                        modalText:'잘못된 휴대폰 번호입니다. 확인 후 다시 시도해 주세요',
                        휴대폰ok:false,
                    })
                    return
                }
                else{
                    this.setState({
                        isModalOpen:true,
                        modalText:'인증번호가 전송되었습니다.',
                        휴대폰ok:true,
                        isPhoneOkOpen: true, //휴대폰 인증 입력상자 보이기
                        counterStart:true,
                        disalbled1:true
                    })
                    this.counterTimer();
                }
            }
        }
    }

    onChangeAddress1=(value) => {
        this.setState({주소1:value})
    }
    onChangeAddress2=(value) => {
        this.setState({주소2:value})
    }
    onClickAddress=(e)=>{
        e.preventDefault();
        this.setState({isAddressOn: true})
    }

    onChangeGender=(value) => {
        this.setState({성별:value})
    }
//===========================================================
//생년월일 체크 함수
//===========================================================
    //1.생년
    //1900~2000
    //1999~2999
    //const regExp=/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g;
    //console.log(regExp.test(value))

    //2.생월
    //01~12
    //const regExp=/^(?:0?[1-9]|1[012])$/g;
    //console.log(regExp.test(value))

    //3.생일
    //01-31 01 10 20 30 31
    //const regExp=/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g;
    //console.log(regExp.test(value))

    //4. 년,월, 일 모두 입력제한 조건을 만족한 경우
    //4-1 미래의 생년월 가입불가
    //4-2 만 14세미만 가입불가
    //4-3 만 100세 초과 가입불가

    //5. 생년월일 저장
    //this.setState({생년월일:`${this.state.생년}-${this.state.생월}-${this.state.생일}`});


    birthDayCheckEventFn=(z)=>{
        const {생년, 생월, 생일} =this.state //구조분할 할당
        const nowYear=new Date().getFullYear();
        const nowMonth=new Date().getMonth()+1;
        const nowDate=new Date().getDate();
        const nowToday=new Date(nowYear,nowMonth,nowDate ); // 현재년월일 변수
        const nowToday14=new Date(nowYear-14,nowMonth,nowDate ); 
        const nowToday100=new Date(nowYear-100,nowMonth,nowDate ); 
        const birthDay=new Date(생년, 생월, 생일); //생년월일 변수
        //년 월 일 입력상자 모두 빈칸이면 포커스인아웃 이벤트 발생 취소
        if(생년==='' && 생월==="" && 생일===""){
            return;
        }else{
            //생년 체크
            if(/^(?:1[0-9][0-9][0-9]|2[0-9][0-9][0-9])$/g.test(생년)===false){
                //가이드 텍스트
                this.setState({
                    showBirthDay:true,
                    isClassBirthDay:false,
                    birthDayGuideText:'태어난 년도 4자리를 정확하게 입력해주세요'
                });
           

            }else{
                this.setState({
                    showBirthDay:false,
                    isClassBirthDay:'',
                    birthDayGuideText:''
                });
                //생월
                if(/^(?:0?[1-9]|1[012])$/g.test(생월)===false){
                    this.setState({
                        showBirthDay:true,
                        isClassBirthDay:false,
                        birthDayGuideText:'태어난 월을 정확하게 입력해주세요'
                    });
                    return
                }else{
                    this.setState({
                        showBirthDay:false,
                        isClassBirthDay:'',
                        birthDayGuideText:''
                    });
                    //생일
                    if(/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(생일)===false){
                        this.setState({
                            showBirthDay:true,
                            isClassBirthDay:false,
                            birthDayGuideText:'태어난 일을 정확하게 입력해주세요'
                        });
                        return
                    }else{
                        this.setState({
                            showBirthDay:false,
                            isClassBirthDay:'',
                            birthDayGuideText:''
                        });

                         //4. 년,월, 일 모두 입력제한 조건을 만족한 경우
                        //4-1 미래의 생년월 가입불가
                        //4-2 만 14세미만 가입불가
                        //4-3 만 100세 초과 가입불가

                         //4-1 미래의 생년월 가입불가
                        if(birthDay>nowToday){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGuideText:'생년월일이 미래로 입력되었습니다'
                            });
                            return
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGuideText:''
                            });
                        }
                        //4-2 만 14세미만 가입불가
                        if(birthDay>nowToday14){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGuideText:'만 14세 미만은 가입이 불가합니다.'
                            });
                            return
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGuideText:''
                            });
                        }
                         //4-3 만 100세 초과 가입불가
                         if(birthDay < nowToday100){
                            this.setState({
                                showBirthDay:true,
                                isClassBirthDay:false,
                                birthDayGuideText:'생년월일을 다시 확인해주세요'
                            });
                            return
                        }else{
                            this.setState({
                                showBirthDay:false,
                                isClassBirthDay:'',
                                birthDayGuideText:''
                            });
                        } 

                    }
                }
              
            }

        }
    }
    //입력상자를 떠나면 발생하는 이벤트
    onBlurEvent=(z)=>{
        this.birthDayCheckEventFn(z);
    }
    //입력상자에 포커스 발생하는 이벤트
    onFocusEvent=(z)=>{
        this.birthDayCheckEventFn(z);
    }
    onChangeYear=(value) => {
        this.setState({생년:value});
        
    }
    onChangeMonth=(value) => {
        this.setState({생월:value})
    }
    onChangeDate=(value) => {
        this.setState({생일:value})
    }


    onChangeChoocheon=(value, id) => {

        if(id==='event'){
            this.setState({
                추가입력사항:value,
                 isAddInputBoxShow:true,
                 addInputPlaceHolder:'참여 이벤트명을 입력해주세요'   
            });
        }else{
            this.setState({
                추가입력사항:value,
                 isAddInputBoxShow:true,
                 addInputPlaceHolder:'참여 추천인 아이디를 입력해주세요'   
            });
        }


    }
    onChangeAddInputBox=(value) =>{
        this.setState({추가입력상자:value});
    }

    //약관동의 체크박스 이벤트 8개(1개 전체체크)(7개가 일반체크 )
    //체크상태 (true)이면 약관동의 저장
    //체크상태가 아니면 (false)이면 약관동의 배열안에 배열값만 제외한다.

    onChangeCheckEventAll=(checked, value) => {
        
        //모든 체크가 선택되면 전체 선택한다.
        let imsi=[
            `이용약관동의 (필수)`,
            `개인정보 수집∙이용 동의 (필수)`,
            `개인정보 수집∙이용 동의 (선택)`,
            `무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`,
            `SNS`,
            `이메일`,
            `본인은 만 14세 이상입니다. (필수)`

        ];
        if(checked){//true
            this.setState({약관동의:imsi}) //전체내용 체크
        }else{//false 삭제
            this.setState({약관동의:[]}) //모두삭제
        }
        
    }
    onChangeCheckEvent=(checked, value) => {
        let result='';

        if(checked){//true
            //조건문 : sns/이메일
            if(value==='SNS' && this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의, 'SNS', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)']})
            }
            else if(value==='이메일' && this.state.약관동의.includes('SNS')){
                this.setState({약관동의: [...this.state.약관동의, '이메일', '무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)']})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)' && this.state.약관동의.includes('SNS') && !this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의, '이메일', value]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)' && !this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의, 'SNS', value]})
            } 
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)' && this.state.약관동의.includes('SNS') && this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의,  value]})
            }
            else if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)' && !this.state.약관동의.includes('SNS') && !this.state.약관동의.includes('이메일')){
                this.setState({약관동의: [...this.state.약관동의, 'SNS','이메일',  value]})
            }
            else{
                this.setState({약관동의:[...this.state.약관동의, value]}) //배열에 데이터 추가하기(누적)
            }
            
        }else{//false 삭제
            //let result = this.state.약관동의.filter((item) => item!==value)
            //let result = this.state.약관동의.filter(item => item!==value)//매개변수 1개인경우 괄호생략가능
            //let result = this.state.약관동의.filter((item) => { //중괄호를 사영할 경우는 반드시 리턴문사용
             //  return item!==value
           // });

           if(value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)'){
                result=this.state.약관동의.filter((item) => item!==value);
                result=result.filter((item) => item!=='SNS');
                result=result.filter((item) => item!=='이메일');
           }else if(value==='SNS'){
                result=this.state.약관동의.filter((item) => item!=='SNS');
                result=result.filter((item) => item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)');
           }
           else if(value==='이메일'){
                result=this.state.약관동의.filter((item) => item!=='이메일');
                result=result.filter((item) => item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)');
            }
           else{
            result = this.state.약관동의.filter((item) => { //중괄호를 사영할 경우는 반드시 리턴문사용
                return (
                    item!==value
                    )
             })

           }
            
             this.setState({약관동의:result})
        }
        
    }

    onSubmitEvent=(e) =>{
        
        e.preventDefault();
        const {아이디,비밀번호,이메일,비밀번호확인, 이름, 휴대폰,주소, 주소1, 주소2, 아이디ok, 비밀번호1ok, 비밀번호2ok, 비밀번호3ok, 이메일ok, 휴대폰ok, 아이디중복확인, 약관동의, 성별, 생년, 생월, 생일, 추가입력사항} =this.state
        if(아이디==='' || 비밀번호==='' || 비밀번호확인==='' || 이름==='' || 이메일==='' || 휴대폰==='' || 주소1===''|| 주소2===""){
           if(아이디===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'아이디를 입력해주세요'
                });
            }else if(비밀번호===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'비밀번호를 입력해주세요'
                });
            }else if(비밀번호확인===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'비밀번호확인을 입력해주세요'
                });
            }else if(이름===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'이름을 입력해주세요'
                });
            }else if(이메일===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'이메일을 입력해주세요'
                });
            }
            else if(휴대폰===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'휴대폰을 입력해주세요'
                });
            }
            else if(주소===''){
                this.setState({
                    isModalOpen: true,
                    modalText:'주소를 입력해주세요'
                });
            }
            return
        }else{
           //입력값 규칙을 잘못 입력하면 입력취소
            if(아이디ok===false || 비밀번호1ok===false || 비밀번호2ok===false || 비밀번호3ok===false || 이메일ok===false  || 휴대폰ok === false || 아이디중복확인 === false  ){
                if(아이디ok===false){
                    this.setState({
                        isModalOpen:true,
                        modalText:'6자 이상 16자 이하 영문 혹은 영문과 숫자를 조합만 가능합니다'
                    })
                }else if(이메일ok===false){
                    this.setState({
                        isModalOpen:true,
                        modalText:'잘못된 이메일 형식입니다'
                    })
                }
                return;
            }else{ //정상 데이터 전송
                let cnt=0;
                //약관동의 필수 3개 체크해야 전송
                for(let i=0; i<약관동의.length; i++){
                    if(약관동의[i].indexOf('필수') >= 0){
                        cnt++;
                    }
                }
                //console.log(cnt)
                if(cnt < 3) {
                    this.setState({
                        isModalOpen: true,
                        modalText:'약관동의 필수 선택사항 선택하세요'
                    })
                    console.log('카운트', cnt)
                    return;
                }else{ //모든 조건이 만족하고 전송 저장
                    //1. 임시객체 생성
                    //2. JSON.stringfy() 문자열 형식으로 변환
                    const 가입회원정보 ={
                        아이디: 아이디,
                        비밀번호: 비밀번호,
                        이름: 이름,
                        이메일: 이메일,
                        휴대폰: 휴대폰,
                        주소: `${주소1} ${주소2}`,
                        성별:성별,
                        생년월일: `${생년} ${생월} ${생일}`,
                        추가입력사항: 추가입력사항,
                        약관동의: 약관동의,
                        가입일자: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    }
                    console.log(가입회원정보);
                    localStorage.setItem(가입회원정보.아이디,JSON.stringify(가입회원정보) );

                    this.setState({
                        아이디: '',
                        아이디ok: false,
                        아이디중복확인: false,
                        비밀번호: '',
                        비밀번호1ok: false,
                        비밀번호2ok: false,
                        비밀번호3ok: false,
                        비밀번호확인:'',
                        이름: '',
                        이메일: '',
                        이메일ok: false,
                        휴대폰: '',
                        휴대폰ok: false,
                        isPhoneOkOpen:false,
                        휴대폰인증:'',
                        인증키:'123456',
                        disalbled1:false,
                        disalbled2:false,
                        onClickPhoneOkEvent:false,
                        isTimerOpen:true,//카운트
                        setId1:0,
                        isPhoneOkClass:false,
            
                        minutes:2,
                        secondes:59,
                        counterStart:false,
            
            
                        
                        주소1: '',
                        주소2: '',
                        주소: '',
                        성별: '선택안함',
            
                        생년: '',
                        생월: '',
                        생일: '',
                        생년월일: '',
            
                        추가입력사항: '', //라디오버튼 단일선택
                        isAddInputBoxShow:false,
                        추가입력상자:'',
                        addInputPlaceHolder:'',
            
            
                        약관동의:[], //체크박스 다중선택 저장 객체 배열
                        isAddressOn: false, //주소검색을 클릭하면 true로 변환하면 주소검색창이 열리게 만듬
            
                        showId: false, //아이디 가이드텍스트 show 기본 안보이게 
                        isClassId: '',//클래스를 검정색: true(초록색):false(빨간색)
            
                        showPw: false, //비밀번호 가이드텍스트 show 기본 안보이게 
                        isClassPw1: '',
                        isClassPw2: '',
                        isClassPw3: '',
            
                        showPwRe:false,
                        isClassPwRe:'',
                        
                        isModalOpen : false, //모달창 show & hide
                        isModalOpen1 : false, //모달창 show & hide
                        modalText:'', //아이디/이메일 가이드 텍스트
                        isClassEmail:'',
            
                        isPhoneClass:false, //휴대폰 버튼 클래스
            
                        //생년월일 가이드 텍스트
                        showBirthDay:false, //show(true) hide(false)
                        isClassBirthDay:'',//'', true, false
                        birthDayGuideText:''//가이드 텍스트 내용들
                    });
                }
            }
        } 
       
    
    }
    render() {
        return (
            <div id="kurly">
                <form onSubmit={this.onSubmitEvent}>
                    <div className="title">
                        <h1><img src={require("../img/logo.svg").default}  alt="logo" /></h1>  {/* 경로 쓰기 */}
                        <h2>회원가입</h2>
                    </div>
                    <div className="content">
                        <h4><span><i>*</i>필수입력사항</span></h4>
                        <ul>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>아이디 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input 
                                        type="text" 
                                        className='inputText' 
                                        id="inputId" 
                                        maxLength='16'
                                        value={this.state.아이디} 
                                        onChange={(e) => this.onChangeId(e.target.value)} 
                                        onFocus={(e) => this.onMouseDown(e) }
                                        placeholder='아이디를 입력해주세요' />
                                        <button className="w120-btn" onClick={this.onClickIdModalEvent}>중복확인</button>
                                        {
                                            this.state.showId && (
                                                <p className={
                                                    (
                                                       this.state.isClassId===''?'' :(this.state.isClassId===true?'green':'red')
                                                    )
                                                }>6자 이상 16자 이하 영문 혹은 영문과 숫자를 조합</p>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>비밀번호 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="password" 
                                        className='inputText' 
                                        id="inputPw" 
                                        placeholder='비밀번호를 입력해주세요' 
                                        value={this.state.비밀번호} 
                                        onChange={(e) => this.onChangePw(e.target.value)} 
                                        onFocus={(e) => this.onFocusPw(e)}
                                        />
                                        {
                                            this.state.showPw && (
                                                <>
                                                    <p className={(
                                                       this.state.isClassPw1===''?'' :(this.state.isClassPw1===true?'green':'red')
                                                    )}>10자 이상 입력</p>
                                                    <p className={(
                                                       this.state.isClassPw2===''?'' :(this.state.isClassPw2===true?'green':'red')
                                                    )}>영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합</p>
                                                    <p className={(
                                                       this.state.isClassPw3===''?'' :(this.state.isClassPw3===true?'green':'red')
                                                    )}>동일한 숫자 3개 이상 연속 사용 불가</p>
                                                </>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>비밀번호확인 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="password" className='inputText' id="inputPws" placeholder='비밀번호를 한번 더 입력해주세요' value={this.state.비밀번호확인} 
                                        onChange={(e) => this.onChangePwRe(e.target.value)}
                                        onFocus={(e)=>this.onFocusPwRe(e)} 
                                        />
                                        {
                                            this.state.showPwRe && (
                                                <p className={
                                                    (
                                                        this.state.isClassPwRe===''? '': (this.state.isClassPwRe===true? 'green':'red')
                                                    )
                                                }
                                                >동일한 비밀번호를 입력해주세요</p>
                                            )
                                        }
                                       
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>이름 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" className='inputText' id="inputName" placeholder='이름을 입력해주세요' value={this.state.이름} onChange={(e) => this.onChangeName(e.target.value)} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>이메일 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="email" className='inputText' id="inputEmail" 
                                        placeholder='예:marketkurly@kurly.com' value={this.state.이메일} 
                                        onChange={(e) => this.onChangeEmail(e.target.value)} />
                                        <button className="w120-btn" onClick={this.onClickEmailModalEvent}>중복확인</button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>휴대폰 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input type="text" 
                                        className='inputText' 
                                        id="inputPhone"
                                        maxLength='11'
                                        placeholder='숫자만 입력해주세요' 
                                        value={this.state.휴대폰} 
                                        onChange={(e) => this.onChangePhone(e.target.value)} 
                                        />
                                        <button disabled={this.disalbled1} onClick={this.onClickPhoneEvent} className={`w120-btn ${this.state.isPhoneClass ? 'addPhone':'phone'}`}>인증번호 받기</button>
                                        {
                                            this.state.isPhoneOkOpen && (
                                                <>
                                                    <input type="text" maxLength='6' className='inputText phoneok-input' id="inputphone1" placeholder='인증번호를 입력하세요'  value={this.state.휴대폰인증}  onChange={(e) => this.onChangePhone1(e.target.value)} disabled={this.disalbled2} />
                                                    <button disabled={this.disalbled2} onClick={this.onClickPhoneOkEvent} className={`w120-btn phonok-btn ${this.state.isPhoneOkClass ? 'addPhone':'phone'}`}>인증번호 확인</button>
                                                    {
                                                        this.state.isTimerOpen && (
                                                            <span className="counter-timer-box">
                                                               {this.state.minutes}:{this.state.secondes<10?`0${this.state.secondes}`: this.state.secondes}
                                                            </span>  
                                                        )
                                                    }
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>주소 <i>*</i></span>
                                    </div>
                                    <div className="input-box">
                                        <input 
                                        type="text" 
                                        className='inputText' 
                                        id='inputAddress1' 
                                        placeholder='주소입력1'
                                        value={this.state.주소1} 
                                        onChange={(e) => this.onChangeAddress1(e.target.value)}
                                        />
                                        <input 
                                        type="text" 
                                        className='inputText' 
                                        id='inputAddress2' 
                                        placeholder='나머지 주소2'
                                        value={this.state.주소2} 
                                        onChange={(e) => this.onChangeAddress2(e.target.value)}
                                        />
                                        <button className="inputText addr" type='button' id='inputAddress'
                                        onClick={this.onClickAddress}
                                        ><img src={seach}alt="검색" /> 주소검색</button>
                                        <span className="address-info">배송지에 따라 상품 정보가 달라질수 있습니다</span>

                                        <div id="postcode">
                                            {
                                                this.state.isAddressOn && (
                                                    <Postcode onChangeAddress1={this.onChangeAddress1}/>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>성별 </span>
                                    </div>
                                    <div className="input-box radio-box">
                                       <label>
                                            <input type="radio" checked={this.state.성별.includes(`남자`)} value={`남자`} onChange={(e) => this.onChangeGender(e.target.value)} />
                                            <span>남자</span>
                                       </label>
                                       <label>
                                            <input type="radio" checked={this.state.성별.includes(`여자`)} value={`여자`} onChange={(e) => this.onChangeGender(e.target.value)} />
                                            <span>여자</span>
                                       </label>
                                       <label>
                                            <input type="radio"  checked={this.state.성별.includes(`선택안함`)} value={`선택안함`} onChange={(e) => this.onChangeGender(e.target.value)} />
                                            <span>선택안함</span>
                                       </label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>생년월일</span>
                                    </div>
                                    <div className="input-box">
                                       <ul className="date-box">
                                            <li><input type="text" id='year' placeholder='YYYY' 
                                            value={this.state.생년} 
                                            maxLength='4'
                                            onChange={(e) => this.onChangeYear(e.target.value)} 
                                            onBlur={(e) => this.onBlurEvent(e)}
                                            onFocus={(e) => this.onFocusEvent(e)}
                                            /></li>

                                            <li><span>/</span></li>

                                            <li><input type="text" id='month' placeholder='MM' maxLength='2'  value={this.state.생월} onChange={(e) => this.onChangeMonth(e.target.value)}
                                             onBlur={(e) => this.onBlurEvent(e)}
                                             onFocus={(e) => this.onFocusEvent(e)}
                                            /></li>

                                            <li><span>/</span></li>

                                            <li><input type="text" id='date' placeholder='DD' maxLength='2' value={this.state.생일} onChange={(e) => this.onChangeDate(e.target.value)}
                                            onBlur={(e) => this.onBlurEvent(e)}
                                            onFocus={(e) => this.onFocusEvent(e)}
                                            /></li>
                                       </ul>
                                       {
                                        this.state.showBirthDay && (
                                            <p className={
                                                (this.state.isClassBirthDay===''?'':(this.state.isClassBirthDay===true?'green':'red'))
                                            }>{this.state.birthDayGuideText}</p>
                                        )
                                       }
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>추가입력사항</span>
                                    </div>
                                    <div className="input-box radio-box">
                                       <label>
                                            <input id='id' type="radio" checked={this.state.추가입력사항.includes(`추천인 아이디`)} value={`추천인 아이디`} onChange={(e) => this.onChangeChoocheon(e.target.value, e.target.id)}/>
                                            <span>추천인 아이디</span>
                                       </label>
                                       <label>
                                            <input id='event' type="radio" checked={this.state.추가입력사항.includes(`참여이벤트`)} value={`참여이벤트`}  onChange={(e) => this.onChangeChoocheon(e.target.value, e.target.id)}/>
                                            <span>참여이벤트</span>
                                       </label>
                                       {
                                        this.state.isAddInputBoxShow && (
                                            <div className="add-input-box">
                                                <input type="text" className='inputText' id="addInputBox" 
                                                placeholder={this.state.addInputPlaceHolder}
                                                value={this.state.추가입력상자}
                                                onChange={(e) => this.onChangeAddInputBox(e.target.value)}
                                                />
                                                <p>
                                                    추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다. <br />
                                                    가입 이후, 수정이 불가합니다. <br />
                                                    대소문자 및 띄어쓰기에 유의해주세요. 
                                                </p>
                                            </div>
                                        )
                                       }
                                    </div> 
                                </div>
                            </li>
                            <li>
                                <hr />
                            </li>
                            <li className='service'>
                                <div className="gap">
                                    <div className="label-box">
                                        <span>이용약관동의<i>*</i></span>
                                    </div>
                                    <div className="input-box check-box">
                                       <dl>
                                            <dt>
                                                <label>
                                                    <input 
                                                    type="checkbox" 
                                                    onChange={(e) => this.onChangeCheckEventAll(e.target.checked, e.target.value)}
                                                    checked={this.state.약관동의.length>=7?true:false }
                                                    value={`전체 동의 합니다`}
                                                     />
                                                    <span>전체 동의 합니다</span>
                                                </label>
                                                <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                                            </dt>
                                            <dd>
                                                <label>
                                                    <input 
                                                    id='chk1'
                                                    type="checkbox"
                                                    onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                    checked={this.state.약관동의.includes(`이용약관동의 (필수)`)}
                                                    value={`이용약관동의 (필수)`}
                                                     />
                                                    <span>이용약관동의 (필수)</span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" 
                                                    id='chk2'
                                                    onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                    checked={this.state.약관동의.includes(`개인정보 수집∙이용 동의 (필수)`)}
                                                    value={`개인정보 수집∙이용 동의 (필수)`}
                                                    />
                                                    <span>개인정보 수집∙이용 동의 (필수)</span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox"
                                                    id='chk3'
                                                    onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                    checked={this.state.약관동의.includes(`개인정보 수집∙이용 동의 (선택)`)}
                                                    value={`개인정보 수집∙이용 동의 (선택)`}
                                                    />
                                                    <span>개인정보 수집∙이용 동의 (선택)</span>
                                                </label>
                                                <span>
                                                    <a href="#!">약관보기 <i>&gt;</i></a>
                                                </span>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox"
                                                    id='chk4'
                                                    onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                    checked={this.state.약관동의.includes(`무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`)}
                                                    value={`무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)`}
                                                    />
                                                    <span>무료배송, 할인쿠폰 등 혜택/정보 수신 동의 (선택)</span>
                                                </label>
                                                
                                                <div className="sub-checkbox">
                                                    <div>
                                                        <label>
                                                            <input type="checkbox"
                                                            id='chk1'
                                                            onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                            checked={this.state.약관동의.includes(`SNS`)}
                                                            value={`SNS`}
                                                            />
                                                            <span>SNS</span>
                                                        </label>
                                                        <label>
                                                            <input type="checkbox" 
                                                            id='chk6'
                                                            onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                            checked={this.state.약관동의.includes(`이메일`)}
                                                            value={`이메일`}
                                                            />
                                                            <span>이메일</span>
                                                        </label>
                                                    </div>
                                                    <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                                                </div>
                                            </dd>
                                            <dd>
                                                <label>
                                                    <input type="checkbox" 
                                                    id='chk7'
                                                     onChange={(e) => this.onChangeCheckEvent(e.target.checked, e.target.value)}
                                                     checked={this.state.약관동의.includes(`본인은 만 14세 이상입니다. (필수)`)}
                                                     value={`본인은 만 14세 이상입니다. (필수)`}
                                                    />
                                                    <span>본인은 만 14세 이상입니다. (필수)</span>
                                                </label>
                                               
                                            </dd>
                                       </dl>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="button-box">
                        <button type='submit'>가입하기</button>
                    </div>
    
                   
                </form>
                {
                    this.state.isModalOpen && (
                        <div className="modal">
                            <div className="container">
                                <div className="content-box">
                                    <p>{this.state.modalText}</p>
                                </div>
                                <div className="button-box1">
                                    <button className="ok-btn" onClick={this.onClickModalClose} title='확인'>확인</button>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.isModalOpen1 && (
                        <div className="modal">
                            <div className="container">
                                <div className="content-box">
                                    <p>{this.state.modalText}</p>
                                </div>
                                <div className="button-box1">
                                    <button className="ok-btn" onClick={this.onClickModalClose1} title='확인'>확인</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                <br />
            </div>
        );
    }
}

export default KurlyComponent;