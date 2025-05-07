"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/footer";
import RelatedCard from "@/components/related-card";
import Link from "next/link"; // Import Link

// Options for the Mounting Type dropdown
const mountingOptions = [
  "FREE-STANDING",
  "COUNTER-TOP",
  "FOUNTAIN",
  "INDOOR",
  // Add more options here if needed
];

// Options for the Category dropdown
const categoryOptions = [
  "DRINKING WATER STATION",
  "WATER DISPENSER",
  "DRINKING WATER FAUCETS",
  "WATER COOLER & FOUNTAINS",
  "PUBLIC UTILITY SYSTEMS",
  "COMMERCIAL/INDUSTRIAL PLANTS",
];

// Data for all products with their categories and mounting types
const allProducts = [
  {
    name: "BLUWAE ASSISTIFLOW",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61bed0a3-d40d-46ec-2edd-a3fb53abe400/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE POS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6a2acaf3-4e68-43ff-260a-e504100a5500/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE ENKI FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ea4dd229-e02c-4eb6-18d4-dbe962b36f00/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE ROM FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3cae59a6-2900-4329-3fc1-dafd4cfe4900/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE VAR FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/801e38f9-4666-4511-1462-1f8767824e00/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE REVA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9f5bd039-db57-440a-a392-1934736b8800/public",
    category: "DRINKING WATER STATION",
    mountingType: "FREE-STANDING",
  },
  {
    name: "BLUWAE VAR CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1bc69e19-64e2-4b96-3158-916313af6300/public",
    category: "DRINKING WATER STATION",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "BLUWAE ENKI CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/24affdcc-bfce-4544-a951-4ec4de4fb500/public",
    category: "DRINKING WATER STATION",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "BLUWAE ROM CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/636ec9ab-40e5-4d1e-cabd-d17e14278a00/public",
    category: "DRINKING WATER STATION",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "TRUBLU AENON",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ddbc704a-4273-46d8-0f4c-6a4cb44db600/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU GAMMA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7abb9117-87ea-4b69-59d9-4508515d8700/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU DELTA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bdd2aab0-0a69-4f74-551f-b9fcf45ada00/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU ALFA 100",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU ALFA TL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU ALFA BL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU LAGOON",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/500e920c-fb2e-43e9-fca0-db0c5d5d0f00/public",
    category: "WATER DISPENSER",
    mountingType: "FREE-STANDING",
  },
  {
    name: "TRUBLU ALFA CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/90990ee2-c40a-4116-573d-7f4ea188a700/public",
    category: "WATER DISPENSER",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "Piper",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1d3b640-01ba-420a-bf17-b3145d223d00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "Indus",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e3fd671-62bf-461f-f624-94099f554500/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "Touch",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374ef4c2-7b68-4f33-3fc9-7d4d3fc1ca00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "Moses",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e1ab0b09-5a47-41c8-eca8-f74bb2ab8b00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "TRX.TL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e84e2022-b6ea-4f34-bb4d-3deb20d69700/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "HKN",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/528c39ab-e15a-4b6e-8f1e-a9f7f09ef100/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "COUNTER-TOP",
  },
  {
    name: "YAMI",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/63c9d062-1079-41e1-6eb1-ca4c88045400/public",
    category: "WATER COOLER & FOUNTAINS",
    mountingType: "FOUNTAIN",
  },
  {
    name: "PLUSULTRA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0aced016-3f7d-4d41-7cf5-41b6930eac00/public",
    category: "WATER COOLER & FOUNTAINS",
    mountingType: "FOUNTAIN",
  },
  {
    name: "AQUA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/20abb608-f632-4157-ce38-12646a5c8a00/public",
    category: "PUBLIC UTILITY SYSTEMS",
    mountingType: "FREE-STANDING",
  },
  {
    name: "HYDROBANKSERIES",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/822535eb-d4c2-472f-254f-8b4685410400/public",
    category: "PUBLIC UTILITY SYSTEMS",
    mountingType: "FREE-STANDING",
  },
  {
    name: "WATERMAKER",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fa2654df-e6ca-4b14-34d8-d52f1d4c5800/public",
    category: "COMMERCIAL/INDUSTRIAL PLANTS",
    mountingType: "FREE-STANDING",
  },
];

