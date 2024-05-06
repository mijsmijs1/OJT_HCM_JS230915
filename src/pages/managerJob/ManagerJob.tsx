import pictures from '@/pictures'
import './managerJob.scss'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import AppliedCandidates from './components/appliedCandidates/AppliedCandidates'
import { useEffect, useState } from 'react'
import UpdateJobForm from './components/updateJobForm/UpdateJobForm'
import { useParams } from 'react-router-dom'
import apis from '@/services/apis'
import { Modal, Skeleton } from 'antd'
import { Store } from '@/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobForDetail } from '@/store/slices/job/job.slice'
import { unwrapResult } from '@reduxjs/toolkit'
import { Company, fetchCompanies, fetchCompanyById } from '@/store/slices/company/company.slice'
import convertToVNDateFormat from '@/utils/common/convert_date_function'

export default function ManagerJob() {
    //Check quyền truy cập
    let [displayEditForm, setDisplayEditForm] = useState(false)
    const [check, setCheck] = useState(null)
    let { jobId } = useParams();
    let jobIdAsNumber = jobId ? +jobId : undefined;
    useEffect(() => {
        const check = async () => {
            try {
                let res = await apis.jobApi.checkJob(jobIdAsNumber || 0)
                setCheck(res.data.data)
            } catch (err) {
            }
        }
        check();
    }, [jobIdAsNumber])
    useEffect(() => {
        if (check == false) {
            Modal.error({
                title: "Cảnh báo",
                content: "Bạn không được quyền truy cập tài nguyên này!",
                okText: 'Quay về trang chủ',
                onOk: () => {
                    window.location.href = "/"
                }
            })
        }
    }, [check])
    const dispatch = useDispatch();
    const jobStore = useSelector((store: Store) => store.jobStore)
    const companyStore = useSelector((store: Store) => store.companyStore)
    const [company, setCompany] = useState<Company | null>(null);
    useEffect(() => {
        dispatch(fetchJobForDetail({ jobId: jobIdAsNumber || 0 }) as any)
    }, [])
    useEffect(() => {
        if (jobStore.job) {
            dispatch(fetchCompanies() as any)
        }
    }, [jobStore.job])
    useEffect(() => {
        if (companyStore.companies) {
            let company = companyStore.companies.find(item => item.id == jobStore.job?.company_id)
            setCompany(company || null)
        }
    }, [companyStore.companies])
    return (
        <>
            {
                check && <>
                    <Breadcrumb />
                    <div className='manager_job_container'>
                        {
                            displayEditForm && <UpdateJobForm setDisplayEditForm={setDisplayEditForm} companyId={company?.id || 0} />
                        }
                        <div className='content'>
                            <div className='header'>
                                <div className='header_left'>
                                    {companyStore.loadingCompanies ? <Skeleton.Image active></Skeleton.Image> : <img src={company?.logo} alt='logo' onClick={() => { window.location.href = `/manager-company/${company?.id}/info` }} />}
                                    <div className='company_info'>
                                        {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input> : <p>{jobStore.job?.title}</p>}
                                        <div>
                                            {companyStore.loadingCompanies ? <Skeleton.Input active></Skeleton.Input> : <span>{`at ${company?.name}`}</span>}
                                            {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input> : <div className='full_time'>
                                                <span>{jobStore.job?.levelJob?.name.toUpperCase()}</span>
                                            </div>}
                                            {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input> : <>
                                                {
                                                    jobStore.job?.typeJobs?.map(item => {
                                                        return (<div className='featured'>
                                                            <span>{item.name}</span>
                                                        </div>)
                                                    })
                                                }

                                            </>
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='header_right'>
                                    <div className='apply'
                                        onClick={() => {
                                            setDisplayEditForm(true)
                                        }}
                                    >
                                        <span>
                                            Cập nhật thông tin
                                        </span>
                                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12.2637H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12 5.26367L19 12.2637L12 19.2637" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div className='info'>
                                <div className='info_left'>
                                    <div className='info_left_content'>
                                        <h3>Job Description</h3>
                                        <div className='description' style={{ whiteSpace: 'pre-wrap' }}>
                                            {jobStore.loadingJob ? <Skeleton active></Skeleton> : <p>{jobStore.job?.description}</p>}
                                        </div>
                                    </div>

                                </div>
                                <div className='info_right'>
                                    <div className='info_right_top'>
                                        <div className='salary'>
                                            <span className='title'>
                                                Salary (USD)
                                            </span>
                                            {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='value'>
                                                {jobStore.job?.salary}
                                            </span>}
                                            <span className='for'>
                                                Monthly salary
                                            </span>
                                        </div>
                                        <div className='location'>
                                            <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.25 27.5762L4.75 29.9512V8.57617L14.25 6.20117" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M23.75 32.3262L14.25 27.5762V6.20117L23.75 10.9512V32.3262Z" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M23.75 10.9512L33.25 8.57617V29.9512L23.75 32.3262" stroke="#BC2228" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                            <span className='title'>
                                                Job Location
                                            </span>
                                            {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='content'>
                                                {jobStore.job?.location?.name}
                                            </span>}
                                        </div>
                                    </div>
                                    <div className='info_right_bottom'>
                                        <div className='top'>
                                            <p>Job Overview</p>
                                            <div className='content'>
                                                <div className='item job_posted'>
                                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M26 5.26367H6C5.44772 5.26367 5 5.71139 5 6.26367V26.2637C5 26.816 5.44772 27.2637 6 27.2637H26C26.5523 27.2637 27 26.816 27 26.2637V6.26367C27 5.71139 26.5523 5.26367 26 5.26367Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M22 3.26367V7.26367" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10 3.26367V7.26367" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M5 11.2637H27" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span className='label'>
                                                        Job Posted:
                                                    </span>
                                                    {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='info'>
                                                        {convertToVNDateFormat(jobStore.job?.created_at || '')}
                                                    </span>}
                                                </div>


                                                <div className='item job_exprire'>
                                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.6667 27.2637C22.7419 27.2637 27.6667 22.3388 27.6667 16.2637C27.6667 10.1885 22.7419 5.26367 16.6667 5.26367C10.5916 5.26367 5.66675 10.1885 5.66675 16.2637C5.66675 22.3388 10.5916 27.2637 16.6667 27.2637Z" stroke="#BC2228" stroke-width="2" stroke-miterlimit="10" />
                                                        <path d="M16.6667 16.2632L21.6165 11.3135" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M13.6667 1.26367H19.6667" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                    <span className='label'>
                                                        Job expire in:
                                                    </span>
                                                    {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='info'>
                                                        {convertToVNDateFormat(jobStore.job?.expire_at || '')}
                                                    </span>}
                                                </div>



                                                <div className='item job_level'>
                                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4.33325 22.2637L16.3333 29.2637L28.3333 22.2637" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M4.33325 16.2637L16.3333 23.2637L28.3333 16.2637" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M4.33325 10.2637L16.3333 17.2637L28.3333 10.2637L16.3333 3.26367L4.33325 10.2637Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                    <span className='label'>
                                                        Job Level:
                                                    </span>
                                                    {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='info'>
                                                        {jobStore.job?.levelJob?.name}
                                                    </span>}
                                                </div>

                                                <div className='item experience'>
                                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 8.26367V24.2637C5 24.7941 5.21071 25.3028 5.58579 25.6779C5.96086 26.053 6.46957 26.2637 7 26.2637H27C27.2652 26.2637 27.5196 26.1583 27.7071 25.9708C27.8946 25.7832 28 25.5289 28 25.2637V11.2637C28 10.9985 27.8946 10.7441 27.7071 10.5566C27.5196 10.369 27.2652 10.2637 27 10.2637H7C6.46957 10.2637 5.96086 10.053 5.58579 9.67789C5.21071 9.30281 5 8.7941 5 8.26367ZM5 8.26367C5 7.73324 5.21071 7.22453 5.58579 6.84946C5.96086 6.47439 6.46957 6.26367 7 6.26367H24" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M23 18.2637C23 18.5398 22.7761 18.7637 22.5 18.7637C22.2239 18.7637 22 18.5398 22 18.2637C22 17.9875 22.2239 17.7637 22.5 17.7637C22.7761 17.7637 23 17.9875 23 18.2637Z" fill="$fontColor" stroke="#BC2228" stroke-width="2" />
                                                    </svg>

                                                    <span className='label'>
                                                        Salary
                                                    </span>
                                                    {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input > : <span className='info'>
                                                        {jobStore.job?.salary}
                                                    </span>}
                                                </div>

                                                <div className='item education'>
                                                    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_21_8024)">
                                                            <path d="M27.001 9.26367H5.00098C4.44869 9.26367 4.00098 9.71139 4.00098 10.2637V26.2637C4.00098 26.816 4.44869 27.2637 5.00098 27.2637H27.001C27.5533 27.2637 28.001 26.816 28.001 26.2637V10.2637C28.001 9.71139 27.5533 9.26367 27.001 9.26367Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M21 9.26367V7.26367C21 6.73324 20.7893 6.22453 20.4142 5.84946C20.0391 5.47439 19.5304 5.26367 19 5.26367H13C12.4696 5.26367 11.9609 5.47439 11.5858 5.84946C11.2107 6.22453 11 6.73324 11 7.26367V9.26367" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M28.0012 16.0527C24.354 18.1628 20.2137 19.2707 16.0002 19.2641C11.7873 19.2707 7.64768 18.1632 4.00098 16.0538" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M14.5 15.2637H17.5" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_21_8024">
                                                                <rect width="32" height="32" fill="white" transform="translate(0 0.263672)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>



                                                    <span className='label'>
                                                        Technologies
                                                    </span>
                                                    <div className='item_container'>
                                                        {jobStore.loadingJob ? <Skeleton.Input active></Skeleton.Input> : <>
                                                            {
                                                                jobStore.job?.typeJobs?.map(item => {
                                                                    return (
                                                                        <div className='featured'>
                                                                            <span>{item.name}</span>
                                                                        </div>)
                                                                })
                                                            }

                                                        </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bottom'>
                                            <p>
                                                Share this job:
                                            </p>
                                            <div className='contact'>
                                                <div className='link'>
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.81763 15.445L15.1816 9.08105" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M13.5904 17.0368L10.9388 19.6885C10.0948 20.5321 8.95028 21.006 7.75694 21.0059C6.5636 21.0058 5.41916 20.5317 4.57534 19.6879C3.73152 18.8441 3.25743 17.6997 3.25732 16.5063C3.25722 15.313 3.73112 14.1685 4.5748 13.3245L7.22645 10.6729" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M16.7729 13.8536L19.4246 11.2019C20.2682 10.358 20.7421 9.21346 20.742 8.02012C20.7419 6.82678 20.2678 5.68235 19.424 4.83853C18.5802 3.99471 17.4358 3.52061 16.2424 3.52051C15.0491 3.52041 13.9046 3.99431 13.0606 4.83798L10.4089 7.48963" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>
                                                    <span>
                                                        Copy Links
                                                    </span>
                                                </div>
                                                <div className='social_media'>
                                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_21_8036)">
                                                            <path d="M18.5236 0.263672H1.47639C1.08483 0.263672 0.709301 0.41922 0.432425 0.696096C0.155548 0.972973 0 1.3485 0 1.74006V18.7873C0 19.1788 0.155548 19.5544 0.432425 19.8312C0.709301 20.1081 1.08483 20.2637 1.47639 20.2637H18.5236C18.9152 20.2637 19.2907 20.1081 19.5676 19.8312C19.8445 19.5544 20 19.1788 20 18.7873V1.74006C20 1.3485 19.8445 0.972973 19.5676 0.696096C19.2907 0.41922 18.9152 0.263672 18.5236 0.263672ZM5.96111 17.3012H2.95417V7.74978H5.96111V17.3012ZM4.45556 6.42617C4.11447 6.42425 3.7816 6.32133 3.49895 6.13041C3.21629 5.93949 2.99653 5.66911 2.8674 5.35341C2.73826 5.03771 2.70554 4.69083 2.77336 4.35655C2.84118 4.02227 3.0065 3.71557 3.24846 3.47516C3.49042 3.23474 3.79818 3.07139 4.13289 3.00572C4.4676 2.94005 4.81426 2.975 5.12913 3.10616C5.44399 3.23732 5.71295 3.45881 5.90205 3.74268C6.09116 4.02655 6.19194 4.36008 6.19167 4.70117C6.19488 4.92953 6.15209 5.1562 6.06584 5.36768C5.97959 5.57915 5.85165 5.77109 5.68964 5.93206C5.52763 6.09303 5.33487 6.21974 5.12285 6.30463C4.91083 6.38952 4.68389 6.43086 4.45556 6.42617ZM17.0444 17.3095H14.0389V12.0915C14.0389 10.5526 13.3847 10.0776 12.5403 10.0776C11.6486 10.0776 10.7736 10.7498 10.7736 12.1303V17.3095H7.76667V7.75673H10.6583V9.08034H10.6972C10.9875 8.49284 12.0042 7.48867 13.5556 7.48867C15.2333 7.48867 17.0458 8.48451 17.0458 11.4012L17.0444 17.3095Z" fill="#BC2228" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_21_8036">
                                                                <rect width="20" height="20" fill="white" transform="translate(0 0.263672)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                                <div className='social_media'>
                                                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clip-path="url(#clip0_21_8039)">
                                                            <path d="M20 10.2637C20 4.74082 15.5229 0.263672 10 0.263672C4.47715 0.263672 0 4.74082 0 10.2637C0 15.2549 3.65684 19.392 8.4375 20.1422V13.1543H5.89844V10.2637H8.4375V8.06055C8.4375 5.5543 9.93047 4.16992 12.2146 4.16992C13.3084 4.16992 14.4531 4.36523 14.4531 4.36523V6.82617H13.1922C11.95 6.82617 11.5625 7.59707 11.5625 8.38867V10.2637H14.3359L13.8926 13.1543H11.5625V20.1422C16.3432 19.392 20 15.2549 20 10.2637Z" fill="white" />
                                                            <path d="M13.8926 13.1543L14.3359 10.2637H11.5625V8.38867C11.5625 7.59785 11.95 6.82617 13.1922 6.82617H14.4531V4.36523C14.4531 4.36523 13.3088 4.16992 12.2146 4.16992C9.93047 4.16992 8.4375 5.5543 8.4375 8.06055V10.2637H5.89844V13.1543H8.4375V20.1422C9.47287 20.3042 10.5271 20.3042 11.5625 20.1422V13.1543H13.8926Z" fill="#BC2228" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_21_8039">
                                                                <rect width="20" height="20" fill="white" transform="translate(0 0.263672)" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>

                                                </div>
                                                <div className='social_media'>
                                                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6.2896 16.3897C13.8368 16.3897 17.9648 10.1369 17.9648 4.71451C17.9648 4.53691 17.9648 4.36011 17.9528 4.18411C18.7559 3.60324 19.4491 2.88402 20 2.06011C19.2512 2.39211 18.4567 2.60974 17.6432 2.70571C18.4998 2.19295 19.141 1.38636 19.4472 0.436112C18.6417 0.914119 17.7605 1.25097 16.8416 1.43211C16.2229 0.77426 15.4047 0.338647 14.5135 0.192683C13.6223 0.0467184 12.7078 0.198541 11.9116 0.624656C11.1154 1.05077 10.4819 1.72742 10.109 2.5499C9.73605 3.37238 9.64462 4.29483 9.8488 5.17451C8.21741 5.09268 6.62146 4.66871 5.16455 3.93012C3.70763 3.19153 2.4223 2.15483 1.392 0.887312C0.867274 1.79064 0.70656 2.86 0.942583 3.87766C1.17861 4.89533 1.79362 5.78477 2.6624 6.36491C2.00936 6.34578 1.37054 6.16961 0.8 5.85131V5.90331C0.800259 6.85069 1.12821 7.76881 1.72823 8.50195C2.32824 9.2351 3.16338 9.73812 4.092 9.92571C3.4879 10.0905 2.85406 10.1146 2.2392 9.99611C2.50151 10.8114 3.01202 11.5243 3.69937 12.0352C4.38671 12.5461 5.21652 12.8295 6.0728 12.8457C5.22203 13.5144 4.24776 14.0089 3.20573 14.3007C2.16369 14.5926 1.07435 14.6761 0 14.5465C1.87653 15.7507 4.05994 16.3894 6.2896 16.3865" fill="#BC2228" />
                                                    </svg>


                                                </div>
                                                <div className='social_media'>
                                                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 5.51367L12 13.7637L3 5.51367" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M3 5.51367H21V18.2637C21 18.4626 20.921 18.6534 20.7803 18.794C20.6397 18.9347 20.4489 19.0137 20.25 19.0137H3.75C3.55109 19.0137 3.36032 18.9347 3.21967 18.794C3.07902 18.6534 3 18.4626 3 18.2637V5.51367Z" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M10.3636 12.2637L3.2312 18.8017" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M20.7687 18.8018L13.6362 12.2637" stroke="#BC2228" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AppliedCandidates />
                        </div>

                    </div>
                </>
            }
        </>
    )
}
