import axios from "../utils/axios.config";
import { useEffect, useState } from "react"

const useCheckAccType = (email) => {
    const [accType, setAccType] = useState('');
    const [isAccLoading, setIsAccLoading] = useState(true);

    useEffect(() => {
        if (email) {
            axios.get(`/api/v1/users/accTypeCheck/${email}`)
                .then(data => {
                    setAccType(data.data.accountType);
                    setIsAccLoading(false);
                });
        } else {
            setIsAccLoading(false);
        }
    }, [email])
    return [accType, isAccLoading]
}

export default useCheckAccType;