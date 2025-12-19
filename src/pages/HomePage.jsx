import '../Styles/Home.css'
import imageFirstLokk from '../assets/man-climp-final.png'
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

        {/* Start cards  look section */}

                    <div className="section-comm-jobs">
                        <div className="container">
                            <div className="card"></div>
                            <div className="card"></div>
                            <div className="card"></div>
                        </div>

                    </div>
            {/* Start cards  look section */}

            {/* Start lanscape + quoete*/}
                    <div className="section-landscape">
                <div className="container">
                    <img src="" alt="" />
                </div>
            </div>


            {/* End  lanscape + quoete*/}

        </div>









        </>
    )
}
export default Home;