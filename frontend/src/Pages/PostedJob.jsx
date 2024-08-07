import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

import headerLogo from '../Assets/Images/r17panjang.png';
import cardLogo from '../Assets/Images/r17logo.png';

import '../Assets/Styles/PostedJob.css'


function PostedJob() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const jobsPerPage = 6

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/jobs')
                setJobs(response.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        };

        fetchJobs();
    }, []);

    const handleNextPage = () => {
        if (currentPage * jobsPerPage < jobs.length) {
            setCurrentPage(currentPage + 1)
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    };

    const indexOfLastJob = currentPage * jobsPerPage
    const indexOfFirstJob = indexOfLastJob - jobsPerPage
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob)

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(date))
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
  
  
    return (
        <div className='container'>
            <div className='header'>
                <img src={headerLogo} alt="r17" />
            </div>
            <div className='sec-header'>
                <h1>R17 Group Career</h1>
            </div>
            <div className="job-list">
                {currentJobs.length === 0 ? (
                    <div className="nothing-msg">
                        <h2>Sorry, There's No Job Posted Yet</h2>
                    </div>
                ) : (
                    currentJobs.map(job => (
                        <div key={job._id} className="card-job">
                            <img src={cardLogo} alt="" />
                            <h3>{job.jobname}</h3>
                            <p>R17 Group</p>
                            <div className="hire">
                                <p>{job.jobAimed}</p>
                            </div>
                            <div className="deadline">
                                <p>Batas Lamar : {formatDate(job.dateEnd)}</p>
                            </div>
                            <div className="button-group">
                                <button className="see-details-button"> See Details </button>
                                <button className='apply-job-button'> Apply Job</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {currentJobs.length > 0 &&(
                <div className="footer">  
                    <div className="entries">
                        <p>Showing <strong>{indexOfFirstJob + 1}</strong> to <strong>{Math.min(indexOfLastJob, jobs.length)}</strong> of {jobs.length} entries </p>
                    </div>
                    <div className="button-group-card">
                        <button type="button" className="prev-button" 
                        onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        <button type="button" className="next-button" 
                        onClick={handleNextPage} disabled={currentPage * jobsPerPage >= jobs.length}>Next</button>
                    </div>       
                </div>
            )}
        </div>
    ) 
}

export default PostedJob
