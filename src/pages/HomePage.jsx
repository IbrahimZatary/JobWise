import '../Styles/Home.css'
import imageFirstLokk from '../assets/man-climp-final.png'
import backGroundPicture from '../assets/NY.jpg'
const Home = function ()
{
    return (
        <>
        
        <div className="home-page">

                    {/* Start First look section */}
                    <div className="container-card">
                            <div className="cards">
                                        <div className="card">
                                            <h2>
                                                Find the Career That Fits You .
                                            </h2>
                                                <p>
                                                    Discover the career that fits your passions
                                                    . Explore your top career options, growth potential, and salary insights.
                                                    Plan your future with personalized courses and clear next steps.
                                                </p>
                                        </div>
                                        <div className="card">
                                            <div className="image">
                                                <img src={imageFirstLokk} alt="Description" />

                                                </div>
                                        </div>
                            </div>
                    </div>
                    {/* END First  look section */}

                    {/* Start cards 3 cards  section */}
                    <p className='text-area'>Top Careers in High Demand for 2025</p>
                    
                <div className="section-cards">
                    <div className="cards-common">
                                        <div className="card-job">
                                                <h2>AI & Machine Learning Engineer</h2>
                                                <p>Designs intelligent systems that analyze data, automate decisions,
                                                    and power modern applications across industries using advanced algorithms
                                                    and predictive models. </p>
                                                <button class="button">                
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                                                    </svg><div class="text">
                                                                    <a
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: "inherit",
                                                                        cursor: "pointer"
                                                                      }} 
                                                                    target="_blank" href="https://www.folioworks.com/job-market-report-machine-learning" >Explore</a>
                                                                    </div>

                                                                    </button>
                                        </div>

                                        <div className="card-job">
                                                <h2>Cybersecurity Specialist</h2>
                                                <p> LProtects digital systems and sensitive information
                                                    from cyber threats by monitoring networks,
                                                    preventing attacks, and ensuring data privacy and compliance. </p>
                                                <button class="button">                
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                                                    </svg><div class="text">
                                                                    <a 
                                                                    style={{
                                                                        textDecoration: "none",
                                                                        color: "inherit",
                                                                        cursor: "pointer"
                                                                      }} 
                                                                    target="_blank" href="https://onlinedegrees.sandiego.edu/cyber-security-specialist-career-guide/" >Explore</a>
                                                                    </div>

                                                                    </button>
                                        </div>

                                        <div className="card-job">
                                                <h2>Renewable Energy Engineer</h2>
                                                <p> Develops sustainable energy solutions such as solar and wind systems to
                                                    reduce environmental impact and support global transitions
                                                    to clean energy. </p>

                                                                    <button class="button">                
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                                                                    </svg><div class="text">
                                                                    <a
                                                                     style={{
                                                                        textDecoration: "none",
                                                                        color: "inherit",
                                                                        cursor: "pointer"
                                                                      }}
                                                                     target="_blank" href="https://enable.green/esg-roles/green-energy-careers/renewable-energy-engineer-job-description/" >Explore</a>
                                                                    </div>

                                                                    </button>

                                        </div>
                    </div>
                </div>
                    {/* END cards 3 cards  section */}

                    {/* Start lanscape + quoete*/}
                                    

                    <div className="photo">
                            <div className="section-photo">
                                    <div className="quote">
                                    <p>“<i> The secret of getting ahead is getting started. </i>”</p>
                                    <h3> <i>-Mark Twain</i> </h3>
                                    </div>
                            </div>
                    </div>


                    {/* End  lanscape + quoete*/}

        </div>
        </>
    )
}
export default Home;