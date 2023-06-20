import { useEffect, useState } from "react"

const useCheckAccType = (email) => {
    const [accType, setAccType] = useState('');
    const [isAccLoading, setIsAccLoading] = useState(true);

    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/api/v1/users/accTypeCheck/${email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setAccType(data.accountType);
                    setIsAccLoading(false);
                })
        } else{
            setIsAccLoading(false);
        }
    }, [email])
    return [accType, isAccLoading]
}

export default useCheckAccType;