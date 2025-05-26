import { GithubLogoIcon, LinkedinLogoIcon, LinkIcon } from '@phosphor-icons/react';

import portrait from '../assets/images/andre.jpg';
export default function AboutPage() {
  return (
    <div className="flex flex-col justify-center md:flex-row gap-10 max-w-200 mx-auto h-full mt-5">
      <div className="mx-auto">
        {/* <div className="border-t-4 border-b-4 border-teal-800 py-4"> */}
        <div className="card">
          <h1 className="text-teal-800 font-bold mb-2">
            About Cotopia - Bringing Communities Together
          </h1>
          <p>
            Cotopia was born from a simple yet powerful idea: to create a space where people can{' '}
            <span className="text-teal-800 font-bold">
              connect, exchange, and collaborate— all in one place
            </span>
            . <br /> As countless Telegram groups emerged for local exchanges, it became clear that
            something was missing: a unified platform where communities could seamlessly share
            opportunities, trade goods, find real estate, coordinate transportation, and offer help.
            That's where Cotopia comes in. <br />
            This project is the culmination of my full-stack developer training—a passion-driven
            initiative to bring people together and make interactions more efficient, accessible,
            and meaningful. It's not just a website; it's a vision for a more connected world, where
            support flows freely and trust grows stronger. <br /> Beyond coding, I have a deep love
            for music and the joy of learning new things. <br /> Cotopia is a reflection of that
            curiosity—the drive to create something valuable, to build something that truly benefits
            people. <br />{' '}
            <span className="text-teal-800 font-bold">
              Welcome to Cotopia. Let's shape the future of community exchange together.
            </span>
          </p>
        </div>
        <div className="card">
          <div className="flex gap-8 my-10 justify-center items-center">
            <img
              src={portrait}
              alt="portrait André Kaltenbach"
              className="h-40 w-40 rounded-full"
            />
            <div>
              <p className="mt-5">André Kaltenbach</p>
              <div className="flex justify-center gap-2 mt-1">
                <a
                  href="https://github.com/andrekaltenbach"
                  target="_blank"
                  className="hover:text-teal-800 duration-300"
                >
                  <GithubLogoIcon size={32} weight="duotone" />
                </a>
                <a
                  href="https://www.linkedin.com/in/andrekaltenbach/"
                  target="_blank"
                  className="hover:text-teal-800 duration-300"
                >
                  <LinkedinLogoIcon size={32} weight="duotone" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-3 sm:flex-row pt-5 border-t-2 border-teal-800">
            <p>Project Github repositories:</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/andrekaltenbach/cotopia-frontend"
                target="_blank"
                className="text-teal-800"
              >
                <div className="flex">
                  <LinkIcon size={20} weight="light" /> Frontend
                </div>
              </a>
              <a
                href="https://github.com/andrekaltenbach/cotopia-backend"
                target="_blank"
                className="text-teal-800"
              >
                <div className="flex">
                  <LinkIcon size={20} weight="light" /> Backend
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
