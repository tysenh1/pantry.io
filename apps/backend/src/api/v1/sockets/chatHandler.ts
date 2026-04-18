import { Socket } from 'socket.io';
import { generateAiResponse } from '../services/ollamaService.ts';
import { SYSTEM_PROMPT } from '../config/prompts.ts';
import type { Message } from 'ollama';

export const registerChatHandlers = (socket: Socket) => {
  // Each socket connection gets its own private history
  let history: Message[] = [SYSTEM_PROMPT];


  socket.on('user_msg', async (userText: string) => {
    history.push({ role: 'user', content: userText });

    try {
      const aiResult = await generateAiResponse(history);

      history.push({ role: 'assistant', content: JSON.stringify(aiResult) });

      if (history.length > 10) history.splice(1, 2);

      socket.emit('ai_stream', aiResult.message);
      socket.emit('stream_done');
    } catch (err) {
      console.error(err);
      socket.emit('error', 'Brain freeze! Check Ollama connection.');
    }
  });
};
