# app/ai/client.py
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import json
import re
import hashlib
import random
from app.ai.prompts import IDEA_ANALYSIS_PROMPT

MODEL_NAME = "bigscience/bloomz-1b7"

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)

idea_cache = {}

def bloom_chat(prompt: str, max_tokens: int = 400) -> dict:
    """
    Simulated Bloom chat: deterministic JSON per idea.
    Repeated ideas get the same output and scores.
    """
    
    if "User idea:" in prompt:
        idea_text = prompt.split("User idea:")[-1].strip()
    else:
        idea_text = prompt.strip()

    # Check cache first
    idea_hash = hashlib.md5(idea_text.encode()).hexdigest()
    if idea_hash in idea_cache:
        return idea_cache[idea_hash]

    # --- Random templates ---
    problems = [
        "Waste is not being collected efficiently in urban areas",
        "Recycling rates are too low due to lack of awareness",
        "Food waste is causing environmental issues",
        "Plastic pollution is harming marine life",
        "Overproduction of packaging material leads to landfill overflow"
    ]
    solutions = [
        "An app connecting waste collectors to households",
        "IoT-enabled smart bins with real-time tracking",
        "Community-driven composting network",
        "Subscription service for zero-waste products",
        "AI-based waste sorting and recycling platform"
    ]
    risks_list = [
        ["Low adoption by users", "High operational cost"],
        ["Competition from existing apps", "Scaling issues"],
        ["Regulatory hurdles", "Founder inexperience"],
        ["Technical reliability", "User retention challenges"]
    ]

    # --- Random selection ---
    problem_desc = random.choice(problems)
    solution_desc = random.choice(solutions)
    risks = random.choice(risks_list)
    low_med_high = ["low","medium","high"]

    technical = random.choice(low_med_high)
    operational = random.choice(low_med_high)
    overall = random.choice(low_med_high)

    # --- Build analysis dict ---
    analysis = {
        "problem": {"description": problem_desc, "severity": random.choice(low_med_high), "current_alternatives": "Traditional methods"},
        "solution": {"description": solution_desc, "core_value": "Efficiency", "differentiation": "Better UX & faster execution"},
        "target_users": {"primary_users": "Urban households", "secondary_users": "Municipalities", "market_size_estimate": random.choice(["small","medium","large"])},
        "feasibility": {"technical": technical, "operational": operational, "overall": overall},
        "risks": risks,
        "verdict": random.choice(["Rethink idea","Validate further","Proceed"]),
    
    }

    idea_cache[idea_hash] = analysis

    return analysis