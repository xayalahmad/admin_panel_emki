import { useDispatch } from 'react-redux';
import { setTokenBoolean } from "../../stores/tokenBoolean";
import { useSelector } from 'react-redux';
export default function HomePage() {
  const dispatch = useDispatch()

    // const { expDate } = useSelector(state => state.expDate)
    const { tokenBoolean } = useSelector(state => state.tokenBoolean)
    const Token = localStorage.getItem("Token");
    const accessTokenExpiration = localStorage.getItem("aTE");
    const refreshTokenExpiration = localStorage.getItem("rTE");
    const refreshToken = localStorage.getItem("rToken");
    // const expDate = localStorage.getItem("expDateLocal");
    // document.cookie = `refreshToken=${responseData.refreshToken}`
    let thisTime = new Date()
// 2gun refresh
// 2saat access

// console.log(document.cookie);
// console.log(thisTime);
// console.log(expDate);

const now = new Date(thisTime);
const dateRefresh= new Date(refreshTokenExpiration);
const dateAccess = new Date(accessTokenExpiration);
console.log(now);
console.log(dateRefresh);
console.log(dateAccess);

console.log('acccess' , Token);
console.log('refresh' , refreshToken);
if(Date.parse(now) <  Date.parse(dateAccess)){
    console.log('qaydasindadi');
}
else{
    console.log('logine get');
    const annData = {
        accessToken: Token,
        refreshToken: refreshToken,
    }
    console.log(annData);
    fetch('http://logicbackend-001-site1.htempurl.com/api/Token/Refresh', {
        method: 'POST',
        body: JSON.stringify(annData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            
        localStorage.setItem("Token", data.accessToken);
        localStorage.setItem("refreshToken",data.refreshToken);

        })
        .catch(err => {
            console.log(err)
            // dispatch(setTokenBoolean(false))     

        })

}





if(Date.parse(now) <  Date.parse(dateRefresh)){
    console.log('qaydasindadi');
}
else{
    console.log('logine get');

    fetch('http://logicbackend-001-site1.htempurl.com/api/Token/Revoke', {
        method: 'POST',
        // body: JSON.stringify(annData),
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + Token
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(setTokenBoolean(false))

        })
        .catch(err => {
            console.log(err)
            dispatch(setTokenBoolean(false))

        })





    return (
        <>
        Xoş Gəlmisiniz !
        {Token}
        {refreshToken}
        </>

    )
}}