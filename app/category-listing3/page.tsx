"use client"; // This component needs to be client-side to use hooks like useState, useSearchParams, and useEffect

import { FC, useState, useRef, useEffect, Suspense } from "react"; // Import Suspense
import Image from "next/image";
import Footer from "@/components/footer"; // Assuming Footer is a component you want to keep static or client-ready
import RelatedCard from "@/components/related-card"; // Assuming RelatedCard is used in a static or client-ready section
import Link from "next/link"; // Import Link
import { useSearchParams } from 'next/navigation'; // Import useSearchParams hook
import { productCategories } from "@/data/product-categories"; // Import productCategories data

// Options for the Mounting Type dropdown - These now EXACTLY match the 'name' property
// in the mountingTypes array of your productCategories data.
const mountingOptions = [
  "Free Standing", // Aligned with productCategories.ts name
  "Counter Top",  // Aligned with productCategories.ts name
  "Fountains",    // Aligned with productCategories.ts name
  "Indoors",      // Aligned with productCategories.ts name
  // Add more options here if needed, ensuring they match productCategories.ts names
];

// Options for the Category dropdown - These now EXACTLY match the 'title' property
// in your productCategories data.
const categoryOptions = [
  "DRINKING WATER STATIONS", // Aligned with productCategories.ts title
  "WATER DISPENSER",       // Aligned with productCategories.ts title
  "DRINKING WATER FAUCETS",  // Aligned with productCategories.ts title
  "WATER COOLER & FOUNTAINS",// Aligned with productCategories.ts title
  "PUBLIC UTILITY SYSTEMS",  // Aligned with productCategories.ts title
  "COMMERCIAL/INDUSTRIAL PLANTS", // Aligned with productCategories.ts title
];


// Data for all products with their categories and mounting types
// NOTE: In a real app, this data would likely be fetched based on the filters
// or from a central source, not hardcoded here.
// >>> IMPORTANT: Ensure the 'category' and 'mountingType' values in this data EXACTLY match
// the strings in the updated categoryOptions and mountingOptions arrays respectively.
const allProducts = [
  {
    name: "BLUWAE ASSISTIFLOW",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61bed0a3-d40d-46ec-2edd-a3fb53abe400/public",
    category: "DRINKING WATER STATIONS", // Must match categoryOptions value
    mountingType: "Free Standing", // Must match mountingOptions value
  },
  {
    name: "BLUWAE POS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/6a2acaf3-4e68-43ff-260a-e504100a5500/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Free Standing",
  },
  {
    name: "BLUWAE ENKI FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ea4dd229-e02c-4eb6-18d4-dbe962b36f00/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Free Standing",
  },
  {
    name: "BLUWAE ROM FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3cae59a6-2900-4329-3fc1-dafd4cfe4900/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Free Standing",
  },
  {
    name: "BLUWAE VAR FS",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/801e38f9-4666-4511-1462-1f8767824e00/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Free Standing",
  },
  {
    name: "BLUWAE REVA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9f5bd039-db57-440a-a392-1934736b8800/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Free Standing",
  },
  {
    name: "BLUWAE VAR CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1bc69e19-64e2-4b96-3158-916313af6300/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Counter Top", // Must match mountingOptions value
  },
  {
    name: "BLUWAE ENKI CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/24affdcc-bfce-4544-a951-4ec4de4fb500/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Counter Top",
  },
  {
    name: "BLUWAE ROM CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/636ec9ab-40e5-4d1e-cabd-d17e14278a00/public",
    category: "DRINKING WATER STATIONS",
    mountingType: "Counter Top",
  },
  {
    name: "TRUBLU AENON",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/ddbc704a-4273-46d8-0f4c-6a4cb44db600/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU GAMMA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7abb9117-87ea-4b69-59d9-4508515d8700/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU DELTA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bdd2aab0-0a69-4f74-551f-b9fcf45ada00/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU ALFA 100",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU ALFA TL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU ALFA BL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4083db4d-1dbc-477b-d4d3-753ff8f39800/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU LAGOON",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/500e920c-fb2e-43e9-fca0-db0c5d5d0f00/public",
    category: "WATER DISPENSER",
    mountingType: "Free Standing",
  },
  {
    name: "TRUBLU ALFA CT",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/90990ee2-c40a-4116-573d-7f4ea188a700/public",
    category: "WATER DISPENSER",
    mountingType: "Counter Top",
  },
  {
    name: "Piper",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/f1d3b640-01ba-420a-bf17-b3145d223d00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "Indus",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5e3fd671-62bf-461f-f624-94099f554500/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "Touch",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/374ef4c2-7b68-4f33-3fc9-7d4d3fc1ca00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "Moses",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e1ab0b09-5a47-41c8-eca8-f74bb2ab8b00/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "TRX.TL",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e84e2022-b6ea-4f34-bb4d-3deb20d69700/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "HKN",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/528c39ab-e15a-4b6e-8f1e-a9f7f09ef100/public",
    category: "DRINKING WATER FAUCETS",
    mountingType: "Counter Top",
  },
  {
    name: "YAMI",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/63c9d062-1079-41e1-6eb1-ca4c88045400/public",
    category: "WATER COOLER & FOUNTAINS",
    mountingType: "Fountains", // Must match mountingOptions value
  },
  {
    name: "PLUSULTRA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0aced016-3f7d-4d41-7cf5-41b6930eac00/public",
    category: "WATER COOLER & FOUNTAINS",
    mountingType: "Fountains",
  },
  {
    name: "AQUA",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/20abb608-f632-4157-ce38-12646a5c8a00/public",
    category: "PUBLIC UTILITY SYSTEMS",
    mountingType: "Free Standing",
  },
  {
    name: "HYDROBANKSERIES",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/822535eb-d4c2-472f-254f-8b4685410400/public",
    category: "PUBLIC UTILITY SYSTEMS",
    mountingType: "Free Standing",
  },
  {
    name: "WATERMAKER",
    src: "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/fa2654df-e6ca-4b14-34d8-d52f1d4c5800/public",
    category: "COMMERCIAL/INDUSTRIAL PLANTS",
    mountingType: "Free Standing",
  },
];

