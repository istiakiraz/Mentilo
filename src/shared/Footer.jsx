import React from "react";
import logo from "../assets/logo/MentiloLogo.png";
import { Link } from "react-router";
import { FaFacebookSquare, FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-secondary ">
      <div className="px-4 pt-16 mx-auto w-11/12 lg:w-9/12 md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <div className="inline-flex items-center">
              <div className="lg:flex justify-center  items-end">
                <img className="w-16" src={logo} alt="logo" />
                <h2 className="text-4xl font-logo -ml-3 text-primary ">
                  Mentilo
                </h2>
              </div>
            </div>
            <div className="mt-2 lg:max-w-sm">
              <p className="text-sm text-gray-800">
                Mentilo is a modern fitness platform designed to connect users
                with certified trainers for personalized training experiences.
              </p>
              <p className="mt-4 text-sm text-gray-800">
                Whether you're a beginner or an advanced fitness enthusiast, our
                platform offers a wide range of classes tailored to your needs —
                from yoga to weight training.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-gray-800">Links</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/all-trainer"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    All Trainer
                  </a>
                </li>
                <li>
                  <a
                    href="/all-classes"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    All Classes
                  </a>
                </li>
                <li>
                  <a
                    href="/forums"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Forum
                  </a>
                </li>
                <li>
                  <a
                    href="/be-a-trainer"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Join a Trainer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-gray-800">
                Contact Me
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    target="_blank"
                    href="mailto:istiakiraz@gmail.com"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Email me
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://istiakiraz.netlify.app/"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://thinktales.netlify.app/"
                    className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                  >
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14598.796932347963!2d90.44081905902821!3d23.829291952152886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1749998277275!5m2!1sen!2sbd"
                width="350"
                className="mt-2 rounded-xl"
                height="200"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* <div>
            <p className="font-semibold tracking-wide text-gray-800">Apples</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Media
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Brochure
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Nonprofit
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Educational
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Projects
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold tracking-wide text-gray-800">Cherry</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Infopreneur
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Personal
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Wiki
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Forum
                </a>
              </li>
            </ul>
          </div> */}
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
          <p className="text-sm text-gray-600">
            © Copyright 2025 Mentilo Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <Link target="_blank" to="https://github.com/istiakiraz">
              <FaGithub size={25} color="#432365" />
            </Link>
            <Link target="_blank" to="https://www.linkedin.com/in/istiakiraz/">
              <IoLogoLinkedin size={28} color="#432365" />
            </Link>
            <Link target="_blank" to="https://www.facebook.com/istiak.iraz">
              <FaFacebookSquare size={25} color="#432365" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
