import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("hi-IN"); // default Hindi
  const chatEndRef = useRef(null);
  const lastMicUseRef = useRef(null);

  const handleMicClick = () => {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;

    if (lastMicUseRef.current && now - lastMicUseRef.current < tenMinutes) {
      const waitTime = Math.ceil((tenMinutes - (now - lastMicUseRef.current)) / 1000);
      alert(`कृपया माइक्रोफोन फिर से उपयोग करने के लिए ${waitTime} सेकंड प्रतीक्षा करें।`);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("माफ़ करें, आपका ब्राउज़र स्पीच रिकग्निशन सपोर्ट नहीं करता है।");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
      setListening(false);
      lastMicUseRef.current = Date.now();
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("स्पीच रिकग्निशन में त्रुटि हुई: " + event.error);
      setListening(false);
      lastMicUseRef.current = Date.now();
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { prompt });
      const botMessage = { role: "bot", content: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = { role: "bot", content: "❌ एआई से कनेक्शन नहीं हो पाया।" };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex flex-col items-center p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 text-center">
        🌾 KrishiSarthi – AI किसान सहायक
      </h1>

      <p className="text-gray-600 mb-4 text-center max-w-2xl">
        Hindi और English में बात करें। खेती से जुड़े सवाल पूछें या माइक दबाएं। 🤖
      </p>

      <div className="mb-3 flex justify-center gap-4">
        <label className="text-gray-700 font-semibold flex items-center gap-2">
          भाषा चुनें:
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="hi-IN">Hindi (हिन्दी)</option>
            <option value="en-US">English (US)</option>
          </select>
        </label>
      </div>

      <div className="w-full max-w-2xl h-[400px] overflow-y-auto bg-white border border-gray-200 rounded-lg p-4 shadow-inner flex flex-col">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 text-sm max-w-[80%] whitespace-pre-wrap rounded-xl px-4 py-2 ${
              msg.role === "user"
                ? "bg-blue-100 self-end ml-auto text-right"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex w-full max-w-2xl gap-2 mt-4 items-start">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={2}
          className="flex-1 border border-gray-300 p-2 rounded-lg resize-none shadow-sm"
          placeholder="अपना खेती से जुड़ा सवाल लिखें या बोलें..."
        />
        <button
          onClick={handleMicClick}
          disabled={listening}
          className={`px-4 py-2 rounded-lg shadow ${
            listening ? "bg-red-500 cursor-not-allowed" : "bg-blue-500"
          } text-white transition`}
          title={`Speak in ${lang === "hi-IN" ? "Hindi" : "English"}`}
        >
          🎤
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          भेजें / Send
        </button>
      </div>
    </div>
  );
}
