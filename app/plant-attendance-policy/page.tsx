"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Link from 'next/link'

interface HoverButtonProps {
  children: (hovered: boolean) => React.ReactNode
  className?: string
}

const HoverButton: React.FC<HoverButtonProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false)
  
  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex items-center gap-2 border border-[#00000066] text-black px-4 py-2 rounded-md transition-colors hover:bg-black hover:text-white ${className}`}
    >
      {children(isHovered)}
    </button>
  )
}

const containerClass = "mx-auto w-full max-w-[1440px] px-[140px]"

export default function PolicyPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [taglineVisible, setTaglineVisible] = useState(true)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setTaglineVisible(currentScrollY < prevScrollY.current)
      prevScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const productsItems = ["This is Us", "Our Portfolio", "Reimagine Work"]
  const blueprintItems = ["Sustainability", "The Activist Co.", "Blog"]

  return (
    <main className="relative bg-[#EEEEEE] min-h-screen">
      {/* HEADER */}
      <div style={{ top: 0, left: 0, width: "100%" }}>
        <header ref={headerRef} className="w-full relative z-10 mb-[80px]">
          <div className="mx-auto w-full max-w-[1440px] px-[140px]">
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "130%",
                letterSpacing: "0px",
              }}
            >
              <div>IDENTITY</div>
              <div>ORIGIN</div>
              <div>OBJECTIVE</div>
              <div>INSIDE WAE</div>
              <div>ETCETERA</div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#D9D9DC] mb-[10px]" />

            {/* Bottom Row: Logo, Tagline and Menu Items */}
            <div className="grid grid-cols-5 items-start">
              {/* Logo */}
              <div className="flex flex-col justify-center">
                <Link href="/" passHref>
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={78}
                    height={82}
                    style={{ cursor: 'pointer' }}
                  />
                </Link>
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "130%",
                  color: "#000000",
                }}
              >
                20.5937° N
                <br />
                78.9629° E
              </div>

              {/* Tagline */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "130%",
                  color: "#000000",
                }}
              >
                To lead the way in<br />sustainability ahead of the<br />rest
              </div>

              {/* Inside WAE Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {productsItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ETCETERA Menu Items */}
              <div className="flex flex-col justify-center space-y-2">
                {blueprintItems.map((item, i) => (
                  <div
                    key={i}
                    className="pb-2 border-b border-[#D9D9DC] last:border-0"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 500,
                      fontSize: "11px",
                      lineHeight: "110%",
                    }}
                  >
                    <div className="c--anim-btn">
                      <div className="text-container">
                        <span className="c-anim-btn">{item}</span>
                        <span className="block">{item}</span>
                      </div>
                      <span className="menu-arrow blueprint-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* MAIN CONTENT */}
      <div className={containerClass}>
        <div className="pb-[120px]">
          {/* Preface Heading */}
          <h1 
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontStyle: "Medium",
              fontSize: "32px",
              lineHeight: "110%",
              letterSpacing: "0%",
              verticalAlign: "middle",
              textTransform: "capitalize",
              color: "#000000",
              marginBottom: "60px"
            }}
          >
            Preface
          </h1>

          {/* Introduction Section */}
          <div className="grid grid-cols-2 gap-[80px] mb-[60px]">
            <div>
              <h2 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "140%",
                  color: "#00000099",
                  marginBottom: "16px"
                }}
              >
                Upholding a Culture of Professionalism and Responsibility:
              </h2>
            </div>
            <div>
              <p 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "160%",
                  color: "#00000099",
                  marginBottom: "20px"
                }}
              >
                At the heart of any successful corporate enterprise lies a culture of discipline, mutual respect, and personal accountability. Attendance is not just a logistical metric—it reflects work ethic, time management, and a commitment to the collective mission of the organization.
              </p>
              <p 
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 400,
                  fontSize: "13px",
                  lineHeight: "160%",
                  color: "#00000099"
                }}
              >
                This policy aims to define clear standards regarding attendance, work hours, remote presence, and leave regulation rules, while also accommodating the need for flexibility and manpower well-being. It seeks to balance structure and empathy, reinforcing our belief that high performance is best achieved through trust, transparency, and professionalism.
              </p>
            </div>
          </div>

          {/* Policy Objectives */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              Policy Objectives:
            </h2>
            <ul 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099",
                paddingLeft: "20px"
              }}
            >
              <li style={{ marginBottom: "12px" }}>• To set expectations regarding employee presence during working hours.</li>
              <li style={{ marginBottom: "12px" }}>• To maintain consistent productivity and inter-departmental coordination.</li>
              <li style={{ marginBottom: "12px" }}>• To promote a transparent mechanism for leave, late coming, and absenteeism.</li>
              <li>• To align attendance behaviour with the company's values of integrity and accountability.</li>
            </ul>
          </div>

          {/* Scope */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              Scope:
            </h2>
            <ul 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099",
                paddingLeft: "20px"
              }}
            >
              <li style={{ marginBottom: "12px" }}>• This policy shall be applicable to all employees of WAE Limited working in Manufacturing Unit (Plant).</li>
              <li>• Team members comprising of Production, Quality, WM/D & E, Plant Admin & HR, Stores, Purchase, Plant operations, CRM (Plant Inegrated), FI/Co and R&C (Plant visiting).</li>
            </ul>
          </div>

          {/* Working Hours and Reporting Time */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              Working Hours and reporting time:
            </h2>
            
            {/* Table */}
            <table className="w-full mb-[30px]" style={{ 
              borderCollapse: 'collapse',
              border: '1px solid #00000099'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#D9D9D9' }}>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left',
                  }}>
                    YEAR
                  </th>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left',
                  }}>
                    LOGIN / WINDOW
                  </th>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left',
                  }}>
                    SHIFT TIME
                  </th>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left'
                  }}>
                    WORKING HOURS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Monday to Saturday
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Fixed at 8:00 AM
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    8:00 AM to 5:30 PM
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Employee needs to complete 9 hours & 30 min a day
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Weekly Off
                  </td>
                  <td colSpan={3} style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Every 3rd Saturday of every month.
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontStyle: "Bold",
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099"
              }}>
                :- Tea Break timings - Morn. - Lunch Break - 30 Min - Evening Tea Break - 15 min (Included in the above working hours)
              </span>
            </p>

            {/* Work Timings */}
            <h3 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "16px"
              }}
            >
              Work Timings:
            </h3>
            <ul 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "160%",
                color: "#00000099",
                paddingLeft: "20px"
              }}
            >
              <li style={{ marginBottom: "12px" }}>• Daily work start time will be Monday to Saturday 8:00am to 5:30pm.</li>
              <li style={{ marginBottom: "12px" }}>• Third Saturdays & Sundays shall be weekly off.</li>
              <li style={{ marginBottom: "12px" }}>• Employees are expected to report on any on-time. Late entry shall be permitted for four instances in a month for only on-roll employees.</li>
              <li style={{ marginBottom: "12px" }}>• Any further delay beyond 15 minutes from the maximum clocked half day leave shall be deducted for every such instances. For delays beyond 30 minutes in day shall be considered as half-day (Loss of Pay &/OR).</li>
              <li style={{ marginBottom: "12px" }}>• No grace to be given if reporting time is at or 15 min.</li>
              <li style={{ marginBottom: "12px" }}>• To avail a half-day leave, employees must complete a minimum of 4.5 working hours from Monday to Saturday. If reporting is after 1:30pm no leave will be deducted.</li>
              <li style={{ marginBottom: "12px" }}>• It is the concerned HOD's responsibility to ensure that all employees work as per the Attendance timing policy and ensure compliance.</li>
              <li>• Employees shall apply leaves on HRMS 2 working days in advance (subject to prior written approval). By end of day (EOD), failure to do so will attract a penalty. For Verbal Calen employees at Plant)</li>
            </ul>
          </div>

          {/* Attendance Recording */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              Attendance Recording:
            </h2>
            <ul 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099",
                paddingLeft: "20px"
              }}
            >
              <li style={{ marginBottom: "12px" }}>• Attendance must be marked through the designated Biometric machine, HRMS platform, access card.</li>
              <li style={{ marginBottom: "12px" }}>• Missed punch or login must be regularised within 48 hours of reporting to work, failing which will be considered as leave (SL) or LWP or culprit to credit a tentative.</li>
              <li style={{ marginBottom: "12px" }}>• In case of an employee is ICU isn July as an official work, concerned employee must obtain approval from the respective supervisor before reporting through HRMS.</li>
              <li style={{ marginBottom: "12px" }}>• Twice a month, employees can take a one-hour permission to late entry (morning) of late exit (evening) at any instance of any emergency. This must be informed to HDD and must to be regularised later.</li>
              <li style={{ marginBottom: "12px" }}>• In case of late entry or early exit, employee must report such instances to HDD.</li>
              <li style={{ marginBottom: "12px" }}>• Unauthorised absence beyond 1 day is treated as a violation of this policy.</li>
              <li style={{ marginBottom: "12px" }}>• Absence must be communicated to the department HOD or before 10a am., whatsapp official email or HRMS.</li>
              <li>• Three or more unintimated absences in a quarter, will lead to HR intervention and performance flagging.</li>
            </ul>
          </div>

          {/* Disciplinary Measures */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "20px"
              }}
            >
              Disciplinary Measures for Non-Compliance
            </h2>
            
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#D9D9D9' }}>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left',
                    width: '50%'
                  }}>
                    VIOLATION
                  </th>
                  <th style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: "140%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099',
                    textAlign: 'left',
                    width: '50%'
                  }}>
                    CONSEQUENCE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Habitual tardiness or absenteeism
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Managerial counselling → Written warning
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Proxy attendance
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Immediate investigation → Disciplinary action
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Repeated violations
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Impact on performance appraisal or bonus visibility
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#EEEEEE' }}>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Non-compliance during probation
                  </td>
                  <td style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "160%",
                    color: "#00000099",
                    padding: "12px 16px",
                    border: '1px solid #00000099'
                  }}>
                    Extension or termination of probation
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Policy Review and Exceptions */}
          <div className="mb-[60px]">
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "16px"
              }}
            >
              Policy Review and Exceptions
            </h2>
            <p 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099",
                marginBottom: "12px"
              }}
            >
              This policy will be reviewed annually by the HR department.
            </p>
            <p 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "160%",
                color: "#00000099"
              }}
            >
              Any exceptions must be approved by the Head of HR and Functional Head, with justification.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "140%",
                color: "#00000099",
                marginBottom: "16px"
              }}
            >
              Disclaimer:
            </h2>
            <p 
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 700,
                fontStyle: "Bold",
                fontSize: "12px",
                lineHeight: "100%",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#00000099"
              }}
            >
              This document would be revised, modified, discontinued, or amended at any time, in whole or in part, for any reason, and without prior notice, consent or approval within the sole discretions of WAE. This document contains confidential information and solely for use by and distribution to authorized persons only.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>

      {/* INLINE CSS for hover and arrow animations */}
      <style jsx>{`
        .c--anim-btn {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .text-container {
          height: 12px;
          overflow: hidden;
        }
        .c-anim-btn {
          display: block;
          margin-top: 0;
          transition: margin-top 0.5s;
        }
        .c--anim-btn:hover .c-anim-btn {
          margin-top: -12px;
        }
        .menu-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-10px);
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .c--anim-btn:hover .menu-arrow {
          transform: translateX(0);
          opacity: 1;
        }
        .blueprint-arrow {
          transform: rotate(-45deg) translateX(-10px);
        }
        .c--anim-btn:hover .blueprint-arrow {
          transform: rotate(-45deg) translateX(0);
          opacity: 1;
        }
      `}</style>
    </main>
  )
}