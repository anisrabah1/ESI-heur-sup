import { useState ,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const Teachers = () => {
    const [create, set_create] = useState(false);
    const [content, set_content] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        photo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        set_create(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle file input differently
        if (e.target.type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: e.target.files[0], // Store the file in state
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const rv = () => {
        if (create){
            set_create(false);
        }else{
            set_create(true);

        }
        
    };
    
    const [email,set_emai]=useState('y.f@gmail.com')
    const [password,set_password]=useState('12345678')
    const [t,set_t] = useState([])
        useEffect (() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1/comments');


                    const data = await response.json();
                    console.log(2)
                    console.log(data)
                    console.log(2)
                    

                    
                   set_t(data)
                    console.log('succsee!');
          
          
          
                    // You can store the token in localStorage or a state management library like Redux
                    // localStorage.setItem('token', token);
                  } catch (error) {
                     console.log(error)
                    
                  }
            };
            fetchData();
        });
        
        return ( 
        <div className="teachers">
            
            { !create && t.map((t)=>(
                <div className="teacher">
                    <div className="photo"></div>
                    <div className="info">data</div>
                    <div className="buttons"></div>
                </div>
                
            )) }:{





  <div className="form-container">
  

  

  {/* Form */}
  <form  onSubmit={handleSubmit}>
      {/* Name input */}
      <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="form-control"
          />
      </div>

      {/* Email input */}
      <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="form-control"
          />
      </div>

      {/* Phone input */}
      <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="form-control"
          />
      </div>

      {/* Photo input */}
      <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleInputChange}
              value={formData.photo}
              className="form-control"
          />
      </div>

      {/* Submit button */}
      <button type="submit" className="submit-button">Submit</button>
  </form>
</div>
 }





            <button className="floating-button" onClick={()=>{rv()}}>
            <FontAwesomeIcon icon={faPlus} />
            </button>  
        </div>
        
     );
}
 
export default Teachers;