import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container-fluid panel-footer p-3 text-center mt-0 fs-6 " 
    style={{ backgroundColor: '#f8f9fa'}}>
   
      <div className='d-flex flex-column align-items-center justify-content-center '>
        
        <p  > <span className="fw-bold" >Cette application web a été crée</span> avec Vite, Bootstrap, Expressjs, nodejs et mongoDB ,  
        <span className="fst-italic">{" "} Copyright © 2024 by Marilyne Rios</span> </p>
      
        <div>
        <Link
          href="mailto:Roads<rios.marilyne@gmail.com"
          className="link-underline-light link-primary link-offset-2 link-underline-opacity-100-hover fs-5 mx-2"
        >
          Contact
        </Link>
        <Link
          href="https://github.com/MarilyneRios"
          target="_blank"
          className="link-underline-light link-primary link-offset-2 link-underline-opacity-100-hover fs-5 mx-2"
        >
         GitHub
        </Link>
        <Link
          href="https://www.linkedin.com/in/marilyne-rios-59a13015b"
          target="_blank"
          className="link-underline-light link-primary link-offset-2 link-underline-opacity-100-hover fs-5"
        >
          Linkedin
        </Link>
        </div>

      </div>
    </div>
  )
}

export default Footer




   