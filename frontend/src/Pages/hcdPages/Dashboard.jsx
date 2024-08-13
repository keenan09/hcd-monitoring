import React from 'react'
import '../../Assets/Styles/Dashboard.css'
import Navbar from '../../Components/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'


//HCD Dashboard Feature
export default function Dashboard() {
    
    const [filter, setFilter] = useState({
        
        jobname: '',
        startDate: '',
        endDate: ''
    })
    const [applicants, setApplicants] = useState([])

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get('http://localhost:5000/applicants', {
                    params: filter
                });
                setApplicants(response.data);
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };

        fetchApplicants();
    }, [filter]);

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [newFilter.type]: newFilter.value
        }));
    }
    
    const filteredApplicants = applicants.filter(applicant => {
        // console.log('Applicant Jobname:', applicant.jobName) //debugging
        // console.log('Filter Jobname:', filter.jobname)
        const isPositionMatch = filter.jobname
            ? applicant.jobName && applicant.jobName.toLowerCase() === filter.jobname.toLowerCase()
            : true;
        const isDateMatch = (!filter.startDate || new Date(applicant.submittedAt) >= new Date(filter.startDate)) &&
                            (!filter.endDate || new Date(applicant.submittedAt) <= new Date(filter.endDate));
        return isPositionMatch && isDateMatch;
    });

    const totalApplicants = filteredApplicants.length;
    const acceptedApplicants = filteredApplicants.filter(applicant => applicant.status === 'Accepted').length;
    const rejectedApplicants = filteredApplicants.filter(applicant => applicant.status === 'Rejected').length;

    return (
    <div className='container-dashboard'>
        <Navbar/>

        <DashboardTitle/>
        <Filter filter={filter} onFilterChange={handleFilterChange}/>

        <ApplicantInfo total={totalApplicants} accepted={acceptedApplicants} rejected={rejectedApplicants} />
        <TableApplicant applicants={filteredApplicants} filter={filter}/>

    </div>  
  )
}

function Filter({ filter, onFilterChange }){
    const [jobNames, setJobNames] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/jobs?positionsOnly=true')  // Use query parameter to get only job positions
            .then(response => response.json())
            .then(data => setJobNames(data))
            .catch(error => console.error('Error fetching job positions:', error));
    }, [])

    
    
    const handlePositionChange = (event) => {
        onFilterChange({
            type: 'jobname',
            value: event.target.value
        });
    }
    const handleStartDateChange = (event) => {
        onFilterChange({
            type: 'startDate',
            value: event.target.value
        });
    };

    const handleEndDateChange = (event) => {
        onFilterChange({
            type: 'endDate',
            value: event.target.value
        });
    }

    const handleReset = () => {
        onFilterChange({ type: 'jobname', value: '' });
        onFilterChange({ type: 'startDate', value: '' });
        onFilterChange({ type: 'endDate', value: '' });
    };
    
    return(
        <div className='filter'> 
            <div className="filter-1"> 
                <label htmlFor="start">Start</label>
                <input type="date" id="start" className="date-input" value={filter.startDate} onChange={handleStartDateChange}/>
            </div>
            <div className="filter-3"> 
                <label htmlFor="end">End</label>
                <input type="date" id="end" className="date-input" value={filter.endDate} onChange={handleEndDateChange}/>
            </div>
            <div className="filter-2">
                <label htmlFor="position-search">Position</label> 
                <select id="position-search" className="dropdown" value={filter.jobname} onChange={handlePositionChange}>
                    <option value="">All</option>
                    {jobNames.map((job, index) => (
                        <option key={index} value={job.jobname}>{job.jobname}</option>
                    ))}
                </select>
            </div>
            <button type="button" className="reset-filter-button" onClick={handleReset} >
                Reset Filter
            </button>
        </div>
    )
}

function ApplicantInfo({total, accepted, rejected}){
    return(
        <div className='applicant-info'>
            <div className='box-1'>
                <h1> {total} </h1>
                <h3>Total Applicant</h3>
            </div>
            <div className='box-2'>
                <h1> {accepted} </h1>
                <h3>Accepted</h3>
            </div>
            <div className='box-3'>
                <h1> {rejected} </h1>
                <h3>Rejected</h3>
            </div>
        </div>
    )
}

function TableApplicant({applicants, filter}){
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    //sort
    const sortedApplicants = [...applicants].sort((a, b) => b.score - a.score)

    // hitung index
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = sortedApplicants.slice(indexOfFirstItem, indexOfLastItem)
    
    // total pages
    const totalPages = Math.ceil(sortedApplicants.length / itemsPerPage)
    
    //tetap tampilkan 10 row / pages
    const placeholderRows = Array.from({ length: itemsPerPage - currentItems.length }, (_, index) => (
        <tr key={`placeholder-${index}`}>
          <td>{indexOfFirstItem + currentItems.length + index + 1}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
    ));

    // prev button
    const handlePrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    //next button
    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
    }
    
    function formatSalary(value) {
        if (typeof value !== 'string') {
            value = String(value)
        }
        const rawValue = value.replace(/\D/g, '') // format salary to from "6000000" to "6.000.000"
        return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }

    return(
        <div className="container-4">
            <table className="top10">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>CV</th>
                        <th>Position Applied</th>
                        <th>Email</th>
                        <th>Ekspektasi Gaji</th>
                        <th>Status</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((applicant, index) => (
                            <tr key={indexOfFirstItem + index + 1}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{applicant.name}</td>
                                <td>
                                    {applicant.cv ? (
                                        <a href={`http://localhost:5000/cv-uploads/${applicant.cv}`} target="_blank" rel="noopener noreferrer">
                                            {applicant.cv}
                                        </a>
                                    ) : (
                                        'No CV'
                                    )}
                                </td>
                                <td>{applicant.jobName}</td>
                                <td>{applicant.email}</td>
                                <td>Rp. {formatSalary(applicant.salary) + ",00" }</td>
                                <td>{applicant.status}</td>
                                <td>{applicant.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="no-data-available">
                                <p>No Data Available</p>
                            </td>
                        </tr>
                    )}
                    {currentItems.length > 0 && placeholderRows}
                </tbody>
                
            </table>
            <div className="foot-layer">
                <div className="dashboard-button-group">
                    <button type="button" className="prev-button" 
                    onClick={handlePrevious} disabled={currentPage === 1 || sortedApplicants.length === 0}>Previous</button>
                    <button type="button" className="next-button"
                    onClick={handleNext} disabled={currentPage === totalPages || sortedApplicants.length === 0}>Next</button>
                </div>
                <div className="dashboard-entries">
                    <p>Showing <strong>{indexOfFirstItem + 1}</strong> to <strong>{Math.min(indexOfLastItem, applicants.length)}</strong> of {applicants.length} entries </p>
                </div>
            </div>
        </div>
    )
}

function DashboardTitle (){
    return(
        <div className="dashboard-title">
            <h2>HCD Dashboard</h2>
        </div>
    )
}