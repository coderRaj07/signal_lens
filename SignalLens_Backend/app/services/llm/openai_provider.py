from openai import AsyncOpenAI
from app.config import OPENAI_API_KEY
from app.services.llm.base import BaseLLM
from app.utils.logger import logger

class OpenAIProvider(BaseLLM):

    def __init__(self):
        if not OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY not configured")
        self.client = AsyncOpenAI(api_key=OPENAI_API_KEY)

    async def chat(self, prompt: str) -> str:
        try:
            response = await self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a competitive intelligence analyst."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.2
            )

            usage = response.usage
            tokens = usage.total_tokens if usage else 0
            prompt_tokens = usage.prompt_tokens if usage else 0
            completion_tokens = usage.completion_tokens if usage else 0

            logger.info("LLM Inference (OpenAI)", extra={"extra_info": {
                "provider": "openai",
                "model": "gpt-4o-mini",
                "tokens": tokens,
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens
            }})

            return response.choices[0].message.content

        except Exception as e:
            logger.error("OpenAI LLM error", extra={"extra_info": {"error": str(e)}})
            raise RuntimeError(f"OpenAI LLM error: {str(e)}")
