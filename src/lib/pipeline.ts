export const pipelineNodes = [
  { id: "DP1", label: "PDF / Excel files", group: "preparation" },
  { id: "DP2", label: "Marker conversion", group: "preparation" },
  { id: "DP3", label: "Markdown output", group: "preparation" },
  { id: "DP4", label: "Low-cost AI categorisation", group: "preparation" },
  { id: "DP5", label: "SQLite indexing", group: "preparation" },
  { id: "MP1", label: "Master prompts", group: "prompts" },
  { id: "MP2", label: "Add data prompt", group: "prompts" },
  { id: "MP3", label: "Fetch data prompt", group: "prompts" },
  { id: "AL1", label: "User prompt", group: "response" },
  {
    id: "AL2",
    label: "Retrieval / API layer",
    group: "response",
  },
  { id: "AL3", label: "Relevant file selection", group: "response" },
  { id: "RG1", label: "LLM answer generation", group: "response" },
  { id: "RG2", label: "Final response to user", group: "response" },
] as const;

export type PipelineNodeId = (typeof pipelineNodes)[number]["id"];

export const pipelineEdges: readonly (readonly [PipelineNodeId, PipelineNodeId])[] = [
  ["DP1", "DP2"],
  ["DP2", "DP3"],
  ["DP3", "DP4"],
  ["DP4", "DP5"],
  ["MP1", "MP2"],
  ["MP1", "MP3"],
  ["MP2", "DP4"],
  ["DP5", "AL2"],
  ["MP3", "AL2"],
  ["AL1", "AL2"],
  ["AL2", "AL3"],
  ["AL3", "RG1"],
  ["AL1", "RG1"],
  ["RG1", "RG2"],
];
