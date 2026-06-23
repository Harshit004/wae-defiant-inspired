export interface Writer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  link: string;
}

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list';
  text?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  imageSrcHover: string;
  heroImage: string;
  writerId: string;
  readTime: string;
  status: 'Live' | 'Draft';
  createdAt: string;
  contentColumns: [ContentBlock[], ContentBlock[], ContentBlock[]];
}

export const WRITERS: Record<string, Writer> = {
  "aditi-sharma": {
    "id": "aditi-sharma",
    "name": "Aditi Sharma",
    "role": "Executive - Marketing, WAE",
    "bio": "Aditi Sharma explores sustainability and climate change with a focus on climate action and environmental responsibility. With over two years of professional experience, her work connects research, corporate sustainability practices, and strategic communication.",
    "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/471bde63-5514-44fd-67a7-d06a24417100/public",
    "link": "/aditi-sharma"
  },
  "rehnuma-ansari": {
    "id": "rehnuma-ansari",
    "name": "Rehnuma Ansari",
    "role": "Executive - Marketing, WAE",
    "bio": "Ms. Rehnuma explores water conservation with a focus on groundwater, agriculture, and sustainability in India. With over 1.5 years of experience, her work connects research, policy context, and on-ground realities to frame water management.",
    "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9f13e92f-a500-4052-dd61-2bd0951c1900/public",
    "link": "https://www.linkedin.com/in/rehnumashakir/"
  },
  "rashi-tarika": {
    "id": "rashi-tarika",
    "name": "Rashi Tarika",
    "role": "Executive - Marketing, WAE",
    "bio": "Rashi Tarika explores climate policy and water management. Her writing focuses on the intersections of environmental governance, public policy, and corporate sustainable development strategies to drive climate action.",
    "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b6642388-9861-4396-d81f-219b1cd51100/public",
    "link": "https://www.linkedin.com/in/rashi-tarika-89727a43/"
  },
  "shambhavi": {
    "id": "shambhavi",
    "name": "Shambhavi",
    "role": "Executive - Marketing, WAE",
    "bio": "Ms. Shambhavi Yadav explores sustainability, policy, and governance through a research-led lens. A seasoned professional with over 7 years of experience, she is NET qualified, a graduate from LSR, DU, and is a 3-time KPMG scholar.",
    "image": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/756f0c58-33ea-496a-5c76-f485ccb09800/public",
    "link": "https://in.linkedin.com/in/shambhavi-yadav-61b937276"
  }
};

