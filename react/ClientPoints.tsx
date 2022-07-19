import React, {useState, useEffect} from "react";

interface UserData{
    userId:string,
    user:string,
    userType:string

}

const ClientPoints: StorefrontFunctionComponent = () => {
   const [userData, setUserData] = useState<UserData | null>(null)

   useEffect( () => {
        const fetchData = async () => {
            const res = await fetch('/api/vtexid/pub/authenticated/user')
            const toJson = await res.json()
            setUserData(toJson)
        }

        if(!userData){
            fetchData()
        }

   })

    return (
        <>
            {userData?.user}
        </>
    )
}

export default ClientPoints