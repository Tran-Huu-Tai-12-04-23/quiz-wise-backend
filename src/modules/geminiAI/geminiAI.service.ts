import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateNewQuizDTO } from './dto';

@Injectable()
export class GeminiAIService {
  constructor(public readonly configService: ConfigService) {}
  GEMINI_API_KEY = this.configService.get<string>('GEMINI_API_KEY') || '';
  genAI = new GoogleGenerativeAI(this.GEMINI_API_KEY);
  model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async test() {
    const result = await this.model.generateContent(['Explain how AI works']);
    console.log(result.response.text());

    return result;
  }

  async createQuiz(data: CreateNewQuizDTO) {
    const prompt = `Create 10 quiz questions for a ${data.level} level user about ${data.type}. Each question should have a title, multiple choice answers, and the correct answer index. Format the output as a JSON array of objects, where each object has the following properties:
    - title: The question title
    - options: An array of answer options
    - correctAnswerIndex: The index of the correct answer (starting from 0)`;
    const result = await this.model.generateContent([prompt]);
    const textResponse = result.response.text();

    return JSON.parse(textResponse.substring(7, textResponse.length - 3));
  }
}