// Helper function to map URL parameter values (from productCategories IDs)
// to the display values used in the filters (matching productCategories titles/names).
const mapUrlParamToFilterOption = (paramValue: string | null): { category: string | null, mounting: string | null } => {
  const mapping: Record<string, { category?: string, mounting?: string }> = {
    // Category Mappings (from productCategories ID to productCategories Title)
    "drinking-water-stations": { category: "DRINKING WATER STATIONS" }, // Corrected to match title
    "water-dispenser": { category: "WATER DISPENSER" },
    "drinking-water-faucets": { category: "DRINKING WATER FAUCETS" },
    "water-cooler": { category: "WATER COOLER & FOUNTAINS" },
    "public-utility-systems": { category: "PUBLIC UTILITY SYSTEMS" },
    "commercial-industrial-plants": { category: "COMMERCIAL/INDUSTRIAL PLANTS" },

    // Mounting Type Mappings (from productCategories mountingType ID to productCategories Name)
    "free-standing": { mounting: "Free Standing" }, // Corrected to match name
    "counter-top": { mounting: "Counter Top" },  // Corrected to match name
    "fountains": { mounting: "Fountains" },    // Corrected to match name (plural ID to plural Name)
    "indoors": { mounting: "Indoors" },      // Corrected to match name (plural ID to plural Name)
    // Add other specific mappings if needed, ensuring they map IDs to Names
  };

  // Find the mapping based on the URL parameter value
  const mappedValues = mapping[paramValue || ''];

  if (mappedValues) {
    // Return the mapped category and mounting type
    return {
      category: mappedValues.category || null,
      mounting: mappedValues.mounting || null
    };
  }

  // If no specific mapping is found, return null for both
  // console.warn(`URL parameter "${paramValue}" did not map to a valid filter option.`); // Keep console warning or remove
  return { category: null, mounting: null };
};