export const BLOGS: Record<string, BlogPost> = {
  "from-kyoto-to-cop28": {
    "id": "from-kyoto-to-cop28",
    "title": "From Kyoto to COP28, The Epic Journey of Global Climate Agreements and the Fight for Our Planet's Future",
    "category": "Climate Change & Water",
    "description": "In the quiet halls of Kyoto in 1997, something monumental began: a collective awakening of the world's conscience towards the mounting crisis of climate change.",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/384e8a97-27a3-4c0f-f02e-348a8a0bfa00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/bf4fc4f5-cfc3-4eb9-ac32-bac46f834a00/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "aditi-sharma",
    "readTime": "2 min read",
    "status": "Live",
    "createdAt": "2026-06-23T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "In the quiet halls of Kyoto in 1997, something monumental began—a collective awakening of the world's conscience towards the mounting crisis of climate change. What followed was a turbulent yet determined journey, a series of historic global agreements that would shape the planet's climate policy for decades to come, culminating (for now) in COP28. This is not just a timeline—it's the story of how humanity has tried, failed, and continued to try again in its battle against a warming world."
        },
        {
          "type": "heading",
          "text": "The Dawn: Kyoto Protocol—the First Global Climate Commitment"
        },
        {
          "type": "paragraph",
          "text": "The Kyoto Protocol, adopted in December 1997 and entered into force in 2005, was the first legally binding climate treaty. It asked industrialized nations—primarily responsible for historical emissions—to reduce greenhouse gases by an average of 5% below 1990 levels between 2008 and 2012. It was revolutionary. It introduced market-based mechanisms like the Clean Development Mechanism (CDM) and carbon trading—trying to make sustainability economically viable."
        },
        {
          "type": "paragraph",
          "text": "But Kyoto had its flaws. While the U.S.—one of the largest emitters—never ratified it. And developing countries, including China and India, had no binding targets, sparking criticism and limiting its global effectiveness. Still, Kyoto was a vital first step. It created a legal architecture and introduced the concept of accountability in climate policy."
        },
        {
          "type": "heading",
          "text": "Transition & Tension: From Kyoto to Paris"
        },
        {
          "type": "paragraph",
          "text": "Post-Kyoto, the world grew more complex. Global emissions soared. China became the world's largest emitter. The global financial crisis diverted attention. Yet, scientific consensus deepened—IPCC reports warned of rising sea levels, glacial melt, extreme weather."
        },
        {
          "type": "paragraph",
          "text": "Copenhagen's COP15 in 2009 was a diplomatic heartbreak. Expectations were sky-high, but no binding treaty emerged. However, it sowed seeds for future frameworks, like voluntary commitments and climate finance."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Finally, in 2015, the Paris Agreement was born at COP21. Unlike Kyoto, it brought both developed and developing nations under a single framework, aiming to limit global warming to \"well below 2°C\"—ideally 1.5°C. The Paris Agreement wasn't legally binding in terms of emission targets, but it required countries to submit Nationally Determined Contributions (NDCs), which would be reviewed every five years for ambition and progress."
        },
        {
          "type": "paragraph",
          "text": "It was less about enforcement, more about transparency and global peer pressure."
        },
        {
          "type": "heading",
          "text": "The Present Storm: COP28 and the Crossroads of Climate Policy"
        },
        {
          "type": "paragraph",
          "text": "Enter COP28, held in Dubai, UAE in 2023—a moment heavy with contradictions and expectations. Hosted by an oil-producing nation, led by Sultan Al Jaber, the summit faced scepticism but turned heads with a historic milestone: the first ever mention of \"transitioning away from fossil fuels\" in an official agreement."
        },
        {
          "type": "paragraph",
          "text": "COP28 brought the first Global Stocktake—a comprehensive review of where the world stands since Paris. The results? Stark."
        },
        {
          "type": "list",
          "items": [
            "The world is not on track to meet 1.5°C.",
            "Emissions must peak before 2025 and fall by 43% by 2030 to stay on course.",
            "Adaptation financing is lagging, and loss-and-damage funding is still too slow."
          ]
        },
        {
          "type": "heading",
          "text": "Key agreements included:"
        },
        {
          "type": "list",
          "items": [
            "A Loss and Damage Fund finally operationalized, with pledges of over $700 million to support vulnerable countries.",
            "A push for tripling renewable energy capacity by 2030.",
            "Recognition of the need to phase out unabated fossil fuels although language remained ambiguous under pressure from oil-rich nations."
          ]
        }
      ],
      [
        {
          "type": "heading",
          "text": "Scientific Backdrop & Climate Reality"
        },
        {
          "type": "paragraph",
          "text": "Let's not forget the data:"
        },
        {
          "type": "list",
          "items": [
            "The planet has already warmed by about 1.1°C since pre-industrial times.",
            "The 2020s are set to be the hottest decade on record, with 2023 likely becoming the hottest year.",
            "The Arctic is warming nearly four times faster than the global average.",
            "Sea levels have risen by about 21–24 cm since 1880.",
            "Climate-related disasters have increased fivefold over the past 50 years, according to WMO."
          ]
        },
        {
          "type": "paragraph",
          "text": "The science is unrelenting. We are running out of time, and the carbon budget for 1.5°C could be exhausted before 2030 if current trends continue."
        },
        {
          "type": "heading",
          "text": "What Now? A World at a Tipping Point"
        },
        {
          "type": "paragraph",
          "text": "From Kyoto's baby steps to COP28's cautious declarations, the evolution of climate diplomacy reflects humanity's struggle between ambition and inertia, politics and science, development and survival. The agreements have grown more inclusive but still fall short on urgency and enforcement."
        },
        {
          "type": "paragraph",
          "text": "The coming years will be decisive. Climate change is no longer tomorrow's threat, it's today's crisis. It is not enough to make promises in plush conference halls. The real work must happen on the ground - in policies, in boardrooms, on farms, and in cities."
        },
        {
          "type": "paragraph",
          "text": "As the world now looks towards COP29 and beyond, the story is still being written. The question is: will it be one of redemption, or regret?"
        }
      ]
    ]
  },
  "industrial-revolution-to-the-carbon-age": {
    "id": "industrial-revolution-to-the-carbon-age",
    "title": "Industrial Revolution to the Carbon Age: How We Got There",
    "category": "Industry Impact and Solutions",
    "description": "The story begins in the smoky heart of 18th-century England...",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2bcd53b1-c103-4faf-bd00-29a04ff0ee00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/13245178-9299-4091-ebca-89c63b972600/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "aditi-sharma",
    "readTime": "3 min read",
    "status": "Live",
    "createdAt": "2026-06-22T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "The story begins in the smoky heart of 18th-century England. Coal dust filled the air as the first every corner of the globe. What started as the Industrial Revolution an era of machines and mechanization quickly became something far more consequential: the dawn of the Carbon Age."
        },
        {
          "type": "paragraph",
          "text": "In the early 1700s, the world relied on wood, water wheels, and manual labour. But by the mid-18th century, coal became the fuel of progress. In Britain alone, coal production rose from 3 million tons in 1750 to over 290 million tons by 1913. It powered factories, locomotives, steamships, and cities. By 1800, James Watt’s steam engine had revolutionized industry, allowing humans to extract and burn fossil fuels on an unprecedented scale."
        },
        {
          "type": "paragraph",
          "text": "Yet, this technological leap came with an invisible cost one we wouldn’t fully grasp for nearly two centuries. Carbon dioxide (CO₂), a natural component of Earth’s atmosphere, began to accumulate. At the time, it was imperceptible. There were no satellites, no climate models, no atmospheric measurements. But the chemistry of coal combustion ensured that every ton burned was releasing CO₂ into the sky a silent alchemy with planetary consequences."
        },
        {
          "type": "paragraph",
          "text": "The Second Industrial Revolution of the late 19th and early 20th centuries accelerated this trend. Oil and natural gas entered the scene. In 1900, global CO₂ emissions from fossil fuels were around 2 billion metric tons. By the 1950s, this had tripled. And then came the “Great Acceleration.” Between 1950 and 2020, humanity emitted more carbon than in all previous history combined. In 2022 alone, fossil fuel emissions reached an all-time high of 36.6 billion metric tons, according to the Global Carbon Project."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "As energy systems globalized, so too did their impacts. The Keeling Curve—a simple graph of atmospheric CO₂ concentrations started in 1958 offered the first clear warning. From 315 parts per million (ppm) then, we now stand at 423 ppm in 2024, a level not seen in at least 800,000 years, confirmed through Antarctic ice core data. These numbers are not just abstract science. They translate into rising global temperatures, sea level rise, and ecological shifts."
        },
        {
          "type": "paragraph",
          "text": "The Earth, once in equilibrium, is now in flux."
        },
        {
          "type": "paragraph",
          "text": "Global average surface temperatures have increased by 1.2°C since pre-industrial levels, and if current emission trends continue, we are on track for 2.4–2.8°C of warming by 2100, well beyond the Paris Agreement's target of 1.5°C. Sea levels have risen by 23 cm since 1880, and satellite data show a current rate of about 3.3 mm per year, with acceleration expected as polar ice continues to melt."
        },
        {
          "type": "paragraph",
          "text": "The consequences are visible across continents. The Arctic is warming four times faster than the rest of the world. Greenland alone is losing 270 billion tons of ice annually, contributing significantly to sea level rise. Glaciers are retreating from the Alps to the Andes. Wildfires have intensified: 2023 saw Canada experience its worst wildfire season on record, burning more than 18.5 million hectares. Meanwhile, floods in Pakistan in 2022 displaced over 33 million people, illustrating how climate events are growing in both frequency and ferocity."
        },
        {
          "type": "paragraph",
          "text": "Climate is no longer a future concern it is a lived reality. "
        },
        {
          "type": "paragraph",
          "text": "But history doesn’t end in despair. Humanity is beginning to respond."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Renewable energy is scaling faster than ever before. Solar PV and wind together accounted for 12% of global electricity generation in 2023, with solar capacity alone growing by over 24% year-on-year. According to the International Energy Agency (IEA), renewables could supply almost 50% of global electricity by 2030 if current momentum continues. Electric vehicles (EVs) crossed the milestone of over 14 million global sales in 2023, nearly 20% of total car sales."
        },
        {
          "type": "paragraph",
          "text": "Policies are shifting too. Over 90 countries have net-zero commitments. The EU’s Green Deal, India’s push for solar under the International Solar Alliance, and China’s carbon neutrality target by 2060 all signal a geopolitical reorientation toward sustainability."
        },
        {
          "type": "paragraph",
          "text": "This era is a reckoning but also an opportunity."
        },
        {
          "type": "paragraph",
          "text": "The same industrial engine that powered human progress now demands a reimagination. From grey infrastructure to green resilience, from extractive growth to circular economies, from fossil dependence to regenerative design this is the pivot point."
        },
        {
          "type": "paragraph",
          "text": "We arrived here over centuries, powered by coal, oil, and ambition. But now, in this decisive decade, the path forward will depend on collective will, technological innovation, and ecological consciousness. Because while the Carbon Age has shaped the past 250 years, the next chapter will be written not in emissions but in solutions."
        },
        {
          "type": "paragraph",
          "text": "And that story is just beginning."
        }
      ]
    ]
  },
  "climate-change-in-the-indian-subcontinent": {
    "id": "climate-change-in-the-indian-subcontinent",
    "title": "Climate Change in the Indian Subcontinent: A Historical and Scientific Perspective",
    "category": "Climate Change & Water",
    "description": "The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century.",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/c1a66615-4c62-4975-d446-cffbf3c92300/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4addca72-6f79-4c23-9c24-c400cd9b6a00/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "aditi-sharma",
    "readTime": "3 min read",
    "status": "Live",
    "createdAt": "2026-06-21T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "The Indian subcontinent, a region of remarkable ecological diversity and cultural heritage, has been undergoing a profound transformation in its climate over the past century. As temperatures rise and weather patterns grow increasingly unpredictable, millions of lives and livelihoods are hung in the balance."
        },
        {
          "type": "paragraph",
          "text": "Historically, the region has been defined by its monsoonal cycle—a vital heartbeat that sustains agriculture, replenishes water reserves, and drives the economy. However, scientific observations show that this pattern is shifting. The intensity of extreme rain events is increasing while the overall number of rainy days is decreasing, leading to a dangerous cycle of intense floods and prolonged droughts."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "The scientific evidence is clear. Average temperatures across India have risen by approximately 0.7°C over the past century, a change that has directly accelerated glacial melt in the Himalayas. The glaciers, often referred to as the \"Third Pole,\" are retreating at rates that threaten the perennial flow of major river systems like the Indus, Ganges, and Brahmaputra, which provide fresh water to more than 700 million people."
        },
        {
          "type": "paragraph",
          "text": "In addition to freshwater challenges, the region is highly vulnerable to sea-level rise and rising sea surface temperatures, which fuel more frequent and intense cyclones in the Bay of Bengal and the Arabian Sea."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Addressing these challenges requires a concerted effort to shift from reactive disaster response to proactive resilience building. This involves implementing sustainable agricultural practices, investing in rainwater harvesting and water management infrastructure, and restoring natural buffers like wetlands and mangrove ecosystems."
        },
        {
          "type": "paragraph",
          "text": "The journey toward climate resilience in the Indian subcontinent is complex and demanding. However, by combining scientific knowledge, policy innovation, and community-driven action, the region can navigate this climate crisis and secure a sustainable future for its populations."
        }
      ]
    ]
  },
  "the-ozone-crisis": {
    "id": "the-ozone-crisis",
    "title": "The Ozone Crisis: A Success Story in Environmental Cooperation",
    "category": "Policy",
    "description": "It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth.",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/3b5e02f3-da40-4cad-61e2-dd1eb34f8b00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/0c3eb242-b13a-443c-da32-a78bce6e7a00/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "aditi-sharma",
    "readTime": "2 min read",
    "status": "Live",
    "createdAt": "2026-06-20T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "It began almost invisibly, high above our heads, in the delicate veil of atmosphere that quietly shields every form of life on Earth. In the late 20th century, scientists discovered that human-made chemicals, primarily chlorofluorocarbons (CFCs), were rapidly destroying this shield, creating a massive \"hole\" in the ozone layer over Antarctica."
        },
        {
          "type": "paragraph",
          "text": "This revelation triggered global alarm. Without the ozone layer, harmful ultraviolet radiation would reach the surface, leading to a surge in skin cancers, cataracts, and catastrophic damage to marine and terrestrial ecosystems."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "What followed is widely regarded as the most successful environmental mobilization in human history. In 1987, the international community came together to sign the Montreal Protocol, a landmark agreement to phase out the production and consumption of ozone-depleting substances. The treaty was designed with flexibility, allowing it to be adjusted as scientific understanding evolved, and it provided financial assistance to help developing nations transition to safer alternatives."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Today, the Montreal Protocol stands as a testament to what global cooperation can achieve. The ozone layer is steadily healing, with scientists predicting it could fully recover by the mid-21st century. This success story offers crucial lessons and a glimmer of hope as the world confronts the even larger challenge of global climate change."
        }
      ]
    ]
  },
  "the-great-water-trade": {
    "id": "the-great-water-trade",
    "title": "The Great Water Trade: How the Plastic Bottle Industry Exploits India's Groundwater",
    "category": "Water conservation",
    "description": "India's hydrological landscape has always been shaped by the monsoon...",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7e883368-e898-4dc0-31b8-301fbbcaaf00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9abaeabf-b8e5-4fc0-b8f8-46f5df2a4000/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "rehnuma-ansari",
    "readTime": "4 min read",
    "status": "Live",
    "createdAt": "2026-06-19T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "India's hydrological landscape has always been shaped by the monsoon, but under the surface lies an invisible crisis. The rapid extraction of groundwater by commercial entities, particularly the bottled water industry, is pushing rural communities to the brink of severe water scarcity."
        },
        {
          "type": "paragraph",
          "text": "Groundwater is the lifeline for over 80% of India's rural population, serving as their primary source of drinking water and agricultural irrigation. However, commercial bottling plants often set up operations in areas with weak regulatory oversight, pumping out millions of liters of water daily, bottling it, and exporting it to urban centers."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "This commercial extraction has severe repercussions. Local wells dry up, forcing villagers, mostly women, to walk miles daily to secure basic drinking water. Farmers find their borewells failing, leading to crop failures and escalating financial debt. The ecological impact is equally alarming, as declining water tables lead to soil degradation and the drying up of local streams and wetlands."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "To combat this exploitation, India needs a comprehensive regulatory overhaul. This includes establishing strict extraction limits, mandating groundwater recharge projects for commercial facilities, and empowering local communities to manage and protect their shared water resources. Water must be treated as a fundamental human right, not a commodity for corporate profit."
        }
      ]
    ]
  },
  "the-north-star-of-progress": {
    "id": "the-north-star-of-progress",
    "title": "The North Star of Progress: A Historical Lens on Climate Change and India's Sustainable Future",
    "category": "Policy",
    "description": "In an era defined by climate volatility, rising inequalities, and fractured global priorities...",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/e44c37c6-3be1-4f60-27bd-8cbfcb181200/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/7b9cb7b8-1b96-42ca-b73b-4420a8b55800/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "shambhavi",
    "readTime": "3 min read",
    "status": "Live",
    "createdAt": "2026-06-18T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "In an era defined by climate volatility, rising inequalities, and fractured global priorities, sustainable development has emerged as the definitive North Star of progress. For a rapidly growing nation like India, balancing developmental aspirations with ecological preservation is the defining challenge of the 21st century."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Sustainable development is not merely an environmental objective; it is a holistic blueprint for social and economic transformation. By integrating renewable energy targets, circular economy models, and climate-resilient urban planning, India can build a future that is both prosperous and sustainable."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "This transformation requires strong leadership, policy coordination, and citizen mobilization. By aligning corporate strategies, public investments, and individual choices with sustainable goals, India can lead by example and demonstrate that development and ecology can go hand in hand."
        }
      ]
    ]
  },
  "the-link-between-climate-change-and-water-scarcity": {
    "id": "the-link-between-climate-change-and-water-scarcity",
    "title": "The link between climate change and water scarcity",
    "category": "Water conservation",
    "description": "Exploring the fragile link between rising temperatures, shifts in weather patterns, and the direct impact on global freshwater resources.",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/2e08117e-8553-489e-9837-0a565ca57d00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/9415d6a5-d78b-40ea-805a-726ed7ad5300/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "rehnuma-ansari",
    "readTime": "2 min read",
    "status": "Live",
    "createdAt": "2026-06-17T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "Exploring the fragile link between rising temperatures, shifts in weather patterns, and the direct impact on global freshwater resources. As temperatures rise globally, the water cycle accelerates, leading to more intense evaporation and drying up of freshwater reserves."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Climate change is altering the timing and availability of water, meaning that regions already facing water stress are seeing the crisis deepen. From dried-out reservoirs to depleted groundwater aquifers, the indicators of scarcity are expanding."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Mitigating this crisis requires active water conservation practices, restoring degraded catchments, and adopting smart water technologies to ensure efficient distribution and minimize wastage."
        }
      ]
    ]
  },
  "melting-glacier-rising-risk": {
    "id": "melting-glacier-rising-risk",
    "title": "Melting Glacier - Rising Risk: Climate change and fresh water supplies",
    "category": "Water conservation",
    "description": "How rapid glacial retreat in major mountain ranges is redefining fresh water security for millions of downstream communities.",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/61141311-204f-4b43-a860-e47337e84b00/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/123e2424-f87e-44f6-c857-90f9e4553400/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "rashi-tarika",
    "readTime": "3 min read",
    "status": "Live",
    "createdAt": "2026-06-16T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "How rapid glacial retreat in major mountain ranges is redefining fresh water security for millions of downstream communities. Glaciers store a significant portion of the world's freshwater and serve as natural regulators of river flow."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "The acceleration of glacial melt, driven by rising global temperatures, initially increases the risk of glacial lake outburst floods, followed by long-term reductions in river flow as the glacial volume shrinks."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Securing downstream water supplies requires regional cooperation, investing in storage reservoirs, and enhancing water-use efficiency in agriculture and urban areas."
        }
      ]
    ]
  },
  "shifting-monsoons": {
    "id": "shifting-monsoons",
    "title": "Shifting Monsoons: Transforming India's Climatic and Hydrological Systems",
    "category": "Climate Change & Water",
    "description": "For centuries, the monsoon has been more than just a season in India...",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/1198ff4f-e6f9-4734-77c8-470433cff000/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/b9de44cb-3d6b-407c-730a-a15c44bc4c00/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "shambhavi",
    "readTime": "2 min read",
    "status": "Live",
    "createdAt": "2026-06-15T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "For centuries, the monsoon has been more than just a season in India; it is the lifeblood of its agricultural and hydrological systems. However, climate change is introducing significant volatility into this system."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Changes in atmospheric circulation and rising sea surface temperatures are shifting monsoonal paths and intensities, causing extreme rain events in some regions while leaving others parched."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Adapting to shifting monsoons demands flexible water storage strategies, weather-indexed crop planning, and improved disaster preparedness frameworks."
        }
      ]
    ]
  },
  "envisioning-sustainability": {
    "id": "envisioning-sustainability",
    "title": "Envisioning Sustainability: Why the SDGs Are the World's Shared Compass",
    "category": "Policy",
    "description": "In 2015, the United Nations adopted the 2030 Agenda for Sustainable Development...",
    "imageSrc": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/dd28574f-052d-4cb2-e8a5-3b15ec4d6300/public",
    "imageSrcHover": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/5dfb00d6-e403-4101-7e01-6fcdee1b5900/public",
    "heroImage": "https://imagedelivery.net/R9aLuI8McL_Ccm6jM8FkvA/4e625f4b-a383-4df4-8af3-76b0da718000/public",
    "writerId": "shambhavi",
    "readTime": "3 min read",
    "status": "Live",
    "createdAt": "2026-06-14T00:00:00.000Z",
    "contentColumns": [
      [
        {
          "type": "paragraph",
          "text": "In 2015, the United Nations adopted the 2030 Agenda for Sustainable Development, offering a shared blueprint for peace and prosperity for people and the planet, now and into the future."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "At its heart are the 17 Sustainable Development Goals (SDGs), which represent an urgent call for action by all countries in a global partnership, recognizing that ending poverty must go hand-in-hand with strategies that improve health and education."
        }
      ],
      [
        {
          "type": "paragraph",
          "text": "Achieving these goals requires strong political commitment, corporate sustainability integration, and global cooperation to address systemic inequalities and climate change."
        }
      ]
    ]
  }
};
