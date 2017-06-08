import React, { Component } from 'react';


class About extends Component {
  render() {
    return(
      <div className="about-bg">
        <div className="tint">
          <h1>About...Brian Gallagher</h1>
          <div className="about card card-block">
            <p><span>Welcome!</span> My name is Brian Gallagher and this is where I have claimed my corner of the Interwebz.  I am a Junior Front-End Web Developer.  Technologies I use include Javascript, ReactJS, ReduxJS, HTML5, and CSS.  I recently attended The Iron Yard’s Front-End Engineering course.  Outside of the course I have been studying Back-End Engineering technologies that include NodeJS, ExpressJS, and MongoDB.</p>
            <div className="logo">
              <img src="./reactjs2.png" alt="ReactJS"/>
              <img src="./redux.png" alt="ReduxJS"/>
            </div>
            <p>I’ve always enjoyed creating things.  As a kid pieced together several model airplanes had containers full of Legos that fostered curiosity and creativity.  This curiosity and creativity, later lead me into the incredible world of technology.</p>
              <div className="logo">
                <img src="./js@2x.png" alt="JS"/>
                <img src="./sass.png" alt="Sass"/>
              </div>
            <p>I love learning what makes all my devices tic and what I can do to get the most out of them.  I started looking into how the code made them work the way it and how I could alter it to my needs.  This swung the development door wide open for me and open my eyes to the countless possibilities.</p>
              <div className="logo">
                <img src="./html5@2x.png" alt="HTML5"/>
                <img src="./css3@2x.png" alt="CSS"/>
              </div>
            <p>I had made a career in the Healthcare software industries of 9 years, working for the same company.  I wore several hats during that time, some of include a support rep, onsite trainer, QA analyst, and management.  While I enjoyed my time wearing all of these hats, I still had a yearning for understanding how the applications I used daily operated.  During this time I had started a new hobby of home automation.  Tailoring my HA needs meant I needed to get into the code to my applications fit my needs.  As one component of the application began to fit into place, I could see the next one forming.  I was having tons of fun tinkering and writing small pieces of code and decided I wanted to make a go at this and make a pivot in my career path.  For more, visit my website: <a target="_blank" href="http://www.bgallagher.io">www.bgallagher.io</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
