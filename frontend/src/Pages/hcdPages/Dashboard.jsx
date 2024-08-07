import React from 'react'
import '../../Assets/Styles/Dashboard.css'
import Navbar from '../../Components/Navbar'
import { useState } from 'react'


//HCD Dashboard Feature
export default function Dashboard() {
    
    const [filter, setFilter] = useState({
        position: '',
        startDate: '',
        endDate: ''
    });

    const handleFilterChange = (newFilter) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            [newFilter.type]: newFilter.value
        }));
    };
    

    const applicants = [
        { name: 'Alice Johnson', cv: 'CV_Alice_Johnson', position: 'Software Engineer', status: 'Accepted', score: 95, timestamp: '2024-07-15' },
        { name: 'Bob Smith', cv: 'CV_Bob_Smith', position: 'Data Analyst', status: 'Rejected', score: 60, timestamp: '2024-07-16' },
        { name: 'Charlie Brown', cv: 'CV_Charlie_Brown', position: 'Business Analyst', status: 'Accepted', score: 88, timestamp: '2024-07-17' },
        { name: 'Diana Prince', cv: 'CV_Diana_Prince', position: 'Designer', status: 'Accepted', score: 92, timestamp: '2024-07-18' },
        { name: 'Edward Elric', cv: 'CV_Edward_Elric', position: 'Project Coordinator', status: 'Accepted', score: 85, timestamp: '2024-07-19' },
        { name: 'Fiona Glenanne', cv: 'CV_Fiona_Glenanne', position: 'Business Analyst', status: 'Rejected', score: 55, timestamp: '2024-07-20' },
        { name: 'George Michael', cv: 'CV_George_Michael', position: 'Software Engineer', status: 'Accepted', score: 90, timestamp: '2024-07-21' },
        { name: 'Hannah Montana', cv: 'CV_Hannah_Montana', position: 'Designer', status: 'Accepted', score: 78, timestamp: '2024-07-22' },
        { name: 'Isaac Newton', cv: 'CV_Isaac_Newton', position: 'Software Engineer', status: 'Rejected', score: 62, timestamp: '2024-07-23' },
        { name: 'Jane Austen', cv: 'CV_Jane_Austen', position: 'Business Analyst', status: 'Accepted', score: 91, timestamp: '2024-07-24' },
        { name: 'Keenan Ariqul Hashim', cv: 'CV_Keenan_Ariqul_Hashim', position: 'Business Analyst', status: 'Accepted', score: 100, timestamp: '2024-07-25' }
    ];

    const filteredApplicants = applicants.filter(applicant => {
        const isPositionMatch = filter.position ? applicant.position.toLowerCase() === filter.position.toLowerCase() : true;
        const isDateMatch = (!filter.startDate || new Date(applicant.timestamp) >= new Date(filter.startDate)) &&
                            (!filter.endDate || new Date(applicant.timestamp) <= new Date(filter.endDate));
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
    const handlePositionChange = (event) => {
        onFilterChange({
            type: 'position',
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
                <select id="position-select" className="dropdown" value={filter.position} onChange={handlePositionChange}>
                    <option value="">All</option>
                    <option value="software engineer">Software Engineer</option>
                    <option value="data analyst">Data Analyst</option>
                    <option value="business analyst">Business Analyst</option>
                    <option value="designer">Designer</option>
                    <option value="project coordinator">Project Coordinator</option>
                </select>
            </div>
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
    
    return(
        <div className="container-4">
            <table className="top10">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>CV</th>
                        <th>Position Applied</th>
                        <th>System's Status</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((applicant, index) => (
                            <tr key={indexOfFirstItem + index + 1}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{applicant.name}</td>
                                <td>{applicant.cv}</td>
                                <td>{applicant.position}</td>
                                <td>{applicant.status}</td>
                                <td>{applicant.score}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-data-available">
                                <p>No Data Available</p>
                            </td>
                        </tr>
                    )}
                    {currentItems.length > 0 && placeholderRows}
                </tbody>
                
            </table>
            <div className="foot-layer">
                <div className="button-group">
                    <button type="button" className="prev-button" 
                    onClick={handlePrevious} disabled={currentPage === 1 || sortedApplicants.length === 0}>Previous</button>
                    <button type="button" className="next-button"
                    onClick={handleNext} disabled={currentPage === totalPages || sortedApplicants.length === 0}>Next</button>
                </div>
                <div className="entries">
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