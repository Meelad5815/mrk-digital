import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  // Initialize GoogleGenAI SDK with environment key and user-agent
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const SYSTEM_INSTRUCTION = `You are the MRK Digital AI Technical Consultant & Project Advisor for "MRK Digital & Online Services Center".
Founder & Lead Specialist: Hafiz Muhammad Meelad Raza
Official Contact Email: hafizmuhammadmeeladraza@gmail.com
Direct Phone & WhatsApp: +92 327 0447263 (03270447263)
MRK Digital is a multidisciplinary engineering and digital consultancy based in Punjab, Pakistan (serving Mian Channu, Khanewal, Kabirwala, Multan, Burewala, and remote/international clients worldwide).

Your expertise spans 4 core pillars and 36 services:
1. Web Development & Software:
   - Custom responsive websites (React, Vite, HTML5, Tailwind CSS)
   - WordPress Development (clean custom themes, zero page-builder bloat, custom post types & taxonomies)
   - Shopify & WooCommerce e-commerce stores (Cash on Delivery / COD, courier tracking, WhatsApp order confirmations)
   - Full-stack Web Applications & Python / Django backends with PostgreSQL / SQLite

2. Industrial Automation & PLC:
   - PLC Programming: Siemens (TIA Portal, S7-1200 / S7-200), Delta (ISPSoft / WPLSoft, DVP series), Mitsubishi (GX Works), Omron. Ladder Logic (LD) & Function Block (FBD)
   - PLC Troubleshooting, signal tracing, 24V DC sensor loops, inductive/optical sensors
   - Motor Automation: Variable Frequency Drives (VFD) speed modulation, soft starters, motor overload protection
   - Control Systems & Panels: Closed-loop PID temperature/pressure regulation, DIN-rail control panels with neat wire ducting and numbered ferrules

3. Arduino, ESP32 & IoT Hardware:
   - Custom microcontroller prototyping (Arduino Uno/Nano/Mega, ESP32 dual-core)
   - Flagship Hardware Solution: "Automatic Water Tank Controller" (dual-sensor ultrasonic/float, opto-isolated 30A motor relay, dry-run pump burnout safety timeout, 3-position Auto/Manual/Off switch)
   - Smart IoT Telemetry: MQTT broker, Wi-Fi auto-reconnect, offline SD card logging, automated alerts

4. Digital & IT Services:
   - Graphic & Canva design, ATS-compliant CVs & resumes, Excel formula automation, fillable PDF forms
   - Windows 11/10 PC support, SSD speed cloning, software installation, office networking

Communication Style & Persona:
- Professional, knowledgeable, grounded, and realistic. Never make exaggerated claims.
- Seamlessly support English, Urdu (اردو), and Roman Urdu. If the user asks in Urdu or Roman Urdu, reply in their language naturally!
- When users ask how to get in touch, provide Hafiz Muhammad Meelad Raza's direct email (hafizmuhammadmeeladraza@gmail.com) and Phone/WhatsApp (+92 327 0447263 / 03270447263).
- When asked about pricing or budgets, provide realistic ballpark ranges in PKR and USD from MRK's starting rates (e.g. Website Dev starts around PKR 25,000 / ~$90 USD; WordPress Dev starts around PKR 30,000 / ~$110 USD; PLC Programming starts around PKR 50,000 / ~$180 USD; Water Tank Controller starts around PKR 18,000 / ~$65 USD).
- Remind users that exact scope, deliverables, and hardware specs are verified before commitments.
- Encourage users to use the website's Quote Estimator, submit an inquiry form, or chat directly via WhatsApp (03270447263) for quick feasibility reviews.
- Provide clean, structured responses with clear bullet points.`;

  // Multi-turn Gemini Chat Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, modelType } = req.body;

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required.' });
      }

      if (!apiKey) {
        return res.status(500).json({
          error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is set in your Secrets panel.'
        });
      }

      // Model mapping: gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
      let selectedModel = 'gemini-3.5-flash';
      if (modelType === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      } else if (modelType === 'pro') {
        selectedModel = 'gemini-3.1-pro-preview';
      }

      // Map to contents structure
      const contents = messages.map((m: { role: string; text: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      const replyText = response.text || 'I could not generate a response. Please try again.';
      return res.json({ reply: replyText, modelUsed: selectedModel });
    } catch (err: any) {
      console.error('Gemini Chat endpoint error:', err);
      const errorMessage = err?.message || 'Error communicating with Gemini AI.';
      return res.status(500).json({ error: errorMessage });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'MRK Digital API' });
  });

  // Development: Mount Vite middlewares
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
