/**

 * author  Administrator 创建

 * date 2019-12-03 14:17

 */
export  const abs=num=>{
        let res=num;
        if(num<0){
            return -num;
        }
        if(typeof num !=='number'){
            return NaN;
        }
        return res;
    }

export  const add=(num1,num2)=>{
    return num1+num2;
}

