import { Socket } from 'socket.io';
import { generateAiResponse } from '../services/ollamaService.ts';
import { SYSTEM_PROMPT } from '../config/prompts.ts';
import type { Message } from 'ollama';
import { toolsLogic } from '../services/toolService.ts';
import { database } from '../config/db.ts';

export const registerChatHandlers = (socket: Socket) => {
  // Each socket connection gets its own private history
  let history: Message[] = [SYSTEM_PROMPT];

  const recipes = toolsLogic.browseAllRecipes({ db: database })

  const recipeMessage: Message = {
    role: 'tool',
    content: JSON.stringify(recipes)
  }

  history.push(recipeMessage)

  socket.on('user_msg', async (userText: string) => {
    history.push({ role: 'user', content: userText });

    try {
      const aiResult = await generateAiResponse(history);

      history.push({ role: 'assistant', content: JSON.stringify(aiResult) });

      if (history.length > 8) history.splice(2, 3);

      socket.emit('ai_stream', JSON.stringify(aiResult));
      socket.emit('stream_done');
    } catch (err) {
      console.error(err);
      socket.emit('error', 'Brain freeze! Check Ollama connection.');
    }
  });
};
