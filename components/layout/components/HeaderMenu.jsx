import React from 'react'
import Link from 'next/link'
import { useTranslation } from '@/app/context/TranslationContext';

const HeaderMenu = ({translate}) => {

  return (
    <div>
        <div className="d-flex" style={{gap : "15px"}}> 
              <div>
                <Link href="/" className="">
                  {translate("Home")}
                </Link>
              </div>
              <div>
                {" "}
                <Link href="/tour" className="">
                  {translate("Tour")}
                </Link>
              </div>
              <div>
                <Link href="/tour?type=Hajj" className="">
                  {translate("Hajj")}
                </Link>
              </div>
              <div>
                <Link href="/tour?type=Umrah" className="">
                  {translate("Umrah")}
                </Link>
              </div>
              <div>
                <Link href="/tour?type=Kultur Reisen" className="">
                  {translate("Kultur Reisen")}
                </Link>
              </div>
              <div>
                <Link href="/blogs" className="">
                  {translate("Blogs")}
                </Link>
              </div>
              <div>
                <Link href="/contact" className="">
                  {translate("Contact")}
                </Link>
              </div>
            </div>
    </div>
  )
}

export default HeaderMenu