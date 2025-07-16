import React from "react";
import {
  aboutMe2, websiteDevelopment, apiIntegration, businessProcessAutomation, softwareDevelopment,
  cpp, python, java, html, css, js
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
        <div className="about-me bg-med-gray" id="about-me">
          <div className="container py-3">
            <section className="row row-cols-1 row-cols-sm-1 row-cols-lg-2">
              <div className="col">
                <img className="img-fluid abt-me-img-properties" src={aboutMe2} alt=""/>
              </div>
              <div className="col">
                <h1 className="text-center fw-bolder pb-5 my-txt-black abt-me-txt">About Me<br/>
                  <small className="text-start lead">
                    I am Warren, a Software Specialist with experience helping businesses overcome technical 
                    challenges and unlock growth. My journey in this field began with a deep curiosity and a 
                    desire to innovate web solutions that are not just timely and relevant, but truly transformative.
                    Web development is more than just a skill for me, it's a calling. 
                    It is about embracing challenges, solving problems, and most importantly, bringing innovative 
                    solutions to the forefront. Whether it's optimizing performance, enhancing user experiences, or 
                    ensuring robust security, I am driven to find creative and efficient ways to address these needs.
                  </small>
                </h1>
              </div>
            </section>
          </div>
        </div>


        {/* Services Offered */}
        <div className="hobbies my-bg-color-primary" id="services-offered">
          <div className="container pt-5">
            <h1 className="text-center text-light fw-bolder">Services Offered</h1>
            <section className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4 mt-5">
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={websiteDevelopment} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Website Development</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={softwareDevelopment} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Software Development</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={apiIntegration} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Secure API Integration</h5>
              </div>
              <div className="col mb-5">
                <img className="img-fluid mx-auto d-block my-hobby-icon-properties" src={businessProcessAutomation} alt=""/>
                <h5 className="h5 text-center text-light mt-3 my-hobby-txt">Business Process Automation</h5>
              </div>
            </section>
          </div>
        </div>
        

        {/* Projects */}
        {this.state.hasData && (
          <div className="projects bg-med-gray" id="my-projects">
            <div className="container py-5">
              <h1 className="text-center my-txt-black pt-3 fw-bolder">My Projects</h1>

              {this.state.projects.length > 0 && (
                <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-5">
                  {this.state.projects.map(proj => (
                    <div key={proj.id} className="col d-flex flex-column justify-content-center align-items-center text-decoration-none text-reset outline-0">
                      <div className="proj-wrapper position-relative w-100">
                        <img 
                          src={proj.imageUrls[proj.project_name]} 
                          className="proj-ico w-100" 
                          alt="proj-img" 
                        />
                        {/* Overlay Content */}
                        <div className="overlay-content d-flex flex-column justify-content-between">
                          <p className="proj-desc small fw-semibold mb-2">
                            {proj.project_description}
                          </p>
                          <a href={proj.project_url} target="_blank" rel="noopener noreferrer" className="align-self-end text-primary text-decoration-none small">
                            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                              <g id="SVGRepo_iconCarrier">
                                <g id="Interface / External_Link">
                                  <path 
                                    id="Vector" 
                                    d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" 
                                    stroke="#1ABC9C" 
                                    stroke-width="2" 
                                    stroke-linecap="round" 
                                    stroke-linejoin="round"
                                  />
                                </g>
                              </g>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <h5 className="h5 text-center my-txt-black mt-3 mb-5 my-hobby-txt">{proj.project_name}</h5>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </div>
        )}

        {/* <!-- Expertise --> */}
        <div className="expertise my-bg-color-secondary" id="expertise">
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
                              This is the second programming language that I have learned and is easier for me in terms of code implementation,
                              due to its simpler syntax. It gave me a lot of flexibility when it comes to programming considering the short 
                              amount of time given to accomplish task. I am able to develop an application as a prerequisite to the subject 
                              "Advanced Computer Programming" during my second year in college using Python. 
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
                              For me, Java simplifies code implementation due to the fact that it manages object references and memory automatically, 
                              reducing complexity especially for beginners. When I started programming, I don't really understand how pointers work and it gave me a 
                              lot of headache especially when there is a deadline on the way and that's when Java start to save me from frustration.
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
                              JavaScript has helped me to build a more dynamic websites. It introduced me to the world of dynamic programming, 
                              and enabled me to make interactive web applications.
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