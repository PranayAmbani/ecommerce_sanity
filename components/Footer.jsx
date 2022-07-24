import React from 'react'
import {AiOutlineTwitter,AiFillLinkedin,AiFillGithub} from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
   <div className="footer-container">
    <p>2022 Sonic Headphones All rights reserved</p>
    <p className="icons">
      <Link href='https://twitter.com/TechRuler3'>
      <AiOutlineTwitter></AiOutlineTwitter>
      </Link>
      <Link href='https://www.linkedin.com/in/yash-vaghela-435821222/'>
      <AiFillLinkedin></AiFillLinkedin>
      </Link>
      <Link href='https://github.com/YashVaghel'>
      <AiFillGithub></AiFillGithub>
      </Link>
    </p>
   </div>
  )
}

export default Footer