const Home: FC = () => {
  // State for each dropdown visibility
  const [showMountingDropdown, setShowMountingDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // State for selected filter options
  const [selectedMountingTypes, setSelectedMountingTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Refs for the dropdowns and their buttons to detect outside clicks
  const mountingDropdownRef = useRef<HTMLDivElement>(null);
  const mountingButtonRef = useRef<HTMLButtonElement>(null);

  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const categoryButtonRef = useRef<HTMLButtonElement>(null);

  // Effect to handle clicking outside ANY open dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if the click was inside the Mounting dropdown area (button + dropdown)
      const clickedInsideMountingArea =
        mountingButtonRef.current?.contains(target) || mountingDropdownRef.current?.contains(target);

      // Check if the click was inside the Category dropdown area (button + dropdown)
      const clickedInsideCategoryArea =
        categoryButtonRef.current?.contains(target) || categoryDropdownRef.current?.contains(target);

      // If the click was outside BOTH areas AND the Mounting dropdown is open, close it
      if (showMountingDropdown && !clickedInsideMountingArea) {
        setShowMountingDropdown(false);
      }

      // If the click was outside BOTH areas AND the Category dropdown is open, close it
      if (showCategoryDropdown && !clickedInsideCategoryArea) {
        setShowCategoryDropdown(false);
      }

      // Close the *other* dropdown if one button is clicked.
      // This ensures only one dropdown is open at a time.
      if (showMountingDropdown && !clickedInsideMountingArea && clickedInsideCategoryArea) {
        setShowMountingDropdown(false);
      }
      if (showCategoryDropdown && !clickedInsideCategoryArea && clickedInsideMountingArea) {
        setShowCategoryDropdown(false);
      }
    };

    // Add the event listener when EITHER dropdown is shown
    if (showMountingDropdown || showCategoryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or dropdown states change
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMountingDropdown, showCategoryDropdown]);

  // Function to handle checkbox changes for filters
  const handleFilterChange = (
    option: string,
    type: "mounting" | "category",
    isChecked: boolean
  ) => {
    if (type === "mounting") {
      setSelectedMountingTypes((prevSelected) =>
        isChecked ? [...prevSelected, option] : prevSelected.filter((item) => item !== option)
      );
    } else if (type === "category") {
      setSelectedCategories((prevSelected) =>
        isChecked ? [...prevSelected, option] : prevSelected.filter((item) => item !== option)
      );
    }
  };

  // Function to filter products based on selected options
  const filterProducts = () => {
    if (selectedMountingTypes.length === 0 && selectedCategories.length === 0) {
      return allProducts; // Show all products if no filters are selected
    }

    return allProducts.filter((product) => {
      const passesMountingFilter =
        selectedMountingTypes.length === 0 || selectedMountingTypes.includes(product.mountingType);
      const passesCategoryFilter =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      return passesMountingFilter && passesCategoryFilter;
    });
  };

  // Get the filtered list of products
  const filteredProducts = filterProducts();

  // Common button style based on the typography instructions.
  const buttonStyle: React.CSSProperties = {
    padding: "16px",
    fontFamily: "'Inter Tight', sans-serif",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "12px",
    letterSpacing: "0%",
    textAlign: "center",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  // Data for the 4 buttons along with their alternating background and text colors.
  const buttons = [
    { label: "FILTER BY", background: "#000", color: "#fff" },
    { label: "CATEGORY", background: "#000", color: "#fff" },
    { label: "MOUNTING TYPE", background: "#000", color: "#fff" },
    { label: "INSTALLATION TYPE", background: "#000", color: "#fff" },
  ];

  // Arrays for menu items
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "#" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];

  // Helper function to render dropdown content (checkboxes)
  const renderDropdownOptions = (options: string[], type: "mounting" | "category") => {
    const selectedOptions = type === "mounting" ? selectedMountingTypes : selectedCategories;
    return options.map((option, idx) => (
      <div key={idx} className="flex items-center mb-2">
        <input
          id={`${type}-option-${idx}`}
          type="checkbox"
          className="form-checkbox"
          style={{ accentColor: "#000" }}
          checked={selectedOptions.includes(option)}
          onChange={(e) => handleFilterChange(option, type, e.target.checked)}
        />
        <label
          htmlFor={`${type}-option-${idx}`}
          style={{
            fontFamily: "Inter Tight",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "140%",
            letterSpacing: "0%",
            verticalAlign: "middle",
            marginLeft: "45px",
            whiteSpace: "nowrap",
            cursor: "pointer", // Indicate it's clickable
          }}
        >
          {option}
        </label>
      </div>
    ));
  };

  return (
    <main>
      {/* Normal Header */}
      <header className="w-full">
        <div className="mx-auto w-full max-w-[1440px] px-[140px] py-[20px]">
          {/* Top Row: Navigation */}
          <div
            className="grid grid-cols-5 items-center pb-2 uppercase"
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: "12px",
              lineHeight: "100%",
            }}
          >
            <div>IDENTITY</div>
            <div>ORIGIN</div>
            <div>OBJECTIVE</div>
            <div>INSIDE WAE</div>
            <div>ETCETERA</div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#D9D9DC] mb-4" />

          {/* Bottom Row: Logo, Coordinates, Tagline and Menu Items */}
          <div className="grid grid-cols-5 items-start">
            {/* Logo */}
            <div className="flex flex-col justify-center">
              <Image
                src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                alt="WAE Logo"
                width={78}
                height={82}
              />
            </div>

            {/* Coordinates */}
            <div
              className="flex flex-col justify-center"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                color: "#000000",
              }}
            >
              20.5937° N
              <br />
              78.9629° E
            </div>

            {/* Tagline */}
            <div
              className="flex flex-col justify-center"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
                color: "#000000",
              }}
            >
              To lead the way in
              <br />
              sustainability ahead of the
              <br />
              rest
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
                    fontSize: "12px",
                    lineHeight: "100%",
                  }}
                >
                  <Link href={item.href} className="c--anim-btn">
                    <div className="text-container">
                      <span className="c-anim-btn">{item.text}</span>
                      <span className="block">{item.text}</span>
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
                  </Link>
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
                    fontSize: "12px",
                    lineHeight: "100%",
                  }}
                >
                  <Link href={item.href} className="c--anim-btn">
                    <div className="text-container">
                      <span className="c-anim-btn">{item.text}</span>
                      <span className="block">{item.text}</span>
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative w-auto h-[656px]">
        <Image
          src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2359943f-dce7-4e87-3f16-629da74ecc00/public"
          alt="Hero background"
          layout="fill"
          objectFit="contain"
        />
      </section>

      {/* Buttons Section */}
      <section className="mx-auto max-w-[1440px] px-[9.72%]">
        {/* Gap of 120px after the hero */}
        <div style={{ height: "120px" }} />

        <div
          className="flex items-center gap-4"
          style={{ justifyContent: "space-between" }}
        >
          {buttons.map((btn, index) => {
            // --- FILTER BY Button ---
            if (btn.label === "FILTER BY") {
              return (
                <div
                  key={index}
                  className="flex  justify-between"
                  style={{ flex: 1, maxWidth: "16%" }} // Retains maxWidth
                >
                  <button
                    style={{
                      ...buttonStyle,
                      flex: 1,
                      backgroundColor: btn.background,
                      color: btn.color,
                      paddingLeft: "41.67px",
                      paddingRight: "41.67px",
                      whiteSpace: "nowrap",
                      borderRight: "0.67px solid #00000066", // Border on button
                    }}
                  >
                    {btn.label}
                  </button>
                </div>
              );
            }
            // --- CATEGORY Button (Dropdown) ---
            else if (btn.label === "CATEGORY") {
              return (
                <div key={index} className="relative" style={{ width: "23%" }}>
                  {" "}
                  {/* maxWidth removed */}
                  <button
                    ref={categoryButtonRef} // Attach category ref
                    style={{
                      ...buttonStyle,
                      flex: "unset",
                      width: "100%",
                      backgroundColor: btn.background,
                      color: btn.color,
                    }}
                    onClick={() => setShowCategoryDropdown((prev) => !prev)} // Toggle category state
                    className="w-full"
                  >
                    <span className="flex items-center gap-4 whitespace-nowrap">
                      {btn.label}
                      <svg
                        className={`w-2.5 h-2.5 transition-transform duration-500 ${
                          showCategoryDropdown ? "rotate-180" : "" // Use category state for rotation
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                  </button>
                  {/* Category Dropdown Menu */}
                  <div
                    ref={categoryDropdownRef} // Attach category ref
                    className={`absolute left-0 top-full w-full bg-white transition-all duration-500 ease-in-out ${
                      showCategoryDropdown // Use category state for visibility
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-0.5 pointer-events-none"
                    }`}
                    style={{
                      boxShadow: "0px 4px 4px 0px #00000040",
                      padding: "20px 8px",
                      zIndex: 10,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {renderDropdownOptions(categoryOptions, "category")}{" "}
                    {/* Render category options */}
                  </div>
                </div>
              );
            }
            // --- MOUNTING TYPE Button (Dropdown) ---
            else if (btn.label === "MOUNTING TYPE") {
              return (
                <div key={index} className="relative" style={{ width: "16%" }}>
                  {" "}
                  {/* maxWidth removed */}
                  <button
                    ref={mountingButtonRef} // Attach mounting ref
                    style={{
                      ...buttonStyle,
                      flex: "unset",
                      width: "100%",
                      backgroundColor: btn.background,
                      color: btn.color,
                    }}
                    onClick={() => setShowMountingDropdown((prev) => !prev)} // Toggle mounting state
                    className="w-full"
                  >
                    <span className="flex items-center gap-4 whitespace-nowrap">
                      {btn.label}
                      <svg
                        className={`w-2.5 h-2.5 transition-transform duration-500 ${
                          showMountingDropdown ? "rotate-180" : "" // Use mounting state for rotation
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </span>
                  </button>
                  {/* Mounting Type Dropdown Menu */}
                  <div
                    ref={mountingDropdownRef} // Attach mounting ref
                    className={`absolute left-0 top-full w-full bg-white transition-all duration-500 ease-in-out ${
                      showMountingDropdown // Use mounting state for visibility
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-0.5 pointer-events-none"
                    }`}
                    style={{
                      boxShadow: "0px 4px 4px 0px #00000040",
                      padding: "20px 8px",
                      zIndex: 10,
                      maxHeight: "200px",
                      overflowY: "auto",
                    }}
                  >
                    {renderDropdownOptions(mountingOptions, "mounting")}{" "}
                    {/* Render mounting options */}
                  </div>
                </div>
              );
            }
            // --- Default Button (INSTALLATION TYPE and any others) ---
            return (
              <button
                key={index}
                style={{
                  ...buttonStyle,
                  backgroundColor: btn.background,
                  color: btn.color,
                  flex: 1,
                  maxWidth: "23%", // Retains maxWidth
                }}
              >
                <span className="flex items-center">
                  {btn.label}
                  {/* No SVG arrow here, as requested for Installation Type */}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gap of 12px before the horizontal rule */}
        <div style={{ height: "12px" }} />

        {/* Horizontal rule */}
        <hr style={{ borderColor: "#00000066" }} />
      </section>

      {/* Products Grid Section */}
      <section className="mx-[9.72%] mb-[9.72%]">
        {/* 80px gap after the horizontal rule */}
        <div style={{ height: "80px" }} />

        <div
          className="grid grid-cols-3"
          style={{
            rowGap: "120px",
            columnGap: "2.7%",
          }}
        >
          {filteredProducts.map((product, index) => (
            // Wrap the product item in a Link component
            <Link
              key={index}
              href={`/${product.name.toLowerCase().replace(/ /g, "-")}`} // Placeholder URL
              passHref // Use passHref with custom components
            >
              {/* The entire product item becomes clickable */}
              <div className="flex flex-col items-center cursor-pointer"> {/* Added cursor-pointer for visual cue */}
                {/* Wrap image in a container to apply the zoom effect */}
                <div className="overflow-hidden">
                  <div className="transition-transform duration-1000 ease-in-out hover:scale-110">
                    <Image
                      src={product.src}
                      alt={product.name}
                      width={360}
                      height={360}
                    />
                  </div>
                </div>
                {/* 24px gap before product name */}
                <div style={{ height: "24px" }} />
                <div
                  style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "140%",
                    letterSpacing: "0%",
                    textAlign: "center",
                    verticalAlign: "middle",
                    textTransform: "uppercase",
                  }}
                  className="related-card-title" // Keep existing styling
                >
                  {product.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* More Products SECTION */}
      <section
        className="max-w-full px-[8.75rem] py-[7.5rem] bg-white"
        style={{
          position: "relative",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        <h2 className="font-helvetica text-[3.63rem] leading-[110%] tracking-[0%] align-middle font-normal uppercase md:whitespace-nowrap mb-[2.5rem]">
          More Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="DRINKING WATER STATION - BLUWAE Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="WATER DISPENSER (W/O RO) - TRUBLU Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="DRINKING WATER FAUCETS - WATERMATIC Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
          <RelatedCard
            image="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b4d5a06d-b245-459f-4f81-32eb013a8000/public"
            title="WATER COOLER & FOUNTAINS - ZVR Series"
            description="Information regarding awards received by the Hitachi Group in various fields and related announcements."
            width={272}
            height={270}
          />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />

      {/* Custom styles for RelatedCard titles and descriptions */}
      <style jsx>{`
        .related-card-title {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 16px;
          line-height: 120%;
          letter-spacing: 0%;
          vertical-align: middle;
        }
        .related-card-description {
          font-family: "Inter Tight", sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 110%;
          letter-spacing: 0%;
          vertical-align: middle;
          color: #808080;
        }
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
        .menu-arrow,
        .blueprint-arrow {
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
  );
};

export default Home;