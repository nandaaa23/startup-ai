const BASE_URL = "http://localhost:8000";

export async function analyzeIdea({ idea, target_users, revenue_model, problem_statement } = {}) {
  try {
    const response = await fetch(`${BASE_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, target_users, revenue_model, problem_statement }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Backend error:", text);
      throw new Error("Failed to analyze idea");
    }

    return response.json();
  } catch (err) {
    console.error("Network or parsing error:", err);
    throw err;
  }
}