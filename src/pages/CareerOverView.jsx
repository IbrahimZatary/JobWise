const CareerView = function ()
{
    return (
        <>
      
      <div className="career">
        <div className="container">
          <p>Analyzing your skills and passions,
            our system has selected
            the top 3 career paths tailored specifically for you</p>
             {/* jobs courses section  */}
            <div className="cards">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
            <br />
            {/* cards courses section  */}
            <div className="cards-courses">
              <div className="card"></div>
              <div className="card"></div>
              <div className="card"></div>
            </div>
            {/* Salaries cards for each job selection */}
            <br />
            <button>
            Restart & Explore Other Careers
            </button>
            
        </div>
      </div>
       
        </>
    )
}
export default CareerView;