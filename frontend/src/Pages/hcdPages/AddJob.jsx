
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'

import '../../Assets/Styles/AddJob.css'
import Navbar from '../../Components/Navbar'


//HCD Add Job Feature
export default function AddJob() {
    const [formDescription, setFormDescription] = useState({
        jobname: '',
        jobAimed: '',
        dateStart: '',
        dateEnd: '',
        jobDescription: ''
    })

    const [formKriteria, setFormKriteria] = useState({
        minPositionExperience: '',
        maxPositionExperience: '',
        minIndustryExperience: '',
        maxIndustryExperience: '',
        minSalary: '',
        maxSalary: '',
        languages: []
    });

    const navigate = useNavigate();

    const handleChangeDescription = (e) => {
        const { name, value } = e.target;
        setFormDescription({
            ...formDescription,
            [name]: value
        });
    };

    const handleChangeKriteria = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormKriteria(prevState => ({
                ...prevState,
                languages: checked
                    ? [...prevState.languages, value]
                    : prevState.languages.filter(lang => lang !== value),
            }));
        } else {
            setFormKriteria({
                ...formKriteria,
                [name]: value
            });
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try{
            await axios.post('http://localhost:5000/jobs/add', { ...formDescription, ...formKriteria })
            // console.log(response.data)
            navigate('/posted-job')
        } catch(error){
            console.error("there was an error posting the job!", error)
        } 
    };
  
    return (
    <div>
        <Navbar/>
        <div className="container-form" onSubmit={handleSubmit}>
            <form className='hcd-form' >
                <DescriptionInput formDescription={formDescription} handleChange={handleChangeDescription}/>
                <KriteriaInput formKriteria={formKriteria} handleChange={handleChangeKriteria}/>
                <div className='post-job'>
                    <button type='submit' name='postjob' >Post Job</button>
                </div>
            </form>
            
        </div>
    </div>
  )
}

function DescriptionInput({ formDescription, handleChange }){
    
    return(
        <div className='form-awal'>
            <div className='form-deskripsi'>
                <h1>JOB DESKRIPSI</h1>
                <label htmlFor="Jobname">Nama job yang akan dibuka?</label>
                <input type="text" id='Jobname' name="jobname" placeholder='type the job name here...' required
                onChange={handleChange} value={formDescription.jobname}/>

                <label>Job ditujukan untuk?</label>
                <div className="radio-group">
                    <label><input type="radio" name="jobAimed" value="Fresh Graduate" autoComplete="off" 
                    onChange={handleChange} checked={formDescription.jobAimed === 'Fresh Graduate'}/> Fresh Graduate Hire </label>
                    <label><input type="radio" name="jobAimed" value="Professional Hire"  autoComplete="off"
                    onChange={handleChange} checked={formDescription.jobAimed === 'Professional Hire'}/> Professional Hire </label>
                </div>

                <div>
                    <p>Atur Deadline</p>
                </div>
                <div className='deadline'>
                    <div className='start'>
                        <label htmlFor="DateStart">Tanggal Dimulai</label>
                        <input type="date" name="dateStart" id="DateStart" min={new Date().toISOString().split("T")[0]} required
                        onChange={handleChange} value={formDescription.dateStart}/>
                    </div>
                    <div className="end">
                        <label htmlFor="DateEnd">Tanggal Berakhir</label>
                        <input type="date" name="dateEnd" id="DateEnd" min={new Date().toISOString().split("T")[0]} required
                        onChange={handleChange} value={formDescription.dateEnd} />
                    </div>
                </div>
                
                <label htmlFor="JobDescription">Deskripsi Requirement</label>
                <textarea name="jobDescription" id="JobDescription" placeholder='Type the job description here...' required
                onChange={handleChange} value={formDescription.jobDescription} ></textarea>
            </div>  
        </div>
    )
}


function KriteriaInput({ formKriteria, handleChange }){
    
    return(
        <div className='form-akhir'>
            <div>
                <h1>ATUR KRITERIA AWAL</h1>
            </div> 
            <div className='form-kriteria'>
                <FormLeft formKriteria={formKriteria} handleChange={handleChange}/>
                <FormRight formKriteria={formKriteria} handleChange={handleChange}/>
            </div>
        </div>
    )
}

function FormLeft({ formKriteria, handleChange }){
    return(
        <div className="box-left">
            <p>Lama pengalaman kerja di posisi ini?</p>
            <div className="box-min-max">
                <label htmlFor="MinPositionExperience">Minimum</label>
                <input type="number" name="minPositionExperience" id="MinPositionExperience" min="0" step="1" required 
                onChange={handleChange} value={formKriteria.minPositionExperience}/>        
                <label htmlFor="MaxPositionExperience">Maximum</label>
                <input type="number" name="maxPositionExperience" id="MaxPositionExperience" min="0" step="1" required 
                onChange={handleChange} value={formKriteria.maxPositionExperience}/>
            </div>
            <p>Lama pengalaman kerja di industri ini?</p>
            <div className="box-min-max">
                <label htmlFor="MinIndustryExperience">Minimum</label>
                <input type="number" name="minIndustryExperience" id="MinIndustryExperience" min="0" step="1" required
                onChange={handleChange} value={formKriteria.minIndustryExperience}/>
                <label htmlFor="MaxIndustryExperience">Maximum</label>
                <input type="number" name="maxIndustryExperience" id="MaxIndustryExperience" min="0" step="1" required
                onChange={handleChange} value={formKriteria.maxIndustryExperience}/>
            </div>   
        </div>
    )
}

function FormRight({ formKriteria, handleChange }){
    return(
        <div className="box-right">
            <p>Ekspektasi gaji</p>
            <div className="box-min-max">
                <label htmlFor="MinSalary">Minimum</label>
                <input type="number" name="minSalary" id="MinSalary" min="0" step="50000" required
                onChange={handleChange} value={formKriteria.minSalary}/>
                <label htmlFor="MaxSalary">Maximum</label>
                <input type="number" name="maxSalary" id="MaxSalary" min="0" step="50000" required
                onChange={handleChange} value={formKriteria.maxSalary}/>
            </div>
            <p>Kemampuan bahasa asing yang diharuskan</p>
            <div className='check-box'>
                <input type="checkbox" name="languages" value="english" id='English'
                onChange={handleChange} checked={formKriteria.languages.includes("english")}/>
                <label htmlFor="English">English</label>
                <input type="checkbox" name="languages" value="mandarin" id='Mandarin'
                onChange={handleChange} checked={formKriteria.languages.includes("mandarin")}/>
                <label htmlFor="Mandarin">Mandarin</label> 
            </div>  
        </div>
    )
}