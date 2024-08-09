import React, { useState } from 'react'
import '../../Assets/Styles/Form.css'
import axios from 'axios';
// import ReactDOM from 'react-dom/client';
import logo from '../../Assets/Images/r17panjang.png'


//Applicant Form
export default function Form({ job }) {
  
  const [showSuccess, setShowSuccess] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleModalPopUpSubmit = () => {
    
    setShowSuccess(true)
    setIsFormSubmitted(true)
    setTimeout(() => {
      setShowSuccess(false)
      // setIsFormSubmitted(false)
      }, 3000)
  };
  
  return (
    <div className='form-container'> 
      <FormHeader/>
      {!isFormSubmitted && <FormPertanyaan popUpSubmit={handleModalPopUpSubmit} job={job} />}
      {showSuccess && <div className="success-popup">Submit Success</div>}
    </div>
  );
}

function FormHeader(){
  return(
    <div className="header-form">
      <img src= {logo} alt="Company Logo" />
      <h1>R17 Career Form</h1>
    </div>
  )
}

function FormPertanyaan({popUpSubmit, job}){
  const initialBasicState = {
    name: '',
    email: '',
    phone: '',
    major: '',
    compatibility: '',
    gpa: '',
  };

  const initialAdvanceState = {
    positionExperience: '',
    industryExperience: '',
    salary: '',
    relocation: '',
    languages: [],
    // cv: null,
  };
  
  const [formBasic, setFormBasic] = useState(initialBasicState)

  const [formAdvance, setFormAdvance] = useState(initialAdvanceState)

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      ...formBasic, 
      ...formAdvance,
      salary: parseInt(formAdvance.salary.replace(/\./g, ''), 10),
      jobId: job._id,  
      jobName: job.jobname 
    }
    try {
      await axios.post('http://localhost:5000/applicants/submit', formData);
      popUpSubmit();
    } catch (error) {
        console.error('There was an error submitting the form!', error);
    }
    
    setFormBasic(initialBasicState)
    setFormAdvance(initialAdvanceState)
    // document.getElementById('CV').value = ''
  };

  

  return(
    <div className='form-pertanyaan' >
      <form className='form-data' onSubmit={handleSubmit}>
        <BasicQuestion formBasic={formBasic} setFormBasic={setFormBasic}/>
        <AdvanceQuestion formAdvance={formAdvance} setFormAdvance={setFormAdvance}/>
        <button type="submit"> Submit </button>
      </form>
    </div>
  )
}

function BasicQuestion({formBasic, setFormBasic}){
  const onChangeHandler = (e) => {
    setFormBasic({
      ...formBasic,
      [e.target.name]: e.target.value
    })
  }

  return(
    <div className='basic-pertanyaan'>

      <label htmlFor="Name">Name?*</label>
      <input type="text" id="Name" name="name" placeholder='Type your name here...' required
      value={formBasic.name} onChange={onChangeHandler} autoComplete="off"/>
      

      <label htmlFor="Email">Email*</label>
      <input type="email" id="Email" name="email" placeholder='Type your email here...' required
      value={formBasic.email} onChange={onChangeHandler} autoComplete="off"/>

      <label htmlFor="Phone">No Handphone*</label>
      <input type="tel" id="Phone" name="phone" placeholder='Type your phone number here...' required
      value={formBasic.phone}  onChange={onChangeHandler} autoComplete="off"/>

      <label htmlFor="Major">Jurusan Kuliah*</label>
      <input type="text" id="Major" name="major" placeholder='Type your major here...' required
      value={formBasic.major} onChange={onChangeHandler} autoComplete="off"/>

      <label htmlFor="Compatibility">Seberapa cocok jurusan kuliahmu dengan posisi ini? (Scale 1-10)*</label>
      <input type="number" id="Compatibility" name="compatibility" min="1" max="10" placeholder='1-10' required
      value={formBasic.compatibility} onChange={onChangeHandler} autoComplete="off"/>

      <label htmlFor="GPA">IPK*</label>
      <input type="number" id="GPA" name="gpa" step="0.01" min="0" max="4" placeholder='Type your GPA here...' required
      value={formBasic.gpa} onChange={onChangeHandler} autoComplete="off"/>
    </div>
  )
}


