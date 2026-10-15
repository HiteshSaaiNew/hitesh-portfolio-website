// All site copy lives here. Edit this file and the page hot-reloads.
// Anything marked PLACEHOLDER is waiting for real content.

export const site = {
  name: 'Hitesh Saai',
  fullName: 'Hitesh Saai Mananchery Panneerselvam',
  role: 'AI/ML Engineer',
  location: 'Austin, TX',
  tagline: 'Nothing shipped by accident.',
  intro:
    'I take AI from prototype to production: LLMs that run twice as fast, agents that diagnose real incidents, and ranking models that move bookings at millions of requests an hour.',
  status: 'Open to full-time Staff / Principal AI/ML roles',
  email: 'hiteshsaaimananchery@gmail.com',
  resumeUrl: '#', // PLACEHOLDER — drop the PDF in /public and set e.g. '/resume.pdf'
  // The first screen's proof column: level, scope and checkable results.
  proof: [
    { lead: 'Principal AI Engineer', rest: 'Oracle · 2026', exhibit: 'oracle', href: '#experience' },
    { lead: 'Senior ML Engineer', rest: 'Expedia Group · 2022–2026', exhibit: 'bookings', href: '#experience' },
    { lead: '2× throughput', rest: 'on a 70B-parameter LLM', exhibit: 'throughput', href: '#experience' },
    { lead: '+4% bookings', rest: 'from flight search ranking', exhibit: 'bookings', href: '#experience' },
    { lead: 'Paper + patent', rest: 'arXiv 2406.19630 · US 12,518,222', exhibit: 'paper', href: '#research' },
  ],
  socials: [
    { label: 'GitHub', url: 'https://github.com/HiteshSaaiNew' },
    { label: 'Hugging Face', url: 'https://huggingface.co/HiteshSaai' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/hiteshsaai-mananchery/' },
  ],
}

export const about = {
  heading: 'I turn ambitious AI ideas into systems that hold up in production.',
  paragraphs: [
    "For more than eight years I've built machine learning across travel, insurance and cloud infrastructure, owning the whole lifecycle: framing the problem, building the data and training pipelines, serving models at scale, and keeping them healthy once they're live.",
    'At Expedia I led ML engineering for flight and lodging search, where ranking and recommendation models lifted bookings by 4% and 2%. I doubled the throughput of a 70B-parameter LLM, built a multimodal AI travel assistant, and cut $250K a year in compute. At Oracle I led GPU-scale LLM serving and built an agentic AI platform that spots data-center risks and finds their root causes.',
    'I can go deep on GPU profiling and KV caches, then step back to design the platform, lead the team, and tie the work to a number the business cares about.',
  ],
}

export const projects = [
  {
    title: 'OptiPixel Video Encoder',
    year: '2024',
    summary:
      'Official code for my arXiv paper: removes redundant pixels between frames using deep-learning pixel tracking, cutting video storage by 85%.',
    tags: ['Computer Vision', 'PyTorch', 'Video'],
    url: 'https://github.com/HiteshSaaiNew/optipixel_video_encode',
    exhibit: 'optipixel',
  },
  {
    title: 'AI Image Deblurring',
    year: '2020',
    summary: 'An SRCNN deep-learning model that turns blurred, out-of-focus photos into sharp, high-resolution images.',
    tags: ['Deep Learning', 'CNN', 'Python'],
    url: 'https://github.com/HiteshSaaiNew/AI_Image_deblurring',
  },
  {
    title: 'PDF to Audiobook',
    year: '2020',
    summary: 'Extracts and cleans text from any PDF, then converts it to speech with Google Cloud Text-to-Speech so you can listen on the go.',
    tags: ['NLP', 'Text-to-Speech', 'Python'],
    url: 'https://github.com/HiteshSaaiNew/pdf-to-audiobook-converter',
  },
]

export const experience = [
  {
    role: 'Principal AI Engineer',
    company: 'Oracle',
    exhibit: 'oracle',
    location: 'Austin, TX',
    period: 'Jun 2026–Sep 2026',
    highlights: [
      'Led production-scale GPU serving infrastructure for LLM inference and training, tuning continuous batching, KV-cache and speculative decoding for throughput, tail latency and cost.',
      'Designed and built the OCI Data Center Command Center, an agentic AI platform with multi-agent orchestration, governed NL2SQL and MCP tool calling for infrastructure risk detection and root-cause analysis.',
      'Fine-tuned Llama-7B with LoRA for intent classification, cutting false-positive responses by 70%.',
    ],
    stack: ['vLLM', 'SGLang', 'CUDA', 'PyTorch', 'LangGraph', 'MCP'],
  },
  {
    role: 'Senior Machine Learning Engineer',
    company: 'Expedia Group',
    exhibit: 'bookings',
    location: 'Austin, TX',
    period: 'Jul 2022–May 2026',
    highlights: [
      'Led ML engineering for Flights & Lodging search ranking and recommendations, with automated retraining and drift monitoring, lifting booking conversion 4% (flights) and 2% (lodging).',
      'Optimized a 70B-parameter LLM with INT8 quantization, KV caching and speculative decoding, doubling throughput and cutting query latency 30%.',
      'Built a multimodal AI travel agent with RAG and long-term memory, and a resource optimizer that saves ~$250K a year in ML compute.',
    ],
    stack: ['Spark', 'Ray Serve', 'Kubernetes', 'AWS SageMaker', 'RAG', 'Kafka'],
  },
  {
    role: 'Data Scientist, ML Engineer',
    company: 'Verisk Analytics',
    exhibit: 'verisk',
    location: 'San Marcos, CA',
    period: 'Feb 2020–Jul 2022',
    highlights: [
      'Built an image similarity model that catches manipulated duplicate images in insurance claims with 95% accuracy.',
      'Shipped an in-house PII detection and blurring API (92% accuracy, 5% false positives) that replaced a third-party service, saving $100K+ a year.',
      'Built a React app for data scientists to register, stage, deploy and monitor models on AWS.',
    ],
    stack: ['Python', 'Computer Vision', 'NLP', 'MLflow', 'Airflow', 'AWS'],
  },
  {
    role: 'Program Analyst',
    company: 'Cognizant',
    location: 'India',
    period: 'Oct 2016–Aug 2017',
    highlights: [
      'Built an invariant checker and automated data-quality models for large financial databases, reducing manual work on live customer incidents.',
    ],
    stack: ['Python', 'Java', 'Spark'],
  },
]

export const research = [
  {
    type: 'Paper',
    venue: 'arXiv · cs.CV',
    date: 'Jun 2024',
    title: 'Optimal Video Compression using Pixel Shift Tracking',
    summary:
      'A computer-vision method that tracks pixel shifts between frames to remove redundant data before storage.',
    exhibit: 'paper',
    stat: { value: '85%', label: 'smaller files' },
    figure: { src: '/figures/paper-pixel-tracking.webp', w: 720, h: 405, alt: 'Diagram from the paper: a pixel is tracked between two video frames, only the new pixel area is kept, and the redundant part is dropped before storage.' },
    url: 'https://arxiv.org/abs/2406.19630',
    code: 'https://github.com/HiteshSaaiNew/optipixel_video_encode',
  },
  {
    type: 'Patent',
    venue: 'US 12,518,222',
    date: 'Granted Jan 2026',
    title: 'Systems & Methods for ML Optimization of Search Queries and Response Parameters',
    summary: 'An ML-based search query optimizer that tunes search and response parameters.',
    exhibit: 'patent',
    stat: null,
    figure: { src: '/figures/patent-fig4c.webp', w: 1472, h: 1074, alt: 'FIG. 4C of US patent 12,518,222: the open query "Weekend beach trips to California" from Seattle, with the trips the system returns listed by date, duration, price and seats.' },
    // Illustration only: search/response parameters moving from a shared default to tuned values.
    tuning: { from: 9, to: [3, 15, 6, 17, 11], caption: 'search and response parameters' },
    url: 'https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12518222',
    linkLabel: 'Patent PDF',
  },
]

// Exhibits: the evidence drawn beside each claim. Every number comes from the copy above.
// Cell figures use one 20-column grid so every result is drawn to the same scale.
export const exhibits = {
  throughput: {
    big: '2×',
    caption: 'A 70B-parameter LLM at Expedia: INT8 quantization, KV caching and speculative decoding doubled throughput and cut query latency 30%.',
    rows: [
      { label: 'Throughput, before', cells: 10, value: '1×' },
      { label: 'Throughput, after', cells: 20, mark: true, value: '2×' },
      { label: 'Query latency, before', cells: 20, value: '100%' },
      { label: 'Query latency, after', cells: 14, mark: true, value: '70%' },
    ],
  },
  bookings: {
    big: '+4%',
    caption: 'Booking conversion lifted by the search ranking and recommendation models I led at Expedia. Each cell is a quarter of a percentage point.',
    rows: [
      { label: 'Flights', cells: 16, mark: true, value: '+4%' },
      { label: 'Lodging', cells: 8, mark: true, value: '+2%' },
    ],
  },
  oracle: {
    big: '−70%',
    caption: 'Oracle: fine-tuning Llama-7B with LoRA for intent classification cut false-positive responses by 70%.',
    rows: [
      { label: 'False positives, before', cells: 20, value: '100%' },
      { label: 'False positives, after', cells: 6, mark: true, value: '30%' },
    ],
  },
  verisk: {
    big: '95%',
    caption: 'Verisk: an image-similarity model that catches manipulated duplicate images in insurance claims, right 95 times in 100.',
    grid: { total: 100, marked: 95 },
  },
  paper: {
    pixels: { value: '85%', label: 'smaller files' },
    image: { src: '/figures/paper-compression-chart.webp', w: 640, h: 480, alt: 'Chart from the paper: percentage reduction in file size against the number of frames the model predicts, for the pips and pips++ models.' },
    caption: 'From my paper: tracking pixel shifts between frames removes the redundant pixels before storage.',
  },
  patent: {
    tuning: { from: 9, to: [3, 15, 6, 17, 11], caption: 'search and response parameters' },
    image: { src: '/figures/patent-fig3.webp', w: 1488, h: 1128, alt: 'FIG. 3 of US patent 12,518,222: a frequency distribution of travel results with a curve fitted over a histogram, its peak marking the most popular option.' },
    caption: 'From my patent: an open query is resolved by learning which parameters were left out and filling them from what is most popular with travellers.',
  },
  optipixel: {
    image: { src: '/figures/paper-frame-shift.webp', w: 720, h: 405, alt: 'Diagram from the OptiPixel repository: four ways a frame can shift relative to the previous one, right-down, right-up, left-up and left-down.' },
    caption: 'From the OptiPixel repository: the four ways one frame can shift against the last. Only the uncovered strip is new data.',
  },
}

// The proof grid under the hero. Each card draws one exhibit above; `area` places it in the bento
// (a: 2×2, b: 2×1, c/d: 1×1, e/f: 2×1), `tone` sets its ground (ink or plate).
export const proofGrid = {
  heading: 'Results, measured',
  sub: 'Every number here comes from a system I shipped, a paper I wrote or a patent I hold. Point at a card to redraw it.',
  cards: [
    {
      area: 'a',
      tone: 'ink',
      exhibit: 'throughput',
      big: '2×',
      title: 'Throughput on a 70B-parameter LLM',
      caption: 'INT8 quantization, KV caching and speculative decoding doubled throughput and cut query latency 30%.',
      source: 'Expedia Group',
      href: '#experience',
    },
    {
      area: 'b',
      tone: 'plate',
      exhibit: 'bookings',
      big: '+4%',
      title: 'Booking conversion from search ranking',
      caption: 'Flights +4%, lodging +2%. Each cell is a quarter of a percentage point.',
      source: 'Expedia Group',
      href: '#experience',
    },
    {
      area: 'c',
      tone: 'plate',
      exhibit: 'oracle',
      big: '−70%',
      title: 'False positives',
      caption: 'Llama-7B fine-tuned with LoRA for intent classification.',
      source: 'Oracle',
      href: '#experience',
    },
    {
      area: 'd',
      tone: 'ink',
      exhibit: 'verisk',
      big: '95%',
      title: 'Manipulated images caught',
      caption: 'Image similarity for insurance claims.',
      source: 'Verisk',
      href: '#experience',
    },
    {
      area: 'e',
      tone: 'plate',
      exhibit: 'paper',
      big: '85%',
      title: 'Smaller video files',
      caption: 'Pixel-shift tracking drops redundant pixels between frames before storage.',
      source: 'arXiv 2406.19630',
      href: '#research',
    },
    {
      area: 'f',
      tone: 'plate',
      exhibit: 'patent',
      big: 'US 12,518,222',
      title: 'Granted patent, Jan 2026',
      caption: 'ML that fills the parameters an open search query leaves out.',
      source: 'Patent',
      href: '#research',
    },
  ],
}

export const skills = [
  {
    group: 'LLMs & Agents',
    items: ['LLM fine-tuning', 'LoRA', 'RLHF / RLVR', 'RAG', 'Multi-agent', 'MCP', 'LangGraph', 'Langfuse'],
  },
  {
    group: 'Inference & Training',
    items: ['vLLM', 'SGLang', 'TensorRT', 'CUDA', 'DeepSpeed', 'PyTorch', 'Hugging Face', 'Ray Serve'],
  },
  {
    group: 'ML Platform & Data',
    items: ['MLflow', 'Kubernetes', 'Docker', 'Spark', 'Kafka', 'Airflow', 'Databricks', 'AWS'],
  },
  { group: 'Languages', items: ['Python', 'Java', 'Scala', 'TypeScript', 'SQL'] },
]
