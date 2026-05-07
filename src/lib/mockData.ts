export type Module = {
  id: string;
  phase: number;
  title: string;
  slug: string;
  estimatedTime: string;
  objectives: string[];
  content: string;
  knowledgeCheck: { question: string; options: string[]; answer: number }[];
};

export const modules: Module[] = [
  {
    id: "1A",
    phase: 1,
    title: "What is AI?",
    slug: "what-is-ai",
    estimatedTime: "20–25 min",
    objectives: [
      "Define what generative AI is and what it isn't.",
      "Understand how large language models (LLMs) work at a basic level.",
      "Identify key limitations such as hallucinations and knowledge cutoffs.",
    ],
    content: `
      <h2>Generative AI Overview</h2>
      <p>Generative AI refers to algorithms that can create new content, including text, code, images, and audio. It is not a human brain, but a pattern-matching system.</p>
      <h2>How LLMs Work</h2>
      <p>Large Language Models predict the next word in a sequence based on vast amounts of training data. They do not 'know' facts in the way humans do.</p>
      <h2>What is Gemini?</h2>
      <p>Gemini is Google's generative AI model, integrated into Google Workspace.</p>
      <h2>Key Limitations</h2>
      <ul>
        <li><strong>Hallucinations:</strong> The model can confidently state incorrect information.</li>
        <li><strong>Knowledge Cutoffs:</strong> It may not know recent events.</li>
        <li><strong>No Real-time Data:</strong> Unless specified, it doesn't search the live web.</li>
      </ul>
      <h2>Vocabulary</h2>
      <p>Prompt, output, token, model, context window.</p>
    `,
    knowledgeCheck: [
      {
        question: "Which of the following is a known limitation of generative AI?",
        options: ["It requires a human brain to operate", "It can hallucinate or state incorrect facts confidently", "It can only generate images", "It knows everything perfectly"],
        answer: 1,
      },
    ],
  },
  {
    id: "1B",
    phase: 1,
    title: "Gemini in Chrome",
    slug: "gemini-in-chrome",
    estimatedTime: "25–30 min",
    objectives: [
      "Access Gemini on a Berkeley-managed device.",
      "Navigate the Gemini interface.",
      "Perform basic tasks like summarizing text.",
    ],
    content: `
      <h2>Accessing Gemini</h2>
      <p>You can access Gemini in Chrome when signed into your Berkeley account.</p>
      <h2>Basic Tasks</h2>
      <p>You can ask questions, summarize a webpage, or draft an email.</p>
      <h2>What Gemini Can See</h2>
      <p>Be aware of what context Gemini has access to when you are browsing.</p>
    `,
    knowledgeCheck: [
      {
        question: "Where can you access Gemini with your Berkeley account?",
        options: ["Only on a mobile app", "Through the Chrome browser", "Via a command line interface", "In a physical library"],
        answer: 1,
      },
    ],
  },
  {
    id: "1C",
    phase: 1,
    title: "Responsible AI use",
    slug: "responsible-ai-use",
    estimatedTime: "20–25 min",
    objectives: [
      "Understand UC Berkeley's AI use policy.",
      "Identify data that must never be input into AI (like FERPA data).",
      "Know when to attribute AI-generated content.",
    ],
    content: `
      <h2>UC Berkeley AI Policy</h2>
      <p>Follow all campus guidelines for responsible use.</p>
      <h2>FERPA and Privacy</h2>
      <p><strong>NEVER</strong> enter student data, PII, or sensitive institutional data into consumer AI tools.</p>
      <h2>Copyright & Attribution</h2>
      <p>Understand who owns the content generated and flag it when appropriate.</p>
    `,
    knowledgeCheck: [
      {
        question: "What type of data should NEVER be put into an AI tool?",
        options: ["Public campus maps", "FERPA-protected student data", "Published research abstracts", "General knowledge questions"],
        answer: 1,
      },
    ],
  },
  {
    id: "2A",
    phase: 2,
    title: "Prompt engineering",
    slug: "prompt-engineering",
    estimatedTime: "30–35 min",
    objectives: [
      "Differentiate a good prompt from a weak one.",
      "Use role and few-shot prompting techniques.",
      "Iterate to improve model outputs.",
    ],
    content: `
      <h2>Prompting Techniques</h2>
      <p>Learn Zero-shot, Few-shot, and Role prompting.</p>
      <h2>Chain-of-thought</h2>
      <p>Ask the model to reason step by step.</p>
      <h2>Iteration Loop</h2>
      <p>Refine your prompt if the first output isn't quite right.</p>
    `,
    knowledgeCheck: [
      {
        question: "What does 'Role Prompting' involve?",
        options: ["Giving the AI a specific persona or job title (e.g., 'Act as an HR manager')", "Asking the AI to play a game", "Ignoring the AI's output", "Making the prompt as short as possible"],
        answer: 0,
      },
    ],
  },
  {
    id: "2B",
    phase: 2,
    title: "AI for admin tasks",
    slug: "ai-for-admin-tasks",
    estimatedTime: "30–35 min",
    objectives: [
      "Draft professional emails and memos.",
      "Summarize long documents effectively.",
      "Prepare for meetings using AI assistance.",
    ],
    content: `
      <h2>Drafting Communications</h2>
      <p>Use AI to get a first draft of announcements or emails.</p>
      <h2>Summarization</h2>
      <p>Quickly distill meeting notes or reports.</p>
    `,
    knowledgeCheck: [
      {
        question: "Which of the following is a good use case for AI in admin work?",
        options: ["Making final decisions on budget approvals", "Drafting a first version of a routine email", "Storing passwords", "Evaluating employee performance without human review"],
        answer: 1,
      },
    ],
  },
  {
    id: "2C",
    phase: 2,
    title: "Evaluating outputs",
    slug: "evaluating-outputs",
    estimatedTime: "20–25 min",
    objectives: [
      "Spot hallucinations and factual errors.",
      "Understand bias in AI.",
      "Determine when human review is necessary.",
    ],
    content: `
      <h2>Spotting Hallucinations</h2>
      <p>Always cross-reference important facts.</p>
      <h2>Bias Awareness</h2>
      <p>AI models can inherit biases from their training data.</p>
      <h2>When Not to Trust AI</h2>
      <p>Avoid using AI for high-stakes decisions without human oversight.</p>
    `,
    knowledgeCheck: [
      {
        question: "What is a 'hallucination' in the context of AI?",
        options: ["When the screen flickers", "When the AI confidently presents false information as fact", "When the AI refuses to answer", "When the AI works too fast"],
        answer: 1,
      },
    ],
  },
];

