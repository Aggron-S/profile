import React from "react";
import {
  aboutMe2, coding, workout, pizza, sleeping, finishStudies,
  goodJob, earnMoney, helpFamily, buyWhatIWant, cpp, python,
  java, html, css, js
} from "./js/imports";

// Firebase Imports
import { db, storage } from "./js/imports";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";


export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      hasData: false,
      projects: []
    }
  }
  #getProjects = async () => {
    try {
      const projectsSnapshot = await getDocs(collection(db, "my_projects"));

      const data = projectsSnapshot.docs.map(async doc => {
        // Get data from firebase storage
        const directoryRef = ref(storage, "images");
        const listResult = await listAll(directoryRef);
        
        const imageUrls = {};
        await Promise.all(listResult.items.map(async (itemRef) => {
          const imageUrl = await getDownloadURL(itemRef);
          const filename = itemRef.name;
          imageUrls[filename.split('.').slice(0, -1).join('.').toLowerCase()] = imageUrl;
        }));

        return {
          ...doc.data(),
          imageUrls: imageUrls
        };
      });
  
      const projects = await Promise.all(data);
      this.setState({ projects: projects, hasData: true });
    } catch (error) {
      console.log(error);
      this.setState({ hasData: false });
    }
  }
  // Initial External data fetching (same as useEffect in functional component with empty dependency array)
  componentDidMount() {
    this.#getProjects();
  }

  render() {
    return (
      <main>
        {/* About Me */}
        <div className="about-me bg-med-gray" id="abt-me">
          <div className="container py-3">
            <section className="row row-cols-1 row-cols-sm-1 row-cols-lg-2">
              <div className="col">
                <img className="img-fluid abt-me-img-properties" src={aboutMe2} alt=""/>
              </div>
              <div className="col">
                <h1 className="text-center fw-bolder pb-5 my-txt-black abt-me-txt">About Me<br/>
                  <small className="text-start lead">
                    I am Warren, an Information Technology student who is passionately fascinated by the 
                    ever-evolving world of web development. My journey in this field began with a deep 
                    curiosity and a desire to innovate web solutions that are not just timely and relevant, 
                    but truly transformative. Web development is more than just a skill for me, it's a calling. 
                    It is about embracing challenges, solving problems, and most importantly, bringing innovative 
                    solutions to the forefront. Whether it's optimizing performance, enhancing user experiences, or 
                    ensuring robust security, I am driven to find creative and efficient ways to address these needs.
                    {/* I am Warren, an Information Technology student who are a big fan of
                    cybersecurity experts which keeps our internet security as what it is today.
                    Cybersecurity bears a major challenge to the experts across the globe, and I am willing
                    to take my part to help solve that matter, fight online crimes, develop and implement mitigation 
                    strategies as well as to learn more about threats which affects the way internet works. */}
                  </small>
                </h1>
              </div>
            </section>
          </div>
        </div>

        {/* Hobbies */}
        <div className="hobbies my-bg-color-primary" id="hb">
          <div className="container pt-5">
            <h1 className="text-center text-light fw-bolder">Hobbies</h1>
            <section className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 mt-5">
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={coding} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Love to code</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={workout} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Love to do workout</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={pizza} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Love to eat</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={sleeping} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Love to sleep</h5>
              </div>
            </section>
          </div>
        </div>
        

        {/* Goals/Plan */}
        <div className="goals bg-color-lawrencium " id="gl">
          <div className="container py-5">
            <h1 className="text-center text-light pt-3 fw-bolder">Goals / Plan</h1>

            <section className="row row-cols-1">
              {/* <!-- 1st Goal --> */}
              <div className="col first-goal-col">
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 ">
                  <div className="col first my-5">
                    <img className="img-fluid float-start my-goal-img-properties pb-5" src={finishStudies} alt=""/>
                  </div>
                  <div className="col sec my-5">
                    <h1 className="h1 text-light fw-bolder pb-5"> Finish Studies <br/> 
                      <small className="h6 lead">
                        Nothing can make my parents very proud of me than finishing my studies. It is also like an achievement to them
                        given that having a quality education is hard to attain. You have to exert a lot of time and effort as well as tons of money
                        just to give your child better quality education he/she deserves. For me, it is worth all my time and effort to see myself
                        accomplished studying.
                      </small>
                    </h1>
                  </div>
                </div>
              </div>

              {/* <!-- 2nd Goal --> */}
              <div className="col sec-goal-col">
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
                  <div className="col first my-5">
                    <h1 className="h1 text-light fw-bolder pb-5"> Get a Good Job <br/>
                      <small className="h6 lead">
                        Having a good and stable job is necessary for me to help my family in terms of providing their daily needs as well as to buy
                        whatever I want. Also, preparing for future life events are essential and that is when having a stable job can be really beneficial.
                      </small>
                    </h1>
                  </div>
                  <div className="col sec my-5">
                    <img className="img-fluid float-end my-goal-img-properties pb-5" src={goodJob} alt=""/>
                  </div>
                </div>  
              </div>

              {/* <!-- 3rd Goal --> */}
              <div className="col third-goal-col">
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
                  <div className="col first my-5">
                    <img className="img-fluid float-start my-goal-img-properties pb-5" src={earnMoney} alt=""/>
                  </div>
                  <div className="col sec my-5">
                    <h1 className="h1 text-light fw-bolder pb-5"> Earn and Save Money <br/>
                      <small className="h6 lead">
                        Being able to respond in times of family crisis is one of my goals in life and I can be able to achieve that with the help
                        of enough money in my savings. Earning a money takes a lot of hardwork and thus, saving a portion of it everytime can be really helpful
                        in times of family crisis.
                      </small>
                    </h1>
                  </div>
                </div>
              </div>

              {/* <!-- 4th Goal --> */}
              <div className="col fourth-goal-col">
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
                  <div className="col first my-5">
                    <h1 className="h1 text-light fw-bolder pb-5"> Help My Family <br/>
                      <small className="lead">
                        To help my family is one of my top priorities that's why I am pursuing my studies. I am truly aware of all the hardships my parents
                        had faced in life just to provide our daily needs and wants. That is why it is necessary for me to bring back their love and kindness
                        to us, their children by means of studying hard, finish studies and get a good job for us to have a good life in the future.
                      </small>
                    </h1>
                  </div>
                  <div className="col sec my-5">
                    <img className="img-fluid float-end my-goal-img-properties pb-5" src={helpFamily} alt=""/>
                  </div>
                </div>
              </div>

              {/* <!-- 5th Goal --> */}
              <div className="col fifth-goal-col">
                <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2">
                  <div className="col first my-5">
                    <img className="img-fluid float-start my-goal-img-properties pb-5" src={buyWhatIWant} alt=""/>
                  </div>
                  <div className="col sec my-5">
                    <h1 className="h1 text-light fw-bolder pb-5"> Buy Whatever I Want <br/>
                      <small className="lead">
                        Most of us wants to have things which we usually don't have in life or never experienced to have any. Being able to buy what I
                        want is also an achievement to me. Happiness brought by things which I can afford for me is irreplaceable and inspires me to work
                        even better for my future.
                      </small>
                    </h1>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Projects */}
        {this.state.hasData && (
          <div className="projects bg-med-gray" id="my-proj">
            <div className="container py-5">
              <h1 className="text-center my-txt-black pt-3 fw-bolder">My Projects</h1>

              {this.state.projects.length > 0 && (
                <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-5">
                  {this.state.projects.map(proj => (
                    <a key={proj.id} href="#my-proj" className="col d-flex flex-column justify-content-center align-items-center text-decoration-none text-reset outline-0">
                      <img 
                        src={proj.imageUrls[proj.project_name]} 
                        className="proj-ico" 
                        alt="proj-img" 
                      />
                      <h5 className="h5 text-center my-txt-black mt-3 mb-5 my-hobby-txt">{proj.project_name}</h5>
                    </a>
                  ))}
                </section>
              )}
            </div>
          </div>
        )}

        {/* <!-- Expertise --> */}
        <div className="expertise my-bg-color-secondary" id="exp">
          <div className="container py-5">
            <h1 className="text-center text-white mb-5 fw-bolder">Expertise</h1>
            <section className="row row-cols-1 row-cols-sm-3 row-cols-md-6 mt-5">

              {/* <!-- Cpp --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid" src={cpp} alt="c++-img" title="C++" data-bs-toggle="modal" data-bs-target="#cppModal"/>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="cppModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">C++</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid" src={cpp} alt=""/>
                          </div>
                          <div className="col">
                            <p>
                              This is the first programming language that I have learned back in 2020. It introduced me to the world of programming as well
                              as capabilities of every programming languages in terms of building applications and controlling each and every aspect of it.
                              It gave me an idea about how applications work, by means of several conditions set by the programmer to achieve the desired output.
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Python --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid my-goal-icon-properties" src={python} alt="python-img" title="Python" data-bs-toggle="modal" data-bs-target="#pyModal"/>
                {/* <!-- Modal --> */}
                <div className="modal fade" id="pyModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">Python</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid mt-5" src={python} alt=""/>
                          </div>

                          <div className="col">
                            <p>
                              This is the second programming language that I have learned and is the easiest one for me in terms of code implementation,
                              due to its simpler syntax. It gave me a lot of flexibility when it comes to programming considering the short amount of time
                              given to accomplish task. I am able to develop an application as a prerequisite to the subject "Advanced Computer Programming"
                              during my second year in college using Python. 
                            </p>
                          </div>
                        </div>
                      </div>
    
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
    
                    </div>
                  </div>
                </div>
              </div>
    
              {/* <!-- Java --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid" src={java} alt="java-img" title="Java" data-bs-toggle="modal" data-bs-target="#javaModal"/>
    
                {/* <!-- Modal --> */}
                <div className="modal fade" id="javaModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">Java</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid" src={java} alt=""/>
                          </div>
                          <div className="col">
                            <p>
                              For me, Java is better than C++ due to the fact that it uses automatic pointers, reducing complexity especially for
                              beginners. When I started programming, I don't really understand how pointers work and it gave me a lot of headache especially
                              when there is a deadline on the way and that's when Java start to save me from frustration.
                            </p>
                          </div>
                        </div>
                      </div>
    
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* <!-- HTML5 --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid" src={html} alt="html-5-img" title="HTML5" data-bs-toggle="modal" data-bs-target="#htmlModal"/>
    
                {/* <!-- Modal --> */}
                <div className="modal fade" id="htmlModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">HTML</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid mt-5" src={html} alt=""/>
                          </div>
                          <div className="col">
                            <p>
                              HTML introduced me the structure of a website, as well as how it was being made. With little to no knowledge about programming,
                              HTML guided me with the basics. From structuring a website and manipulating each and every elements in the code to understanding
                              its relationship with each other HTML made me realize how proper code organization can help better understand the workings
                              of it. Code cleanliness and conciseness also needs to be observed when programming and with the help of HTML, I learned how it was done.                    
                            </p>
                          </div>
                        </div>
                      </div>
    
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* <!-- CSS3 --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid" src={css} alt="css-3-img" title="CSS3" data-bs-toggle="modal" data-bs-target="#cssModal"/>
    
                {/* <!-- Modal --> */}
                <div className="modal fade" id="cssModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">CSS</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid" src={css} alt=""/>
                          </div>
                          <div className="col">
                            <p>
                              This language gave me an idea to create beyond what is necessary and to expand my creativity. This helped me better 
                              organize my HTML elements, as well as to add design for a better website presentation.
                            </p>
                          </div>
                        </div>
                      </div>
    
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    
              {/* <!-- JavaScript --> */}
              <div className="col mb-5">
                <img className="exp-ico mx-auto d-block img-fluid" src={js} alt="javascript-img" title="JavaScript" data-bs-toggle="modal" data-bs-target="#jsModal"/>
    
                {/* <!-- Modal --> */}
                <div className="modal fade" id="jsModal">
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
    
                      {/* <!-- Modal Header --> */}
                      <div className="modal-header">
                        <h4 className="modal-title">JavaScript</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                      </div>
    
                      {/* <!-- Modal body --> */}
                      <div className="modal-body">
                        <div className="row row-cols-2">
                          <div className="col">
                            <img className="img-fluid" src={js} alt=""/>
                          </div>
                          <div className="col">
                            <p>
                              I am currently learning this language and I would love to explore further so that I can enhance my website capabilities.
                              Better functionality as well as interactivity is one of my future goals in developing a website and I can achieve that with
                              the help of JavaScript.
                            </p>
                          </div>
                        </div>
                      </div>
    
                      {/* <!-- Modal footer --> */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            </section>
          </div>
        </div>
      </main>
    );
  }
}