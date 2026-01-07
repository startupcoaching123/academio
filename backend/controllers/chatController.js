const OpenAI = require('openai');

const getChatResponse = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.error('OpenAI API Key is missing');
        return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });
    }

    const openai = new OpenAI({
        apiKey: apiKey,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Or gpt-4o if available/preferred
            messages: [
                { role: "system", content: "You are Academio AI Tutor, a specialized assistant for IGCSE and IB curriculum ONLY. Your knowledge is strictly limited to:\n\nIGCSE Subjects: Mathematics, Physics, Chemistry, Biology, Computer Science, English Language, English Literature, History, Geography, Economics, Business Studies, Accounting, and other IGCSE subjects.\n\nIB Subjects: IB Diploma Programme subjects including Studies in Language and Literature, Language Acquisition, Individuals and Societies, Sciences, Mathematics, and The Arts.\n\nIMPORTANT RULES:\n1. ONLY answer questions related to IGCSE or IB syllabus, curriculum, exams, study techniques, and subject-specific content.\n2. If a question is outside these topics, respond politely with: 'I specialize specifically in IGCSE and IB curriculum subjects. While I'd love to help with that topic, my expertise is focused on these academic programs. Could I help you with any IGCSE or IB subjects instead?'\n3. Do not answer questions about general knowledge, current events, entertainment, personal advice, or any non-academic topics.\n4. Keep responses educational, age-appropriate for IGCSE/IB students (typically 14-19 years old).\n5. Use markdown sparingly and effectively for math formulas or code examples only." },
                { role: "user", content: message },
            ],
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error('Error calling OpenAI:', error);
        res.status(500).json({ error: 'Failed to generate response from AI.' });
    }
};

module.exports = {
    getChatResponse,
};