export const promptLibrary = [
  { 
    id: 1, 
    role: "HR", 
    task: "Drafting", 
    title: "Job Description Draft", 
    text: "Act as an HR specialist at UC Berkeley. I need to draft a job description for a mid-level IT support specialist. Please structure the description with the following sections: 1. Department Overview, 2. Key Responsibilities (use bullet points), 3. Required Qualifications, and 4. Preferred Qualifications. Ensure the tone is professional, welcoming, and aligns with UC Berkeley's commitment to diversity, equity, and inclusion." 
  },
  { 
    id: 2, 
    role: "Finance", 
    task: "Summarizing", 
    title: "Budget Summary", 
    text: "You are a financial analyst. Review the provided department budget report and summarize it into 3 key bullet points for the department chair. Focus on: 1. Total expenditure vs. budget allocation, 2. Major areas of overspend or underspend, and 3. Recommendations for the next quarter. Format the output clearly with bold headers." 
  },
  { 
    id: 3, 
    role: "Comms", 
    task: "Drafting", 
    title: "Newsletter Intro", 
    text: "Act as a Communications Director. Draft an engaging introductory paragraph (approx. 3-4 sentences) for our monthly staff newsletter. The tone should be upbeat and appreciative. Highlight that this month we are celebrating staff achievements and introducing the new campus AI guidelines. Use active voice and avoid jargon." 
  },
  { 
    id: 4, 
    role: "Admin", 
    task: "Planning", 
    title: "Meeting Agenda", 
    text: "Create a structured 1-hour meeting agenda for a project kickoff. The project is 'Campus AI Training Rollout'. Include time allocations for introductions, project goals, timeline review, role assignments, and Q&A. Add a brief note at the end about reviewing meeting action items." 
  },
  { 
    id: 5, 
    role: "Faculty", 
    task: "Brainstorming", 
    title: "Syllabus AI Policy", 
    text: "Act as a curriculum designer. Help me brainstorm a short syllabus statement regarding the use of generative AI in my course. It should state that AI tools may be used for brainstorming and outlining, but all submitted work must be original or properly cited. Keep it student-friendly but firm." 
  }
];

export const glossary = [
  { term: "Hallucination", definition: "When an AI model generates false or misleading information but presents it confidently as fact." },
  { term: "LLM (Large Language Model)", definition: "A type of AI program that can recognize and generate text based on massive datasets." },
  { term: "Prompt", definition: "The instruction or question you give to the AI model." },
];
