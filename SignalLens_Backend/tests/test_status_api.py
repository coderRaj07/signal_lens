import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest_asyncio.fixture
async def async_client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client

# Basic API Test (Since it tests integration without DB mock by default, it might return unhealthy for db but backend will be healthy)
@pytest.mark.asyncio
async def test_status_endpoint(async_client):
    response = await async_client.get("/status/")
    assert response.status_code == 200
    data = response.json()
    assert data["backend"] == "healthy"
    assert "database" in data
    assert "llm" in data