function AdvanceQuestion({ formAdvance, setFormAdvance }){
  // const onChangeHandler = (e) => {
  //   const { name, value, type, files, checked } = e.target

  //   if (type === 'file') {
  //     setFormAdvance({
  //       ...formAdvance,
  //       [name]: files[0],
  //     })
  //   } else if (type === 'checkbox') {
  //     setFormAdvance({
  //       ...formAdvance,
  //       languages: checked 
  //         ? [...formAdvance.languages, value] 
  //         : formAdvance.languages.filter(lang => lang !== value),
  //     })
  //   } else {
  //     setFormAdvance({
  //       ...formAdvance,
  //       [name]: value,
  //     })
  //   }
  // }
  function formatSalary(value) {
    return value.replace(/\D/g, '') 
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  
  // function unformatSalary(value) {
  //   return value.replace(/\./g, ''); // Remove the thousand separators
  // }

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setFormAdvance({
        ...formAdvance,
        languages: checked 
          ? [...formAdvance.languages, value] 
          : formAdvance.languages.filter(lang => lang !== value),
      })
    } else if (name === 'salary'){
      const formattedValue = formatSalary(value)
      setFormAdvance({
        ...formAdvance,
        salary: formattedValue,
      })
    } else {
      setFormAdvance({
        ...formAdvance,
        [name]: value,
      })
    }
  }

  return(
    <div className="advantage-pertanyaan">
      <label>Berapa lama pengalaman kerjamu di posisi ini?*</label>
      <div className='form-radio-group'>
        <label><input type="radio" name="positionExperience" value="0-1" required onChange={onChangeHandler} 
        checked={formAdvance.positionExperience === "0-1"} autoComplete="off"/> 0-1 tahun</label>
        <label><input type="radio" name="positionExperience" value="1-3" onChange={onChangeHandler} 
        checked={formAdvance.positionExperience === "1-3"} autoComplete="off"/> 1-3 tahun</label>
        <label><input type="radio" name="positionExperience" value="3-5" onChange={onChangeHandler} 
        checked={formAdvance.positionExperience === "3-5"} autoComplete="off"/> 3-5 tahun</label>
        <label><input type="radio" name="positionExperience" value="5+" onChange={onChangeHandler} 
        checked={formAdvance.positionExperience === "5+"} autoComplete="off"/> Lebih dari 5 tahun</label>
      </div>

      <label>Berapa lama pengalaman kerjamu di industri ini?*</label>
      <div className='form-radio-group'>
        <label><input type="radio" name="industryExperience" value="0-1" required onChange={onChangeHandler} 
        checked={formAdvance.industryExperience === "0-1"} autoComplete="off"/> 0-1 tahun</label>
        <label><input type="radio" name="industryExperience" value="1-3" onChange={onChangeHandler} 
        checked={formAdvance.industryExperience === "1-3"} autoComplete="off"/> 1-3 tahun</label>
        <label><input type="radio" name="industryExperience" value="3-5" onChange={onChangeHandler} 
        checked={formAdvance.industryExperience === "3-5"} autoComplete="off"/> 3-5 tahun</label>
        <label><input type="radio" name="industryExperience" value="5+" onChange={onChangeHandler} 
        checked={formAdvance.industryExperience === "5+"}autoComplete="off"/> Lebih dari 5 tahun</label>
      </div>

      <label>Kemampuan bahasa asing yang dikuasai?</label>
      <div className='form-check-box'>
        <div className="form-checkbox-border">
          <input type="checkbox" name="languages" value="english" id='English' onChange={onChangeHandler} 
          checked={formAdvance.languages.includes("english")} autoComplete="off"/>
          <label htmlFor="English">English</label>
        </div>
        <div className="form-checkbox-border">
          <input type="checkbox" name="languages" value="mandarin" id='Mandarin' onChange={onChangeHandler} 
          checked={formAdvance.languages.includes("mandarin")} autoComplete="off"/>
          <label htmlFor="Mandarin">Mandarin</label> 
        </div>
      </div>

      <label htmlFor="Salary">Ekspektasi Gaji?*</label>
      <input type="text" id="Salary" name="salary" min="0" step="50000" placeholder='Type your salary expectation here...' required 
      onChange={onChangeHandler} value={formAdvance.salary} autoComplete="off"/>

      <label>Bersedia ditempatkan dimana saja?*</label>
      <div className='form-radio-group'>
        <label><input type="radio" name="relocation" value="yes" required onChange={onChangeHandler}
        checked={formAdvance.relocation === "yes"} autoComplete="off"/> Ya </label>
        <label><input type="radio" name="relocation" value="no" onChange={onChangeHandler}
        checked={formAdvance.relocation === "no"} autoComplete="off"/> Tidak </label>
      </div>
      
      {/* <label htmlFor="CV">Upload CV*</label>
      <input type="file" id="CV" className='upload-input' name="cv" accept="application/pdf "placeholder='Upload your resume here...' 
      required onChange={onChangeHandler} autoComplete="off"/> */}
    
    </div>
  )
}