// Extract the client-side logic into a separate component
const ClientSideContent: FC = () => {
     // Get URL search parameters
    const searchParams = useSearchParams();

    // Get the category ID from the URL parameter
    // Use a fallback like undefined if the parameter is not present
    const categoryIdParam = searchParams.get('category');

    // Look up the full category data object from the imported data
    const currentCategory = categoryIdParam ? productCategories[categoryIdParam] : undefined;


    // State for each dropdown visibility
    const [showMountingDropdown, setShowMountingDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    // State for selected filter options - Initialized as empty arrays
    const [selectedMountingTypes, setSelectedMountingTypes] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Refs for the dropdowns and their buttons to detect outside clicks
    const mountingDropdownRef = useRef<HTMLDivElement>(null);
    const mountingButtonRef = useRef<HTMLButtonElement>(null);

    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const categoryButtonRef = useRef<HTMLButtonElement>(null);

    // Effect to read URL parameters on initial load and set filter state
    useEffect(() => {
      const categoryParam = searchParams.get('category');
      const mountingParam = searchParams.get('mounting');

      const initialCategories: string[] = [];
      const initialMountingTypes: string[] = [];

      // Map URL parameters to filter options using the improved mapping function
      const mappedCategory = mapUrlParamToFilterOption(categoryParam).category;
      if (mappedCategory) {
        initialCategories.push(mappedCategory);
      }

      const mappedMounting = mapUrlParamToFilterOption(mountingParam).mounting;
       if (mappedMounting) {
        initialMountingTypes.push(mappedMounting);
      }

      // Update state only if there are parameters to apply
      if (initialCategories.length > 0 || initialMountingTypes.length > 0) {
          setSelectedCategories(initialCategories);
          setSelectedMountingTypes(initialMountingTypes);

          // Optionally, open the dropdowns if filters were applied via URL
          // if (initialCategories.length > 0) setShowCategoryDropdown(true);
          // if (initialMountingTypes.length > 0) setShowMountingDropdown(true);
      } else {
          // If no parameters are present, ensure filters are reset
          setSelectedCategories([]);
          setSelectedMountingTypes([]);
      }

    }, [searchParams]); // Dependency array includes searchParams so effect re-runs if URL changes

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
        // This logic seems slightly off if you click one dropdown button and the other is open -
        // it might close the one you clicked. A simpler approach might be to just close both
        // if clicking outside *either* dropdown button/area.
        // Let's keep your existing logic for now based on the shared code, but note it.
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
    }, [showMountingDropdown, showCategoryDropdown]); // Dependencies include dropdown states


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
      // NOTE: You might want to update the URL here as well to reflect the selected filters
      // This would make the filtered view shareable and bookmarkable. (Using useRouter or useSearchParams replace)
    };

    // Function to filter products based on selected options
    const filterProducts = () => {
      // If no filters are selected, show all products
      if (selectedMountingTypes.length === 0 && selectedCategories.length === 0) {
        return allProducts;
      }

      // Filter products based on selected categories AND selected mounting types
      return allProducts.filter((product) => {
        const passesCategoryFilter =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const passesMountingFilter =
          selectedMountingTypes.length === 0 || selectedMountingTypes.includes(product.mountingType);

        // Product must match AT LEAST one selected category (if any are selected)
        // AND AT LEAST one selected mounting type (if any are selected)
        return passesCategoryFilter && passesMountingFilter;
      });
    };

    // Get the filtered list of products
    const filteredProducts = filterProducts();

     // Base button style (transparent background, black font) - Defined here as it's used in this component
    const baseButtonStyle: React.CSSProperties = {
      padding: "16px 8px",
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
      backgroundColor: "transparent", // Default transparent background
      color: "#000", // Default black font
      transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
    };

    // Data for the 4 buttons - Defined here as it's used in this component
    const buttons = [
      { label: "FILTER BY" }, // Filter by button retains original styling
      { label: "CATEGORY" },
      { label: "MOUNTING TYPE" },
      { label: "INSTALLATION TYPE" },
    ];

     // Helper function to render dropdown content (checkboxes) - Defined here
    const renderDropdownOptions = (options: string[], type: "mounting" | "category") => {
      const selectedOptions = type === "mounting" ? selectedMountingTypes : selectedCategories;
      return options.map((option, idx) => (
        <div key={idx} className="flex items-center mb-2">
          <input
            id={`${type}-option-${idx}`}
            type="checkbox"
            className="form-checkbox"
            style={{ accentColor: "#000" }}
            checked={selectedOptions.includes(option)} // Check if option is in selected state
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
        <> {/* Use a fragment to return multiple elements */}

             {/* --- Dynamic Hero Section (MOVED HERE into ClientSideContent) --- */}
             {/* This section now has access to searchParams and currentCategory */}
             <section id="hero" className="relative w-auto h-[656px] mb-[140px]"> {/* Added mb-140px */}
                 {/* Dynamic Hero Background Image */}
                 <Image
                   // Use the image from the found category, or a default if currentCategory is undefined or image is missing
                   src={currentCategory?.heroImage || "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2359943f-dce7-4e87-3f16-629da74ecc00/public"} // Fallback static image
                   alt={`Hero image for ${currentCategory?.title || 'Products'}`} // Dynamic alt text
                   layout="fill"
                   objectFit="cover" // Use cover to ensure it fills the space
                 />

                 {/* Dynamic Text and Image Overlays (Adjust positioning/styling as needed) */}
                  {/* Add title element similar to the other page */}
                  <div
                     className="absolute"
                     style={{
                       bottom: "33%", // Example positioning
                       left: "calc(4.16666%)", // Example positioning
                       fontFamily: "'Inter Tight', sans-serif",
                       fontWeight: 500,
                       fontSize: "48px",
                       lineHeight: "110%",
                       color: "#fff", // Assuming white text on dark background
                       zIndex: 20, // Ensure text is above background image
                     }}
                   >
                     {/* Display category title if available, otherwise a default */}
                     {currentCategory?.title || 'All Products'}
                   </div>

                 {/* Add overlay image element similar to the other page */}
                 <div
                   className="absolute"
                   style={{
                      bottom: "30%", // Example positioning
                      right: "calc(3.473%)", // Example positioning
                      width: "393px", // Example size
                      height: "159px", // Example size
                      zIndex: 20, // Ensure overlay is above background image
                   }}
                 >
                   <Image
                     // Use the overlay image from the found category, or a default
                     src={currentCategory?.overlayImage || "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c238dd1f-ef2b-4894-740e-0214c726b400/public"} // Fallback static overlay image
                     alt={`Overlay graphic for ${currentCategory?.title || 'Products'}`} // Dynamic alt text
                     width={393} // Must match div size or use fill
                     height={159} // Must match div size or use fill
                     className="object-contain"
                   />
                 </div>

                  {/* Scroll indicator - you might want to keep this */}
                   <div
                     className="absolute uppercase"
                     style={{
                       bottom: "30%", // Example positioning
                       left: "calc(4.16666%)", // Example positioning
                       width: "104px",
                       height: "12px",
                       fontFamily: "'Inter Tight', sans-serif",
                       fontWeight: 500,
                       fontSize: "10px",
                       lineHeight: "100%",
                       color: "#fff", // Assuming white text
                       zIndex: 20,
                     }}
                   >
                     Scroll for more ⤵︎
                   </div>

               </section>


             {/* Buttons Section */}
            <section className="mx-auto max-w-[1440px] px-[9.72%]">
              {/* Gap of 120px after the hero (This replaces the margin on the hero section above) */}
               <div style={{ height: "120px" }} />


              <div
                className="flex gap-4 pb-4"
                // style={{ justifyContent: "justify-between" }} // Consider using justify-between if flex items don't fill space
              >
                {buttons.map((btn, index) => {
                  // --- FILTER BY Button (Always Black Background) ---
                  if (btn.label === "FILTER BY") {
                    return (
                      <div
                        key={index}
                        className="flex justify-between" // Keep this or adjust parent flex?
                        style={{ flex: 1, maxWidth: "16%" }} // Max width retained
                      >
                        <button
                          style={{
                            ...baseButtonStyle, // Start with base styles
                            backgroundColor: "#000", // Override for black background
                            color: "#fff", // Override for white font
                            flex: 1, // Allow button to fill container div
                            paddingLeft: "41.67px", // Specific padding
                            paddingRight: "41.67px", // Specific padding
                            whiteSpace: "nowrap",
                            borderRight: "0.67px solid #00000066",
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
                      <div key={index} className="relative" style={{ width: "23%" }}> {/* Adjusted width */}
                        <button
                          ref={categoryButtonRef}
                          style={{
                            ...baseButtonStyle, // Start with base styles (transparent/black)
                            flex: "unset", // Don't let flex grow
                            width: "100%", // Fill parent div
                            // Conditionally apply black background and white font if dropdown is open OR if category filter is selected
                            ...(showCategoryDropdown || selectedCategories.length > 0 ? { backgroundColor: "#000", color: "#fff" } : {}),
                          }}
                          onClick={() => setShowCategoryDropdown((prev) => !prev)}
                          className="w-full px-2 flex justify-between items-center" // Added items-center
                        >
                          <span className="flex gap-4 whitespace-nowrap">
                            {btn.label}
                            {/* SVG Arrow */}
                            <svg
                              className={`w-2.5 h-2.5 transition-transform duration-500 ${
                                showCategoryDropdown ? "rotate-180" : ""
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
                          ref={categoryDropdownRef}
                          className={`absolute left-0 top-full w-full bg-white transition-all duration-500 ease-in-out ${
                            showCategoryDropdown
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-0.5 pointer-events-none"
                          }`}
                          style={{
                            boxShadow: "0px 4px 4px 0px #00000040",
                            padding: "20px 8px",
                            zIndex: 10,
                            maxHeight: "200px",
                            overflowY: "auto",
                            border: "1px solid #D9D9DC", // Added border for definition
                          }}
                        >
                          {renderDropdownOptions(categoryOptions, "category")}
                        </div>
                      </div>
                    );
                  }
                  // --- MOUNTING TYPE Button (Dropdown) ---
                  else if (btn.label === "MOUNTING TYPE") {
                    return (
                      <div key={index} className="relative" style={{ width: "16%" }}> {/* Adjusted width */}
                        <button
                          ref={mountingButtonRef}
                          style={{
                            ...baseButtonStyle, // Start with base styles (transparent/black)
                            flex: "unset", // Don't let flex grow
                            width: "100%", // Fill parent div
                             // Conditionally apply black background and white font if dropdown is open OR if mounting filter is selected
                            ...(showMountingDropdown || selectedMountingTypes.length > 0 ? { backgroundColor: "#000", color: "#fff" } : {}),
                          }}
                          onClick={() => setShowMountingDropdown((prev) => !prev)}
                          className="w-full px-2 flex justify-between items-center" // Added items-center
                        >
                          <span className="flex items-center gap-4 whitespace-nowrap">
                            {btn.label}
                             {/* SVG Arrow */}
                            <svg
                              className={`w-2.5 h-2.5 transition-transform duration-500 ${
                                showMountingDropdown ? "rotate-180" : ""
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
                          ref={mountingDropdownRef}
                          className={`absolute left-0 top-full w-full bg-white transition-all duration-500 ease-in-out ${
                            showMountingDropdown
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 -translate-y-0.5 pointer-events-none"
                          }`}
                          style={{
                            boxShadow: "0px 4px 4px 0px #00000040",
                            padding: "20px 8px",
                            zIndex: 10,
                            maxHeight: "200px",
                            overflowY: "auto",
                             border: "1px solid #D9D9DC", // Added border for definition
                          }}
                        >
                          {renderDropdownOptions(mountingOptions, "mounting")}
                        </div>
                      </div>
                    );
                  }
                   // --- INSTALLATION TYPE Button (Transparent Background) ---
                   // Render the Installation Type button
                  //  else if (btn.label === "INSTALLATION TYPE") { // Added condition for Installation Type
                  //     return (
                  //       <button
                  //         key={index}
                  //         style={{
                  //           ...baseButtonStyle, // Start with base styles (transparent/black)
                  //           flex: 1, // Allow button to fill container div
                  //           maxWidth: "23%", // Retains maxWidth
                  //         }}
                  //         // No onClick functionality or state change needed for styling based on prompt interpretation
                  //       >
                  //         <span className="flex items-center">
                  //           {btn.label}
                  //         </span>
                  //       </button>
                  //     );
                  //  }
                   // Default case for any other buttons (shouldn't happen with current 'buttons' array)
                   return null;
                })}
              </div>

              {/* Horizontal rule */}
              <hr style={{ borderColor: "#00000066" }} />
            </section>

            {/* Products Grid Section */}
            <section className="mx-[9.72%] mb-[9.72%]">
              {/* 80px gap after the horizontal rule */}
              <div style={{ height: "80px" }} />

              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" // Added responsive grid classes and gap
              >
                {/* Map over filtered products */}
                {filteredProducts.map((product, index) => (
                  // Wrap the product item in a Link component
                  <Link
                    key={index}
                    href={`/${product.name.toLowerCase().replace(/ /g, "-")}`} // Placeholder URL
                    passHref // Use passHref with custom components like a styled div
                  >
                    {/* The entire product item becomes clickable */}
                    <div className="flex flex-col items-center cursor-pointer"> {/* Added cursor-pointer for visual cue */}
                      {/* Wrap image in a container to apply the zoom effect */}
                      <div className="overflow-hidden rounded-md"> {/* Added rounded-md */}
                        <div className="transition-transform duration-1000 ease-in-out hover:scale-110">
                          <Image
                            src={product.src}
                            alt={product.name}
                            width={360} // Example fixed size, adjust as needed
                            height={360} // Example fixed size, adjust as needed
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
               {/* Message if no products match the filters */}
               {filteredProducts.length === 0 && (
                  <div className="text-center text-gray-600 mt-8">
                    No products found matching the selected filters.
                  </div>
               )}
            </section>
        </>
    )
}


// Main page component that includes the Suspense boundary and static elements
const Home: FC = () => {
  // Arrays for menu items - These can remain outside ClientSideContent as they don't use searchParams
  // Moved these definitions inside Home as they are only used here now
  const productsItems = [
    { text: "This is Us", href: "/inside-wae" },
    { text: "Our Portfolio", href: "/our-portfolio" },
    { text: "Reimagine Work", href: "/careers" },
  ];
  const blueprintItems = [
    { text: "Sustainability", href: "/sustainability" },
    { text: "The Activist Co.", href: "/the-activist-co" },
    { text: "Blog", href: "/blogs2" },
  ];


  return (
    <main>
      {/* Normal Header (Remains here as it seems mostly static) */}
      <header className={`w-full relative z-10 mb-5 px-[9.72%]`}>
          {/* Apply containerClass inside header content div */}
          <div> {/* Removed containerClass here, used px-[9.72%] on header instead */}
            {/* Top Row: Navigation */}
            <div
              className="grid grid-cols-5 items-center pt-[30px] pb-[10px] uppercase"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "100%",
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
                <Link href="/homepage3">
                  <Image
                    src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/34074342-7005-4a25-9763-86933d6e7700/public"
                    alt="WAE Logo"
                    width={78}
                    height={82}
                  />
                </Link>
              </div>

              {/* Coordinates */}
              <div
                className="flex flex-col justify-center inline-block mr-1"
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
                className="flex flex-col justify-center inline-block mr-1"
                style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  lineHeight: "100%",
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
                      fontSize: "12px",
                      lineHeight: "100%",
                    }}
                  >
                    <Link href={item.href} className="contents"> {/* Use 'contents' to allow styling of the parent */}
                      <div className="c--anim-btn">
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
                      </div>
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
                    <Link href={item.href} className="contents"> {/* Use 'contents' here as well */}
                      <div className="c--anim-btn">
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
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* --- REMOVED STATIC HERO SECTION FROM HERE --- */}
        {/*
        <section id="hero" className="relative w-auto h-[656px]">
          <Image
            src="https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2359943f-dce7-4e87-3f16-629da74ecc00/public"
            alt="Hero background"
            layout="fill"
            objectFit="contain"
          />
        </section>
        */}

      {/* >>> Wrap the content that uses useSearchParams and state in Suspense */}
      {/* The Dynamic Hero is now rendered inside ClientSideContent */}
      <Suspense fallback={<div>Loading filters and products...</div>}>
         {/* Render the main content that uses client-side hooks */}
         <ClientSideContent />
      </Suspense>


      {/* More Products SECTION (Remains here as it's static) */}
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
          {/* Hardcoded RelatedCard components */}
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

      {/* Footer Section (Remains here) */}
      <Footer />

      {/* Custom styles for animations, RelatedCard titles and descriptions (Remains here) */}
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