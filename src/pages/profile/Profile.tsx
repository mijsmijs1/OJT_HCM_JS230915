import { Store } from '@/store'
import { useSelector } from 'react-redux';
import Company_profile from './components/company/company_profile/Company_profile';
import Candidate_profile from './components/candidate';

import "./profile.scss"

export default function Profile() {
    const candidateStore = useSelector((store: Store) => store.candidateStore)

    return (
        <>
            {
                candidateStore.data ? (
                    <Candidate_profile />
                ) : (
                    <Company_profile />
                )
            }
        </>
    )
}
